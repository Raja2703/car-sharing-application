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
	carFee1: {
		type: Number,
		required: [true, 'Car fee 1 is required for it to be shared'],
	},
	carFee2: {
		type: Number,
		required: [true, 'Car fee 2 is required for it to be shared'],
	},
	carFee3: {
		type: Number,
		required: [true, 'Car fee 3 is required for it to be shared'],
	},
	image: {
		type: String,
		// required: [true, 'Car image is required'],
	},
	ownerName: {
		type: String,
		required: [true, 'A car must have a user'],
	},
	ownerId: {
		type: String,
	},
	buyerName: {
		type: String,
	},
	buyerId: {
		type: String,
	},
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
