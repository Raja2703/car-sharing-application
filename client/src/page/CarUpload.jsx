import React, { useState } from 'react';

function CarUpload() {
	const [selectedPhoto, setSelectedPhoto] = useState(null);
	const [make, setMake] = useState('');
	const [model, setModel] = useState('');
	const [mileage, setMileage] = useState('');
	const [fuelType, setFuelType] = useState('');
	const [price1, setPrice1] = useState('');
	const [price2, setPrice2] = useState('');
	const [price3, setPrice3] = useState('');

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		const userName = localStorage.getItem('userName');
		const userId = localStorage.getItem('userId');
		let convertedPhoto = '';
		if (selectedPhoto) {
			console.log('Selected photo:', selectedPhoto);
			convertedPhoto = await convertToBase64(selectedPhoto);
		} else {
			console.log('No photo selected');
		}

		const data = {
			make: make,
			model: model,
			mileage: mileage,
			fuelType: fuelType,
			carFee1: price1,
			carFee2: price2,
			carFee3: price3,
			image: convertedPhoto,
			ownerName: userName,
			ownerId: userId,
		};

		fetch('http://localhost:3000/api/v1/cars/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	};

	const convertToBase64 = (image) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(image);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	return (
		<div className="flex flex-col w-full h-screen justify-center items-center bg-neutral-800 text-white">
			<h2 className="text-4xl my-10">Share your car</h2>
			<div className="flex gap-x-8">
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center text-black">
					<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="text" placeholder="Make" onChange={(e) => setMake(e.target.value)} />
					<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="text" placeholder="Model" onChange={(e) => setModel(e.target.value)} />
					<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="text" placeholder="Mileage" onChange={(e) => setMileage(e.target.value)} />
					<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="text" placeholder="Fuel Type" onChange={(e) => setFuelType(e.target.value)} />
					<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="text" placeholder="6hours fee" onChange={(e) => setPrice1(e.target.value)} />
					<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="text" placeholder="1day fee" onChange={(e) => setPrice2(e.target.value)} />
					<input className="rounded-md w-56 px-2 py-1 h-10 outline-none" type="text" placeholder="2days fee" onChange={(e) => setPrice3(e.target.value)} />
					<input
						type="file"
						className="w-52"
						accept="image/*" // Allow only image files
						onChange={(e) => setSelectedPhoto(e.target.files[0])}
					/>
					<button type="submit" className="bg-green-600 px-3 py-1 rounded-md text-white">
						Upload
					</button>
				</form>
				{selectedPhoto && (
					<div>
						<h3 className="font-semibold text-lg mb-5">Selected Photo Preview:</h3>
						<img
							src={URL.createObjectURL(selectedPhoto)} // Display a preview of the selected photo
							alt="Selected"
							style={{ maxWidth: '100%', maxHeight: '200px' }} // Limit preview size
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default CarUpload;
