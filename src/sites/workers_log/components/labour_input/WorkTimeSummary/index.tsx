import React from 'react';
import { connect } from 'react-redux';
import { CMSLoginType } from '../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../redux';
import { Col, Row, Spinner } from 'react-bootstrap';
import Summary from './summary';
import HideComponent from '../../../../../components/HideComponent';

const mapStateToProps = (state: {
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
}) => ({
	loading:
		state.WorkersLog.LabourInput.TimeEvidence.LabourSummaryWorkTimeLoading ||
		state.WorkersLog.LabourInput.Objects.Loading ||
		Object.values(state.WorkersLog.LabourInput.TimeEvidence.ObjectsTimeEvidencesLoading).reduce(
			(previousValue, currentValue) => previousValue || currentValue,
			false,
		),
	ActualCrew: state.WorkersLog.LabourInput.General.ActualCrew,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function WorkTimeSummaryComponent(props: Props) {
	return (
		<Row className={'pb-3'}>
			{props.loading ? (
				<Col className={'justify-content-center'}>
					<Spinner animation="border" size="sm" />
				</Col>
			) : (
				<HideComponent when={!props.ActualCrew}>
					<Col className={'pt-3'}>
						<Summary />
					</Col>
				</HideComponent>
			)}
		</Row>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkTimeSummaryComponent);
