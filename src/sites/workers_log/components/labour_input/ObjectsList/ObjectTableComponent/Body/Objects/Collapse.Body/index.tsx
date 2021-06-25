import ObjectSingle from './Object.Single';
import { v4 } from 'uuid';
import React, { useState } from 'react';
import { RootState } from '../../../../../../../../../store';
import ObjectGroup from './Object.Group';
import { connect } from 'react-redux';

type ComponentProps = {
	eventKey: 'elements';
	actualAccordion: string | null;
};

const mapStateToProps = (state: RootState) => ({
	ObjectsGroups: state.WorkersLog.LabourInput.Objects.ObjectsGroups,
	// ObjectsGroups: ObjectsGroups,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function ObjectsCollapsedListComponent(props: Props) {
	const [groupAccordion, setGroupedAccordion] = useState<string | null>(null);

	return (
		<>
			{props.ObjectsGroups.map((object) =>
				typeof object === 'number' ? (
					<ObjectSingle key={v4()} object={object} show={props.eventKey === props.actualAccordion} />
				) : (
					<ObjectGroup
						key={v4()}
						setGroupedAccordion={setGroupedAccordion}
						groupAccordion={groupAccordion}
						groupedObject={object}
						eventKey={props.eventKey}
						actualAccordion={props.actualAccordion}
					/>
				),
			)}
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectsCollapsedListComponent);
