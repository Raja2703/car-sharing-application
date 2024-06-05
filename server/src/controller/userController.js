const { promisify } = require('util');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, statusCode, res) => {
	// Create a new instance of LocalStorage
	const token = signToken(user._id);

	res.status(statusCode).json({
		status: 'success',
		token,
		user: {
			id: user._id,
			userName: user.userName,
		},
	});
};

exports.login = async (req, res, next) => {
	try {
		const { userName, password } = req.body;

		// 1) check if email and password exist
		if (!userName || !password) throw new Error('Please provide userName and password', 400);

		// 2) check is user exists and password is correct
		const user = await User.findOne({ userName: userName }).select('+password');

		if (!user || !(await user.comparePassword(password, user.password))) {
			throw new Error('Incorrect userName or password');
		}

		// 3) if everything is ok send token to client
		createSendToken(user, 200, res);
	} catch (err) {
		res.status(400).json({
			message: 'Error',
			err: err.message,
		});
	}
};

exports.register = async (req, res, next) => {
	try {
		const newUser = await User.create(req.body);

		createSendToken(newUser, 200, res);
	} catch (err) {
		res.status(400).json({
			message: 'Error',
			error: err,
		});
	}
};

exports.protect = async (req, res, next) => {
	let token, decoded;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return res.status(401).json({
			message: 'You are not authorized',
		});
	}

	try {
		decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
	} catch (err) {
		if (err.name === 'JsonWebTokenError') {
			return res.status(401).json({
				status: 'failed',
				message: 'Please login again',
			});
		}

		if (err.name === 'TokenExpiredError') {
			return res.status(401).json({
				status: 'failed',
				message: 'Your token has expired! Please login again',
			});
		}
	}

	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return res.status(401).json({
			message: 'User with that id no longer exists',
		});
	}
	req.user = currentUser;
	next();
};
