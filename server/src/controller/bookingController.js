const Stripe = require('stripe');
const stripe = Stripe('sk_test_51PO1EYHXbX9wQhL4URL5KZYAJ5qqiBk65zzrJEajAnQ0FmwlIHy1Q5BIKoZLhkUCImesV0FHKHBkW5BlMSybSWho001TY3HuMH');

const Car = require('../model/carModel');

exports.getCheckoutSession = async (req, res, next) => {
	// 1) get currently booked car
	const car = await Car.findById(req.params.carId);
	// console.log(car);

	// 2) create checkout session
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		mode: 'payment',
		line_items: [
			{
				price_data: {
					currency: 'usd',
					product_data: {
						name: `${car.make}`,
					},
					unit_amount: Math.round(car.carFee1 * 100),
				},
				quantity: 1,
			},
		],
		success_url: `${req.protocol}://localhost:3001/`,
		cancel_url: `${req.protocol}://localhost:3001/`,
	});

	// 3) send session to client
	return res.status(200).json({
		message: 'success',
		session,
	});
};
