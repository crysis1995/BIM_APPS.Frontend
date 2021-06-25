import React from 'react';
import ObjectsHeaderComponent from './Collapse.Header';
import ObjectsCollapsedListComponent from './Collapse.Body';

type ComponentProps = {
	setActualAccordion: (value: ((prevState: string | null) => string | null) | string | null) => void;
	actualAccordion: string | null;
};

function ObjectsListComponent(props: ComponentProps) {
	const eventKey: 'elements' = 'elements';
	return (
		<>
			<ObjectsHeaderComponent
				eventKey={eventKey}
				setAccordion={props.setActualAccordion}
				actualAccordion={props.actualAccordion}
			/>
			<ObjectsCollapsedListComponent eventKey={eventKey} actualAccordion={props.actualAccordion} />
		</>
	);
}

export default ObjectsListComponent;
