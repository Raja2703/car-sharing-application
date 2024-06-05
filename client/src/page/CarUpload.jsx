import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

function CarUpload(props) {
	const navigate = useNavigate();
	const [make, setMake] = useState('');
	const [model, setModel] = useState('');
	const [mileage, setMileage] = useState('');
	const [fuelType, setFuelType] = useState('');
	const [price1, setPrice1] = useState('');
	const [price2, setPrice2] = useState('');
	const [price3, setPrice3] = useState('');
	const [image, setImage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log('image:', image);
		// const userName = localStorage.getItem('userName');
		// const userId = localStorage.getItem('userId');

		// const data = {
		// 	make: make,
		// 	model: model,
		// 	mileage: mileage,
		// 	fuelType: fuelType,
		// 	carFee1: price1,
		// 	carFee2: price2,
		// 	carFee3: price3,
		// 	image: image,
		// 	ownerName: userName,
		// 	ownerId: userId,
		// };
		const data = new FormData();
		data.append('file', image);
		const jwt = localStorage.getItem('jwt');

		fetch(`${process.env.REACT_APP_BASE_URL}/cars/`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${jwt}`,
			},
			body: data,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				console.log('file data: ', data.file);
				navigate('/');
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<Navbar refresher={props.refresher} />
			<div className="flex flex-col w-full min-h-screen py-10 justify-center items-center bg-neutral-800 text-white">
				<h2 className="text-4xl my-10">Share your car</h2>
				<div className="flex gap-x-8 blurer w-96 items-center justify-center py-5">
					<form action="/api/v1/cars" encType="multipart/form-data" onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center text-black">
						<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="text" placeholder="Make" onChange={(e) => setMake(e.target.value)} />
						<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="text" placeholder="Model" onChange={(e) => setModel(e.target.value)} />
						<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="text" placeholder="Mileage" onChange={(e) => setMileage(e.target.value)} />
						<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="text" placeholder="Fuel Type" onChange={(e) => setFuelType(e.target.value)} />
						<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="text" placeholder="6hours fee" onChange={(e) => setPrice1(e.target.value)} />
						<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="text" placeholder="1day fee" onChange={(e) => setPrice2(e.target.value)} />
						<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="text" placeholder="2days fee" onChange={(e) => setPrice3(e.target.value)} />
						<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="file" name="file" alt="" placeholder="image" onChange={(e) => setImage(e.target.files[0])} />
						<button type="submit" className="bg-green-600 px-3 py-1 rounded-md text-white">
							Upload
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default CarUpload;
