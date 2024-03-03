import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

const MyShares = (props) => {
	const [rentedCars, setRentedCars] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const userId = localStorage.getItem('userId');
		const jwt = localStorage.getItem('jwt');
		fetch(`${process.env.REACT_APP_BASE_URL}/cars/myShares/${userId}`, {
			headers: {
				authorization: `Bearer ${jwt}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}
				return response.json();
			})
			.then((data) => {
				setRentedCars(data.cars);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
				setLoading(false);
			});
	}, []);

	const viewDetails = (e) => {
		const carId = e.target.id;
		const car = rentedCars.find((car) => car._id === carId);
		if (car) {
			navigate(`/myRentals/${carId}`, { state: car });
		} else {
			console.error('Car not found');
		}
	};

	const removeCar = (e) => {
		const jwt = localStorage.getItem('jwt');
		const carId = e.target.id;
		fetch(`${process.env.REACT_APP_BASE_URL}/cars/myShares/${carId}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${jwt}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Failed to delete car');
				}
				const newRentedCars = rentedCars.filter((car) => car._id !== carId);
				setRentedCars(newRentedCars);
			})
			.catch((error) => {
				console.error('Error deleting car:', error);
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
				<div className="min-h-screen pt-10  bg-neutral-800 py-20 text-white text-2xl font-semibold text-center">No Cars Shared by you</div>
			</div>
		);
	}

	return (
		<div>
			<Navbar refresher={props.refresher} />
			<div className="grid grid-cols-3 min-h-screen place-content-center justify-items-center pt-10 gap-y-10 bg-neutral-800 py-20">
				{rentedCars.map((car) => (
					<div key={car._id} className="blurer w-80 h-80 text-center border px-5 py-5 rounded-lg border-neutral-400 hover:cursor-pointer">
						<img src={car.image} alt="car" className="w-full h-[65%] rounded-md" />
						<h1 className="text-2xl mt-2 h-[20%] text-white">
							{car.make} {car.model}
						</h1>
						<div className="flex justify-between">
							<button className="bg-green-700 rounded-md px-2 py-1 text-white w-32 mb-4" onClick={viewDetails} id={car._id}>
								View Details
							</button>
							<button className="bg-red-700 rounded-md px-2 py-1 text-white w-32 mb-4" id={car._id} onClick={removeCar}>
								Remove
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyShares;
