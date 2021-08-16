import React from 'react';
import Accessors from '../../components/Accessors';
import ConstructionMaterials from './index';

function Layout() {
	return (
		<Accessors.CMSLoginAccessor>
			<Accessors.ProjectAccessor>
				<Accessors.BIM360ServiceAccessor>
					<ConstructionMaterials />
				</Accessors.BIM360ServiceAccessor>
			</Accessors.ProjectAccessor>
		</Accessors.CMSLoginAccessor>
	);
}

export default Layout;
