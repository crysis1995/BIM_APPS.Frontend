import WorkersLog from '../../../../../../../../types';
import React from 'react';
import GroupBodyRow from './Group.Body.Row';

type ComponentProps = { groupedObject: WorkersLog.LabourInput.Payload.Objects.MultipleObject; show: boolean };

function GroupBody(props: ComponentProps) {
	return (
		<>
			{props.groupedObject.objects.map((e) => (
				<GroupBodyRow show={props.show} object={e} />
			))}
		</>
	);
}

export default GroupBody;
