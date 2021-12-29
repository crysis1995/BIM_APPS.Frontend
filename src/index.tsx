import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter } from 'react-router-dom';
import State from './state';

ReactDOM.render(
	<BrowserRouter basename="/bim_apps">
		<Provider store={State}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
