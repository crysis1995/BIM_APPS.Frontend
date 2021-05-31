import React from 'react';
import { LabourInput } from '../../../../../../redux/labour_input/types';
import ObjectTimeInputComponent from './Object.TimeInput.Component';
import ObjectStatusComponent from './Object.Status.Component';
import ObjectNameComponent from './Object.Name.Component';
import { ActualEventKeyRowViewer } from '../OtherWork/Utils/ActualEventKeyRowViewer';

function ObjectRowComponent(props: {
	objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'];
	eventKey: 'elements';
	actualAccordion: string | null;
}) {
	return (
		<ActualEventKeyRowViewer eventKey={props.eventKey} actualAccordion={props.actualAccordion}>
			{/*<td>*/}
			{/*	<ObjectSelectionComponent objectID={props.objectID} />*/}
			{/*</td>*/}
			<td>
				<ObjectNameComponent objectID={props.objectID} />
			</td>
			<td>
				<ObjectStatusComponent objectID={props.objectID} />
			</td>
			<ObjectTimeInputComponent objectID={props.objectID} />
		</ActualEventKeyRowViewer>
	);
}

export default ObjectRowComponent;
