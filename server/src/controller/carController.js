const Car = require('../model/carModel');

exports.getAllCars = async (req, res, next) => {
	try {
		const cars = await Car.find({ buyerName: '', ownerId: { $ne: req.user._id } });

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

exports.getMyRentals = async (req, res, next) => {
	try {
		const cars = await Car.find({ buyerId: req.params.userId });

		if (!cars) {
			throw new Error('No cars found');
		}

		res.status(200).json({
			message: 'success',
			cars,
		});
	} catch (e) {
		res.status(400).json({
			message: 'something went wrong',
			error: e,
		});
	}
};

exports.getCarDetails = async (req, res, next) => {
	try {
		const car = await Car.findOne({ _id: req.params.id });

		if (!car) {
			throw new Error('No cars found');
		}

		res.status(200).json({
			message: 'success',
			car,
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

exports.rentCar = async (req, res, next) => {
	try {
		const car = await Car.findOneAndUpdate(
			{ _id: req.body.id },
			{
				buyerName: req.body.buyerName,
				buyerId: req.body.buyerId,
				rentedForDuration: req.body.rentedForDuration,
			},
			{
				new: true,
			}
		);

		res.status(203).json({
			message: 'success',
			car,
		});
	} catch (err) {
		console.log(err);
	}
};

exports.withdrawRental = async (req, res, next) => {
	try {
		const car = await Car.findOneAndUpdate({ _id: req.body.id }, { $set: { buyerName: '' } });

		res.status(203).json({
			message: 'success',
			car,
		});
	} catch (err) {
		console.log(err);
	}
};
