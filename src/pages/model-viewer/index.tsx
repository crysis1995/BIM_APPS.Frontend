import React from 'react';
import Accessors from '../../components/Accessors';
import ModelViewerComponent from './model_viewer';
import { AppEnum } from '../../generated/graphql';

function ModelViewerLayout() {
	return (
		<Accessors.CMSLoginAccessor>
			<Accessors.ProjectAccessor>
				<Accessors.BIM360ServiceAccessor>
					<Accessors.AppsPermissionAccessor requiredApp={AppEnum.ModelViewer}>
						<ModelViewerComponent />
					</Accessors.AppsPermissionAccessor>
				</Accessors.BIM360ServiceAccessor>
			</Accessors.ProjectAccessor>
		</Accessors.CMSLoginAccessor>
	);
}

export default ModelViewerLayout;
