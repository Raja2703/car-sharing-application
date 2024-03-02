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
		<div>
			{sharedCars.map((car) => {
				return (
					<div key={car._id}>
						<h1 className="">{car.make}</h1>
						<img src={car.image} alt="car" width={50} height={50} />
					</div>
				);
			})}
		</div>
	);
};

export default SharedCars;
