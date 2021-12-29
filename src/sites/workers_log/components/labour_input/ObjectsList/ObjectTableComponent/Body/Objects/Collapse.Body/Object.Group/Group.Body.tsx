import WorkersLog from '../../../../../../../../types';
import React from 'react';
import GroupBodyRow from './Group.Body.Row';

type ComponentProps = {
	groupedObject: WorkersLog.LabourInput.Payload.Objects.WorkTimeGroupedObjects;
	show: boolean;
};

function GroupBody(props: ComponentProps) {
	if (props.groupedObject.objects.length > 1)
		return (
			<>
				{props.groupedObject.objects.map((e, index) => (
					<GroupBodyRow key={index} show={props.show} object={parseInt(e.id)} />
				))}
			</>
		);
	return <></>;
}

export default GroupBody;
