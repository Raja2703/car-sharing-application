const Car = require('../model/carModel');

exports.getAllCars = async (req, res, next) => {
	try {
		const cars = await Car.find({});

		if (!cars) {
			throw new Error('No cars found');
		}

		res.status(200).json({
			message: 'success',
			noOfSharings: cars.length,
			cars,
		});
	} catch (e) {
		res.status(400).json({
			message: 'something went wrong',
			error: e,
		});
	}
};

exports.postCar = async (req, res, next) => {
	try {
		const car = await Car.create(req.body);
		res.status(202).json({
			car,
		});
	} catch (err) {
		res.status(400).json({
			err,
		});
	}
};
