import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CarUpload from './page/CarUpload';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CarUpload />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
