import React from 'react';
import WorkersLogLayout from '../sites/workers_log';
import Accessors from '../components/Accessors';

function workersLogComponent() {
	return (
		<Accessors.CMSLoginAccessor>
			<Accessors.ProjectAccessor>
				<Accessors.BIM360ServiceAccessor>
					<WorkersLogLayout />
				</Accessors.BIM360ServiceAccessor>
			</Accessors.ProjectAccessor>
		</Accessors.CMSLoginAccessor>
	);
}

export default workersLogComponent;
