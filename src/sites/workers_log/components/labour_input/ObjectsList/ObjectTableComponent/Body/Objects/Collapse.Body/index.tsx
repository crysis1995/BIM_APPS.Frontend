import ObjectSingle from './Object.Single';
import { v4 } from 'uuid';
import React, { useState } from 'react';

import { connect } from 'react-redux';
import ObjectGroup from './Object.Group';
import ActualEventKeyRowViewer from '../../OtherWork/Utils/ActualEventKeyRowViewer';
import ShowComponent from '../../../../../../../../../components/ShowComponent';
import { RootState } from '../../../../../../../../../state';

type ComponentProps = {
	eventKey: 'elements';
	actualAccordion: string | null;
};

const mapStateToProps = (state: RootState) => ({
	ObjectsGroups: state.WorkersLog.LabourInput.Objects.ObjectsGroups,
	ObjectsWorkTime: state.WorkersLog.LabourInput.TimeEvidence.ObjectsTimeEvidences
		? Object.values(state.WorkersLog.LabourInput.TimeEvidence.ObjectsTimeEvidences)
		: [],
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function ObjectsCollapsedListComponent(props: Props) {
	const [groupAccordion, setGroupedAccordion] = useState<string | null>(null);
	if (props.ObjectsGroups.length > 0 || props.ObjectsWorkTime.length > 0)
		return (
			<>
				{props.ObjectsWorkTime.map(
					(item) =>
						item && (
							<ObjectGroup
								eventKey={'elements'}
								actualAccordion={props.actualAccordion}
								groupAccordion={groupAccordion}
								groupedObject={item}
								setGroupedAccordion={setGroupedAccordion}
							/>
						),
				)}
				<ShowComponent when={props.ObjectsWorkTime.length > 0}>
					<ActualEventKeyRowViewer show={props.eventKey === props.actualAccordion}>
						<td colSpan={4} />
					</ActualEventKeyRowViewer>
				</ShowComponent>
				{props.ObjectsGroups.map((object) => (
					<ObjectSingle key={v4()} object={object} show={props.eventKey === props.actualAccordion} />
				))}
			</>
		);
	return (
		<tr>
			<td colSpan={4} hidden={!(props.eventKey === props.actualAccordion)}>
				Brak elementów
			</td>
		</tr>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectsCollapsedListComponent);
