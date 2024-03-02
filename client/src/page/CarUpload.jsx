import React, { useState } from 'react';

function CarUpload() {
	const [selectedPhoto, setSelectedPhoto] = useState(null);
	const [make, setMake] = useState('');
	const [model, setModel] = useState('');
	const [mileage, setMileage] = useState('');
	const [fuelType, setFuelType] = useState('');
	const [price, setPrice] = useState('');

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
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
			carFee: price,
			image: convertedPhoto,
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
		<div>
			<h2>Upload a Photo</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Make" onChange={(e) => setMake(e.target.value)} />
				<input type="text" placeholder="Model" onChange={(e) => setModel(e.target.value)} />
				<input type="text" placeholder="Mileage" onChange={(e) => setMileage(e.target.value)} />
				<input type="text" placeholder="Fuel Type" onChange={(e) => setFuelType(e.target.value)} />
				<input type="text" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
				<input
					type="file"
					accept="image/*" // Allow only image files
					onChange={(e) => setSelectedPhoto(e.target.files[0])}
				/>
				<button type="submit">Upload</button>
			</form>
			{selectedPhoto && (
				<div>
					<h3>Selected Photo Preview:</h3>
					<img
						src={URL.createObjectURL(selectedPhoto)} // Display a preview of the selected photo
						alt="Selected"
						style={{ maxWidth: '100%', maxHeight: '200px' }} // Limit preview size
					/>
				</div>
			)}
		</div>
	);
}

export default CarUpload;
