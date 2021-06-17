import React from 'react';
import Loader from '../../components/Loader';
import { Route } from 'react-router-dom';
import MonolithicLayoutComponent from './components/monolithic';
import { Constants } from './redux/constants';

export default function () {
	return (
		<React.Suspense fallback={<Loader />}>
			<Route
				exact
				path={`/work_progress/${Constants.AcceptanceType.MONOLITHIC}`}
				component={MonolithicLayoutComponent}
			/>
		</React.Suspense>
	);
}
