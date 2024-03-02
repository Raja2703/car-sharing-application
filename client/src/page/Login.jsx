import React, { useState } from 'react';
import './register.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = (props) => {
	const navigate = useNavigate();
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			userName,
			password,
		};

		console.log(data);

		fetch(`http://localhost:3000/api/v1/user/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.err) {
					setError(data.err);
				} else {
					localStorage.setItem('jwt', data.token);
					localStorage.setItem('userName', data.user.userName);
					localStorage.setItem('userId', data.user.id);
					props.refresher();
					navigate('/');
				}
			})
			.catch((err) => setError(err));
	};

	return (
		<div className="bg-neutral-800 w-full h-screen flex justify-center items-center">
			<form method="POST" onSubmit={handleSubmit} className="blurer flex flex-col px-14 pb-10 pt-5 justify-center items-center gap-y-5">
				<h1 className="text-2xl text-white">Login</h1>
				<input placeholder="Username" className="w-56 h-10 px-2 outline-none rounded-lg" onChange={(e) => setUserName(e.target.value)} />
				<input placeholder="Password" className="w-56 h-10 px-2 outline-none rounded-lg" onChange={(e) => setPassword(e.target.value)} />
				{error && <p className="text-red-600">{error}</p>}
				<button type="submit" className="w-20 text-white bg-green-700 rounded-md h-10">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Login;
