const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
	make: {
		type: String,
		required: [true, 'Car make is required'],
	},
	model: {
		type: String,
		required: [true, 'Car model is required'],
	},
	mileage: {
		type: Number,
		required: [true, "Car's mileage is requried"],
	},
	fuelType: {
		type: String,
		required: [true, "Car's fuel type is required"],
	},
	carFee: {
		type: Number,
		required: [true, 'Car fee is required for it to be shared'],
	},
	image: {
		type: String,
		// required: [true, 'Car image is required'],
	},
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
