import React from 'react';
import { EApplicationsWithModules } from '../types';
import Accessors from '../../components/Accessors';
import { Route, Switch } from 'react-router-dom';
import { Constants } from './redux/constants';
import Loader from '../../components/Loader';

const MonolithicLayoutComponent = React.lazy(() => import('./components/monolithic'));
const PrefabricatedLayoutComponent = React.lazy(() => import('./components/prefabricated'));
const GeneralLayoutComponent = React.lazy(() => import('./components/general_construction'));

function WorkProgressComponent() {
	return (
		<Accessors.CMSLoginAccessor>
			<Accessors.ProjectAccessor>
				<Accessors.BIM360ServiceAccessor>
					<React.Suspense fallback={<Loader />}>
						<Switch>
							<Route path={`/work_progress/${Constants.AcceptanceType.MONOLITHIC}`}>
								<Accessors.AppsPermissionAccessor
									requiredApp={EApplicationsWithModules.WORK_PROGRESS_MONOLITHIC}>
									<MonolithicLayoutComponent />
								</Accessors.AppsPermissionAccessor>
							</Route>
							<Route path={`/work_progress/${Constants.AcceptanceType.PREFABRICATED}`}>
								<Accessors.AppsPermissionAccessor
									requiredApp={EApplicationsWithModules.WORK_PROGRESS_PREFABRICATED}>
									<PrefabricatedLayoutComponent />
								</Accessors.AppsPermissionAccessor>
							</Route>
							<Route path={`/work_progress/${Constants.AcceptanceType.GENERAL_CONSTRUCTION}`}>
								<Accessors.AppsPermissionAccessor
									requiredApp={EApplicationsWithModules.WORK_PROGRESS_GENERAL_CONSTRUCTION}>
									<GeneralLayoutComponent />
								</Accessors.AppsPermissionAccessor>
							</Route>
						</Switch>
					</React.Suspense>
				</Accessors.BIM360ServiceAccessor>
			</Accessors.ProjectAccessor>
		</Accessors.CMSLoginAccessor>
	);
}

export default React.memo(WorkProgressComponent);
