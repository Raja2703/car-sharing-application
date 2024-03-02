import React, { useEffect, useState } from 'react';

const SharedCars = () => {
	const [sharedCars, setSharedCars] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/api/v1/cars')
			.then((response) => response.json())
			.then((data) => setSharedCars(data.cars))
			.catch((err) => {
				console.log(err);
			});
	});

	return (
		<div className="grid grid-cols-3 bg-red-800 place-content-center justify-items-center">
			{sharedCars.map((car) => {
				return (
					<div key={car._id} className="w-60">
						<img src={car.image} alt="car" className="w-52 h-52" />
						<h1 className="text-3xl">
							{car.make} {car.model}
						</h1>
						<div className="flex">
							<div className="">{car.carFee}</div>
							<div className="">{car.carFee}</div>
							<div className="">{car.carFee}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default SharedCars;
