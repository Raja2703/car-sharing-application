const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);

	const cookieOptions = {
		// expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
		secure: true,
		httpOnly: true,
	};

	res.cookie('jwt', token, cookieOptions);

	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user: user,
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
		console.log(err);
	}
};

exports.register = async (req, res, next) => {
	try {
		const newUser = await User.create(req.body);

		createSendToken(newUser, 200, res);
	} catch (err) {
		console.log(err);
	}
};
