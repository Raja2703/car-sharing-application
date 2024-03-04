import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CarUpload from './page/CarUpload';
import SharedCars from './page/SharedCars';
import './index.css';
import Register from './page/Register';
import Login from './page/Login';
import BookCar from './page/BookCar';
import MyRentals from './page/MyRentals';
import RentalDetails from './page/RentalDetails';
import { useEffect, useState } from 'react';
import MyShares from './page/MyShares';

function App() {
	const [jwt, setJwt] = useState();
	const [refresh, setRefresh] = useState(false);
	useEffect(() => {
		setJwt(localStorage.getItem('jwt'));
	}, [refresh]);

	const refresher = () => {
		setRefresh(!refresh);
	};

	return (
		<BrowserRouter>
			<Routes>
				{jwt ? (
					<>
						<Route path="/" element={<SharedCars refresher={refresher} />} exact />
						<Route path="/myRentals" element={<MyRentals refresher={refresher} />} exact />
						<Route path="/myShares" element={<MyShares refresher={refresher} />} exact />
						<Route path="/myShares/:id" element={<RentalDetails refresher={refresher} />} exact />
						<Route path="/myRentals/:id" element={<RentalDetails refresher={refresher} />} exact />
						<Route path="/book/:id" element={<BookCar refresher={refresher} />} exact />
						<Route path="/upload" element={<CarUpload refresher={refresher} />} exact />
					</>
				) : (
					<>
						<Route path="/login" element={<Login refresher={refresher} />} />
						<Route path="/register" element={<Register refresher={refresher} />} />
						<Route path="*" element={<Login refresher={refresher} />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
