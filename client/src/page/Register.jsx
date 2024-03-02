import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const navigate = useNavigate();
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const [emailError, setEmailError] = useState();
	const [passwordError, setPasswordError] = useState();
	const [passwordConfirmError, setPasswordConfirmError] = useState();
	const [userNameError, setUserNameError] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		const jwt = JSON.parse(localStorage.getItem('jwt'));
		console.log(jwt);
		const data = {
			userName: userName,
			email,
			password,
			passwordConfirm,
		};

		console.log(data);

		fetch(`http://localhost:3000/api/v1/user/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					console.log(data.error.errors);
					if (data.error.errors.userName) {
						setUserNameError(data.error.errors.userName.message);
					}
					if (data.error.errors.email) {
						setEmailError(data.error.errors.email.message);
					}
					if (data.error.errors.password) {
						setPasswordError(data.error.errors.password.message);
					}
					if (data.error.errors.passwordConfirm) {
						setPasswordConfirmError(data.error.errors.passwordConfirm.message);
					}
				} else {
					console.log(data);
					localStorage.setItem('jwt', data);
					navigate('/');
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="bg-neutral-800 w-full h-screen flex justify-center items-center">
			<form method="POST" onSubmit={handleSubmit} className="blurer bg-neutral-800 flex flex-col px-14 pb-10 pt-5 justify-center items-center">
				<h1 className="text-2xl text-white my-5">Register</h1>
				<input placeholder="Username" className="mt-5 w-56 h-10 px-2 outline-none rounded-lg" onChange={(e) => setUserName(e.target.value)} />
				{userNameError && <p className="mt-1 text-red-600">{userNameError}</p>}
				<input placeholder="Email" className="mt-5 w-56 h-10 px-2 outline-none rounded-lg" onChange={(e) => setEmail(e.target.value)} />
				{emailError && <p className="mt-1 text-red-600">{emailError}</p>}
				<input placeholder="Password" className="mt-5 w-56 h-10 px-2 outline-none rounded-lg" onChange={(e) => setPassword(e.target.value)} />
				{passwordError && <p className="mt-1 text-red-600">{passwordError}</p>}
				<input placeholder="Confirm Password" className="mt-5  w-56 h-10 px-2 outline-none rounded-lg" onChange={(e) => setPasswordConfirm(e.target.value)} />
				{passwordConfirmError && <p className="mt-1 text-red-600">{passwordConfirmError}</p>}
				<button type="submit" className="mt-5 w-20 text-white bg-green-700 rounded-md h-10">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Register;
