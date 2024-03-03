import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [activePage, setActivePage] = useState('');

	useEffect(() => {
		setActivePage(location.pathname);
	}, [location]);

	const routes = [
		{ id: 1, name: 'Shared Cars', src: '/' },
		{ id: 2, name: 'My Rentals', src: '/myRentals' },
		{ id: 3, name: 'My Shares', src: '/myShares' },
		{ id: 4, name: 'Rent My Car', src: '/upload' },
	];

	const logout = () => {
		localStorage.removeItem('jwt');
		localStorage.removeItem('userName');
		localStorage.removeItem('userId');
		props.refresher();
		navigate('/login');
	};
	return (
		<div className="flex justify-between items-center px-5 bg-black/90">
			<div>
				<h1 className="text-white text-xl font-semibold">Klenty Car Shares</h1>
			</div>
			<nav className="flex gap-x-10 w-3/6 h-16 text-white items-center text-xl font-semibold">
				{routes.map((route) => {
					return (
						<Link className={`hover:border-b ease-linear duration-100 ${activePage === route.src ? 'border-b' : ''}`} to={route.src} key={route.id}>
							{route.name}
						</Link>
					);
				})}
			</nav>
			<div className="text-white">
				<button onClick={logout} className="bg-neutral-700 px-2 py-1 rounded-md">
					logout
				</button>
			</div>
		</div>
	);
};

export default Navbar;
