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
