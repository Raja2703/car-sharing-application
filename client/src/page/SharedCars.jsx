import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './../component/Navbar';

const SharedCars = (props) => {
	const [sharedCars, setSharedCars] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const jwt = localStorage.getItem('jwt');
		fetch(`${process.env.REACT_APP_BASE_URL}/cars`, {
			headers: {
				authorization: `Bearer ${jwt}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setLoading(false);
				setSharedCars(data.cars);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	}, []);

	const handleBooking = (e) => {
		const car = sharedCars.filter((car) => {
			return car._id === e.target.id;
		});
		navigate(`/book/${e.target.id}`, { state: car });
	};

	if (loading) {
		return (
			<div>
				<Navbar refresher={props.refresher} />
				<div className="min-h-screen pt-10  bg-neutral-800 py-20 text-white text-2xl font-semibold text-center">Loading...</div>;
			</div>
		);
	}

	return (
		<div>
			<Navbar refresher={props.refresher} />
			<div className="grid grid-cols-3 min-h-screen place-content-center justify-items-center pt-10 gap-y-10 bg-neutral-900/90 py-20">
				{sharedCars.map((car) => {
					return (
						<div key={car._id} className="blurer w-80 h-[420px] text-center border px-5 py-5 rounded-lg border-neutral-400 hover:cursor-pointer">
							<img src={car.image} alt="car" className="w-full h-[50%] rounded-md" />
							<h1 className="text-2xl mt-2 h-[15%] text-white">
								{car.make} {car.model}
							</h1>
							<div className="grid grid-cols-2 h-[20%] place-content-center gap-y-1 ">
								<div className="mr-1 bg-zinc-600 rounded-sm p-1 text-white">6hrs-{car.carFee1}</div>
								<div className="mr-1 bg-zinc-600 rounded-sm p-1 text-white">1day-{car.carFee2}</div>
								<div className="mr-1 bg-zinc-600 rounded-sm p-1 text-white">2days-{car.carFee3}</div>
							</div>
							<button onClick={handleBooking} className="bg-green-700 rounded-md px-2 py-1 text-white mt-4 w-32 mb-4" id={car._id}>
								Book
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SharedCars;
