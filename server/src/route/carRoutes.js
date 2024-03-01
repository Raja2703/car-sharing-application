const express = require('express');
const carController = require('./../controller/carController');
const router = express.Router();

router.route('/').get(carController.getAllCars).post(carController.postCar);

module.exports = router;
