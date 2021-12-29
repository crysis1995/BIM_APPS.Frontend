import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';

// Containers
const Layout = React.lazy(() => import('./Layout'));

function App() {
	return (
		<>
			<Routes>
				<Route
					path="*"
					element={
						<React.Suspense fallback={<Loader />}>
							<Layout />
						</React.Suspense>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
