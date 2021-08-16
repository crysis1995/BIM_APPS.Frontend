import React from 'react';
import { Route } from 'react-router-dom';
import { EApplications, EApplicationsWithModules } from '../types';
import { ConstructionMaterialTypes } from './types';
import ReinforcementComponent from './components/reinforcement';
import Accessors from '../../components/Accessors';

function ConstructionMaterials() {
	return (
		<Accessors.CMSLoginAccessor>
			<Accessors.ProjectAccessor>
				<Accessors.BIM360ServiceAccessor>
					<Route path={`/${EApplications.CONSTRUCTION_MATERIALS}/${ConstructionMaterialTypes.REINFORCEMENT}`}>
						<Accessors.AppsPermissionAccessor
							requiredApp={EApplicationsWithModules.CONSTRUCTION_MATERIALS_REINFORCEMENT}>
							<ReinforcementComponent />
						</Accessors.AppsPermissionAccessor>
					</Route>
				</Accessors.BIM360ServiceAccessor>
			</Accessors.ProjectAccessor>
		</Accessors.CMSLoginAccessor>
	);
}

export default ConstructionMaterials;
