import React from 'react';
import { connect } from 'react-redux';

import WorkersLogRedux from '../../../redux';
import { Spinner } from 'react-bootstrap';
import Summary from './summary';
import HideComponent from '../../../../../components/HideComponent';
import { RootState } from '../../../../../state';

const mapStateToProps = (state: RootState) => ({
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
		<div data-testid="WorkTimeSummaryComponent" className={'py-3 d-flex flex-row'}>
			{props.loading ? (
				<div className={'d-flex flex-column w-100 align-items-center'}>
					<Spinner data-testid="loading" animation="border" size="sm" />
				</div>
			) : (
				<HideComponent when={!props.ActualCrew}>
					<div className={'f-flex flex-column'}>
						<Summary />
					</div>
					{/*<Col xs={"auto"} className={"pt-3 d-flex justify-content-end"}>*/}
					{/*	<FillLabourInputComponent />*/}
					{/*</Col>*/}
				</HideComponent>
			)}
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkTimeSummaryComponent);
