import React from 'react';
import Accessors from '../../components/Accessors';
import { Route } from 'react-router-dom';
import { Constants } from './redux/constants';
import Loader from '../../components/Loader';
import { AppEnum } from '../../generated/graphql';
import { Routes } from 'react-router';

const MonolithicLayoutComponent = React.lazy(() => import('./components/monolithic'));
const PrefabricatedLayoutComponent = React.lazy(() => import('./components/prefabricated'));
const GeneralLayoutComponent = React.lazy(() => import('./components/general_construction'));

function WorkProgressComponent() {
	return (
		<Accessors.CMSLoginAccessor>
			<Accessors.ProjectAccessor>
				<Accessors.BIM360ServiceAccessor>
					<React.Suspense fallback={<Loader />}>
						<Routes>
							<Route
								path={`/work_progress/${Constants.AcceptanceType.MONOLITHIC}`}
								element={
									<Accessors.AppsPermissionAccessor
										requiredApp={AppEnum.WorkProgressMonolithic}>
										<MonolithicLayoutComponent />
									</Accessors.AppsPermissionAccessor>
								}></Route>
							<Route
								path={`/work_progress/${Constants.AcceptanceType.PREFABRICATED}`}>
								<Accessors.AppsPermissionAccessor
									requiredApp={AppEnum.WorkProgressPrecast}>
									<PrefabricatedLayoutComponent />
								</Accessors.AppsPermissionAccessor>
							</Route>
							<Route
								path={`/work_progress/${Constants.AcceptanceType.GENERAL_CONSTRUCTION}`}>
								<Accessors.AppsPermissionAccessor
									requiredApp={AppEnum.WorkProgressGeneral}>
									<GeneralLayoutComponent />
								</Accessors.AppsPermissionAccessor>
							</Route>
						</Routes>
					</React.Suspense>
				</Accessors.BIM360ServiceAccessor>
			</Accessors.ProjectAccessor>
		</Accessors.CMSLoginAccessor>
	);
}

export default React.memo(WorkProgressComponent);
