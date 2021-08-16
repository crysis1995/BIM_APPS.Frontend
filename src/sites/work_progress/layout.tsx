import React from 'react';
import { EApplicationsWithModules } from '../types';
import Accessors from '../../components/Accessors';
import { Route } from 'react-router-dom';
import { Constants } from './redux/constants';
import Loader from '../../components/Loader';

const MonolithicLayoutComponent = React.lazy(() => import('./components/monolithic'));
const PrefabricatedLayoutComponent = React.lazy(() => import('./components/prefabricated'));
function WorkProgressComponent() {
	return (
		<React.Suspense fallback={<Loader />}>
			<Accessors.CMSLoginAccessor>
				<Accessors.ProjectAccessor>
					<Accessors.BIM360ServiceAccessor>
						<Route exact path={`/work_progress/${Constants.AcceptanceType.MONOLITHIC}`}>
							<Accessors.AppsPermissionAccessor
								requiredApp={EApplicationsWithModules.WORK_PROGRESS_MONOLITHIC}>
								<MonolithicLayoutComponent />
							</Accessors.AppsPermissionAccessor>
						</Route>
						<Route exact path={`/work_progress/prefabricated`}>
							<Accessors.AppsPermissionAccessor
								requiredApp={EApplicationsWithModules.WORK_PROGRESS_PREFABRICATED}>
								<PrefabricatedLayoutComponent />
							</Accessors.AppsPermissionAccessor>
						</Route>
					</Accessors.BIM360ServiceAccessor>
				</Accessors.ProjectAccessor>
			</Accessors.CMSLoginAccessor>
		</React.Suspense>
	);
}

export default WorkProgressComponent;
