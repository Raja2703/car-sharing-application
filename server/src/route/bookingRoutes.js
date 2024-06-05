const express = require('express');
const bookingController = require('./../controller/bookingController');
const userController = require('./../controller/userController');

const router = express.Router();

router.post('/checkout-session/:carId', bookingController.getCheckoutSession);

module.exports = router;
