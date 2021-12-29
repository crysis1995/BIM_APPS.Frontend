import ActualEventKeyRowViewer from './Utils/ActualEventKeyRowViewer';
import React from 'react';
import { connect } from 'react-redux';
import OtherWorksWorkedTime from './OtherWorksWorkedTime';
import { RootState } from '../../../../../../../../state';


type ComponentProps = {
	eventKey: string;
	actualAccordion: string | null;
	workID: string;
};

const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	otherWork: state.WorkersLog.LabourInput.TimeEvidence.OtherWorksTimeEvidences?.[componentProps.workID],
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & {
		eventKey: string;
		actualAccordion: string | null;
		workID: string;
	};

function OtherWorksCollapseComponent(props: Props) {
	return (
		<ActualEventKeyRowViewer show={props.eventKey === props.actualAccordion}>
			<td colSpan={2}>{props.otherWork?.other_works_option.name}</td>
			<td>{props.otherWork?.description}</td>
			<OtherWorksWorkedTime otherWorkID={props.workID} />
		</ActualEventKeyRowViewer>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherWorksCollapseComponent);
