const express = require('express');
const carController = require('./../controller/carController');
const userController = require('./../controller/userController');
const { gridStorage } = require('../utils/upload');
// const upload = require('./../../app.js');
const router = express.Router();

router.route('/').get(userController.protect, carController.getAllCars).post(gridStorage().single('file'), carController.postCar);
router.route('/rent').patch(userController.protect, carController.rentCar);
router.route('/rent/withdraw/:cardId').patch(userController.protect, carController.withdrawRental);
router.route('/rent/:userId').get(userController.protect, carController.getMyRentals);
router.route('/myShares/:userId').get(userController.protect, carController.getMyShares);
router.route('/myShares/:carId').delete(userController.protect, carController.removeCar);
router.route('/:id').get(userController.protect, carController.getCarDetails);
router.route('/carImage/:imageName').get(carController.getCarImage);

module.exports = router;
