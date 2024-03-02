const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: [true, 'Username is required'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minLength: [8, 'Password should contain atleast 8 characters'],
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please provide a password'],
		validate: {
			validator: function (val) {
				return val === this.password;
			},
			message: 'Passwords are not the same!',
		},
	},
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 14);
	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
