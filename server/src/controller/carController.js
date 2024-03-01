const Car = require('../model/carModel');

exports.getAllCars = () => {
	console.log('car router');
};

exports.postCar = async (req, res, next) => {
	try {
		const car = await Car.create(req.body);
		res.status(200).json({
			car,
		});
	} catch (err) {
		res.status(400).json({
			err,
		});
	}
};
