import React from 'react';
import Accessors from '../../components/Accessors';
import ModelViewer from './index';
import { EApplications } from '../types';

function ModelViewerComponent() {
	return (
		<Accessors.CMSLoginAccessor>
			<Accessors.ProjectAccessor>
				<Accessors.BIM360ServiceAccessor>
					<Accessors.AppsPermissionAccessor requiredApp={EApplications.MODEL_VIEWER}>
						<ModelViewer />
					</Accessors.AppsPermissionAccessor>
				</Accessors.BIM360ServiceAccessor>
			</Accessors.ProjectAccessor>
		</Accessors.CMSLoginAccessor>
	);
}

export default ModelViewerComponent;
