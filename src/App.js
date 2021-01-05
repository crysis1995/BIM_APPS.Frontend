import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loader from './components/Loader';
import NotificationComponent from './components/Notification';

// Containers
const Layout = React.lazy(() => import('./Layout'));

function App() {
	return (
		<BrowserRouter basename="/bim_apps">
			<React.Suspense fallback={<Loader />}>
				<NotificationComponent>
					<Switch>
						<Route path="/" name="Home" component={Layout} />
					</Switch>
				</NotificationComponent>
			</React.Suspense>
		</BrowserRouter>
	);
}

export default App;
