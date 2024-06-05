const Car = require('../model/carModel');
const { GridFSBucket } = require('mongodb');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv');
// config file location
dotenv.config({ path: './../../config.env' });

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

exports.getMyShares = async (req, res, next) => {
	try {
		const cars = await Car.find({ ownerId: req.params.userId });

		if (cars.length === 0) {
			res.status(200).json({
				message: 'No cars shared by you',
				cars,
			});
		} else {
			res.status(200).json({
				message: 'success',
				cars,
			});
		}
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
		// const car = await Car.create(req.body);
		// res.status(202).json({
		// 	car,
		// });

		// let newImage = new Image({
		// 	caption: req.body.caption,
		// 	fileName: req.file.name,
		// 	fileId: req.file.id,
		// });

		// newImage
		// 	.save()
		// 	.then((image) => {
		// 		res.status(200).json({
		// 			status: 'success',
		// 			image,
		// 		});
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		console.log('file:', req.file);

		if (!req.file) {
			throw new Error('upload failed');
		}

		res.status(200).json({
			file: req.file,
			message: 'file uploaded',
		});
	} catch (err) {
		res.status(400).json({
			error: err.message,
		});
	}
};

exports.getCarImage = async (req, res, next) => {
	try {
		let imageName = req.params.imageName;

		const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
		// Ensure database connection and gridBucket are ready
		await mongoose.connect(DB);
		let db = mongoose.connection.db;

		let gridBucket = new GridFSBucket(db, {
			bucketName: 'uploads',
		});

		// Find the image in GridFS
		let result = await gridBucket.find({ filename: imageName }).toArray();

		if (!result || result.length === 0) {
			throw new Error('File does not exist');
		}

		// Stream the file to response
		await gridBucket.openDownloadStreamByName(imageName).pipe(res);
	} catch (err) {
		console.error(err);
		res.status(404).json({ message: err.message });
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
		res.status(400).json({
			message: 'failure',
			error: err,
		});
	}
};

exports.withdrawRental = async (req, res, next) => {
	try {
		const car = await Car.findOneAndUpdate({ _id: req.params.cardId }, { $set: { buyerName: '', buyerId: null, rentedForDuration: '' } });

		res.status(200).json({
			message: 'success',
			car,
		});
	} catch (err) {
		res.status(400).json({
			message: 'failure',
			error: err,
		});
	}
};

exports.removeCar = async (req, res, next) => {
	try {
		const car = await Car.findByIdAndDelete(req.params.carId, { new: true });

		if (!car) {
			throw new Error('Car not found to be deleted');
		}

		res.status(204).json({
			message: 'success',
			car,
		});
	} catch (err) {
		res.status(400).json({
			message: 'failure',
			error: err,
		});
	}
};
