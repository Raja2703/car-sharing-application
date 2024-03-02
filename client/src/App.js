import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CarUpload from './page/CarUpload';
import SharedCars from './page/SharedCars';
import './index.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SharedCars />} />
				<Route path="/upload" element={<CarUpload />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
