import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CarUpload from './page/CarUpload';
import SharedCars from './page/SharedCars';
import './index.css';
import Register from './page/Register';
import Login from './page/Login';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SharedCars />} />
				<Route path="/upload" element={<CarUpload />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
