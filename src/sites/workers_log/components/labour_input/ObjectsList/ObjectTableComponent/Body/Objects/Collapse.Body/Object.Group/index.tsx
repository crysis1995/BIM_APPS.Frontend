import React from 'react';
import WorkersLog from '../../../../../../../../types';
import GroupHeader from './Group.Header';
import GroupBody from './Group.Body';

type ComponentProps = {
	eventKey: 'elements';
	actualAccordion: string | null;
	groupAccordion: string | null;
	groupedObject: WorkersLog.LabourInput.Payload.Objects.MultipleObject;
	setGroupedAccordion: React.Dispatch<React.SetStateAction<string | null>>;
};

function ObjectGroup(props: ComponentProps) {
	return (
		<>
			<GroupHeader
				show={props.actualAccordion === props.eventKey}
				setGroupedAccordion={props.setGroupedAccordion}
				groupAccordion={props.groupAccordion}
				groupedObject={props.groupedObject}
			/>
			<GroupBody
				groupedObject={props.groupedObject}
				show={props.actualAccordion === props.eventKey && props.groupAccordion === props.groupedObject.id}
			/>
		</>
	);
}

export default ObjectGroup;
