import React from 'react';

export function CrewNameComponent(props: { crewName: string | null }) {
	return (
		<span className='mr-2'>
			<small className={'text-muted'}>Brygada:</small> {props.crewName}
		</span>
	);
}