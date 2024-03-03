import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

const MyRentals = (props) => {
	const [rentedCars, setRentedCars] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const userId = localStorage.getItem('userId');
		const jwt = localStorage.getItem('jwt');
		fetch(`${process.env.REACT_APP_BASE_URL}/cars/rent/${userId}`, {
			headers: {
				authorization: `Bearer ${jwt}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setRentedCars(data.cars);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	});

	const viewDetails = (e) => {
		const car = rentedCars.filter((car) => {
			return car._id === e.target.id;
		});
		navigate(`/myRentals/${e.target.id}`, { state: car });
	};

	const withdrawRental = (e) => {
		const jwt = localStorage.getItem('jwt');
		const data = { id: e.target.id };
		// console.log(data);
		fetch(`${process.env.REACT_APP_BASE_URL}/cars/rent/withdraw/${data.id}`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${jwt}`,
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log('withdraw: ', data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (loading) {
		return (
			<div>
				<Navbar refresher={props.refresher} />
				<div className="min-h-screen pt-10  bg-neutral-800 py-20 text-white text-2xl font-semibold text-center">Loading...</div>;
			</div>
		);
	}

	if (rentedCars.length === 0) {
		return (
			<div>
				<Navbar refresher={props.refresher} />
				<div className="min-h-screen pt-10  bg-neutral-800 py-20 text-white text-2xl font-semibold text-center">No Cars Rented by you</div>;
			</div>
		);
	}

	return (
		<div>
			<Navbar refresher={props.refresher} />
			<div className="grid grid-cols-3 min-h-screen place-content-center justify-items-center pt-10 gap-y-10 bg-neutral-800 py-20">
				{rentedCars.map((car) => {
					return (
						<div key={car._id} className="blurer w-80 h-80 text-center border px-5 py-5 rounded-lg border-neutral-400 hover:cursor-pointer">
							<img src={car.image} alt="car" className="w-full h-[65%] rounded-md" />
							<h1 className="text-2xl mt-2 h-[20%] text-white">
								{car.make} {car.model}
							</h1>
							<div className="flex justify-between">
								<button className="bg-green-700 rounded-md px-2 py-1 text-white w-32 mb-4" onClick={viewDetails} id={car._id}>
									View Details
								</button>
								<button className="bg-red-700 rounded-md px-2 py-1 text-white w-32 mb-4" id={car._id} onClick={withdrawRental}>
									Remove
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MyRentals;
