import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BackgroundGradient } from './../component/ui/background-gradient.tsx';
import Navbar from '../component/Navbar.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';

const RentalDetails = (props) => {
	const [car, setCar] = useState();
	const location = useLocation();

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

	if (!car) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Navbar refresher={props.refresher} />
			<div className="w-full px-20 h-screen py-5 items-center flex bg-neutral-800 text-white">
				<div className="w-[50%]" data-aos="fade-right">
					{/* <img src={car.image} alt="car" className="w-full h-[60%] rounded-lg" /> */}
					<BackgroundGradient className="rounded-[22px]  p-2 sm:p-10 bg-white dark:bg-zinc-900">
						<img src={car.image} alt="car" className="w-full h-[60%] rounded-lg" />
					</BackgroundGradient>
				</div>
				<div className="w-[50%] ml-20" data-aos="fade-left">
					<h1 className="text-4xl font-base mb-2">Make - {car.make}</h1>
					<h1 className="text-4xl font-base mb-2">Model - {car.model}</h1>
					<h1 className="text-4xl font-base mb-2">Mileage - {car.mileage} kms/L</h1>
					<h1 className="text-4xl font-base mb-2">Fuel type - {car.fuelType}</h1>
					<h1 className="text-4xl font-base mb-2">Owner name - {car.ownerName}</h1>
					<h1 className="text-4xl font-base mb-2">Rental Duration - {car.rentedForDuration}</h1>
				</div>
			</div>
		</div>
	);
};

export default RentalDetails;
