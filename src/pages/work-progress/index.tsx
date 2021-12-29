import React from 'react';
import Accessor from '../../components/Accessors';
import Loader from '../../components/Loader';
import { Route, Routes } from 'react-router-dom';
import { Constants } from '../../sites/work_progress/redux/constants';
import { AppEnum } from '../../generated/graphql';

const Monolithic = React.lazy(() => import('./monolithic'));
const Precast = React.lazy(() => import('./precast'));
const General = React.lazy(() => import('./general'));

function WorkProgressComponent() {


	return (
		<Accessor.CMSLoginAccessor>
			<Accessor.ProjectAccessor>
				<Accessor.BIM360ServiceAccessor>
					<React.Suspense fallback={<Loader />}>
						<Routes>
							<Route
								path={`/${Constants.AcceptanceType.MONOLITHIC}`}
								element={
									<Accessor.AppsPermissionAccessor
										requiredApp={AppEnum.WorkProgressMonolithic}>
										<Monolithic />
									</Accessor.AppsPermissionAccessor>
								}
							/>
							<Route
								path={`/${Constants.AcceptanceType.PREFABRICATED}`}
								element={
									<Accessor.AppsPermissionAccessor
										requiredApp={AppEnum.WorkProgressPrecast}>
										<Precast />
									</Accessor.AppsPermissionAccessor>
								}
							/>
							<Route
								path={`/${Constants.AcceptanceType.GENERAL_CONSTRUCTION}`}
								element={
									<Accessor.AppsPermissionAccessor
										requiredApp={AppEnum.WorkProgressGeneral}>
										<General />
									</Accessor.AppsPermissionAccessor>
								}
							/>
						</Routes>
					</React.Suspense>
				</Accessor.BIM360ServiceAccessor>
			</Accessor.ProjectAccessor>
		</Accessor.CMSLoginAccessor>
	);
}

export default WorkProgressComponent;
