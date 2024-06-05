import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BackgroundGradient } from './../component/ui/background-gradient.tsx';
import Navbar from '../component/Navbar.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { loadStripe } from '@stripe/stripe-js';

const BookCar = (props) => {
	const [car, setCar] = useState();
	const [duration, setDuration] = useState('6hours');
	const location = useLocation();
	const [paid, setPaid] = useState(false);
	const [data, setData] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		AOS.init({
			offset: 200,
			duration: 600,
			easing: 'ease-in-out-quart',
			delay: 100,
		});
	}, []);

	useEffect(() => {
		if (location.state && location.state.length > 0) {
			setCar(location.state[0]);
		}
	}, [location]);

	useEffect(() => {
		if (paid) {
			const jwt = localStorage.getItem('jwt');

			fetch(`${process.env.REACT_APP_BASE_URL}/cars/rent`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${jwt}`,
				},
				body: JSON.stringify(data),
			})
				.then((response) => {
					console.log('jsoning');
					response.json();
				})
				.then((data) => {
					navigate('/');
				})
				.catch((err) => console.log(err));
		}
	}, [paid]);

	if (!car) {
		return <div>Loading...</div>;
	}

	const handleBooking = async (e) => {
		e.preventDefault();
		const buyerName = localStorage.getItem('userName') || '';
		const buyerId = localStorage.getItem('userId') || '';

		const stripe = await loadStripe('pk_test_51PO1EYHXbX9wQhL4vWtHbpZrVxpYpX93lCLw6diXsWSnacbaXUcAes5ybodgxRDPN2nOQrHEJjDCE8LLF7bPkNiu00DC5imYKr');

		setData({
			id: car._id,
			buyerId,
			buyerName,
			rentedForDuration: duration,
		});

		fetch(`${process.env.REACT_APP_BASE_URL}/booking/checkout-session/${car._id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((session) => {
				setPaid(true);
				stripe.redirectToCheckout({ sessionId: session.session.id });
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<Navbar refresher={props.refresher} />
			<form onSubmit={handleBooking} className="w-full px-20 h-screen py-5 items-center flex bg-neutral-800 text-white">
				<div className="w-[50%]" data-aos="fade-right">
					<BackgroundGradient className="rounded-[22px]  p-2 sm:p-10 bg-white dark:bg-zinc-900">
						<img src={car.image} alt="car" className="w-full h-[60%] rounded-lg" />
					</BackgroundGradient>
				</div>
				<div className="w-[50%] ml-20" data-aos="fade-left">
					<h1 className="text-4xl font-semibold">Make - {car.make}</h1>
					<h1 className="text-4xl font-semibold">Model - {car.model}</h1>
					<h1 className="text-4xl font-semibold">Mileage - {car.mileage} kms/L</h1>
					<h1 className="text-4xl font-semibold">Fuel type - {car.fuelType}</h1>
					<h1 className="text-4xl font-semibold">Owner name- {car.ownerName}</h1>
					<div className="flex gap-x-2 mt-5">
						<div className="mr-1 bg-zinc-700 rounded-sm px-2 py-1 text-white">6hrs - {car.carFee1}</div>
						<div className="mr-1 bg-zinc-700 rounded-sm px-2 py-1 text-white">1day - {car.carFee2}</div>
						<div className="mr-1 bg-zinc-700 rounded-sm px-2 py-1 text-white">2days - {car.carFee3}</div>
					</div>
					<div className="mt-5">
						<select className="text-black outline-none mr-2 rounded-sm py-1" onChange={(e) => setDuration(e.target.value)}>
							<option>6hours</option>
							<option>1day</option>
							<option>2days</option>
						</select>
						<button className="bg-green-700 px-3 py-1 rounded-md" type="submit">
							Take Rental
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default BookCar;
