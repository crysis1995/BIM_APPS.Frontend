import WorkersLog from '../../../types';
import LocaleNameCore from '../../../../../localisation/LocaleName.Core';
import React from 'react';

export function Name(props: { object: WorkersLog.WorkTimeEvidence.Crew.Payload.CrewPayload }) {
	const name = `[${props.object.id}]  ${LocaleNameCore({ value: props.object.workers_type })} - ${props.object.name}`;
	return <option value={props.object.id}>{name}</option>;
}
