import React from 'react';
import ObjectsCollapseHeader from './Collapse.Header';
import ObjectsCollapseBody from './Collapse.Body';

type ComponentProps = {
	setActualAccordion: (value: ((prevState: string | null) => string | null) | string | null) => void;
	actualAccordion: string | null;
};

function ObjectsListComponent(props: ComponentProps) {
	const eventKey: 'elements' = 'elements';
	return (
		<>
			<ObjectsCollapseHeader
				eventKey={eventKey}
				setAccordion={props.setActualAccordion}
				actualAccordion={props.actualAccordion}
			/>
			<ObjectsCollapseBody eventKey={eventKey} actualAccordion={props.actualAccordion} />
		</>
	);
}

export default ObjectsListComponent;
