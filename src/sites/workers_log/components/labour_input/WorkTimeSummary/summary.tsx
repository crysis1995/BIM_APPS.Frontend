import { TooltipComponent } from '../../../../../components/Tooltip';
import React, { useEffect, useState } from 'react';

import WorkersLogRedux from '../../../redux';
import { connect } from 'react-redux';
import { SummaryWorkedTimeComponent } from './summaryWorkedTimeComponent';
import { CurrentWorkedTimeComponent } from './currentWorkedTimeComponent';
import { CrewNameComponent } from './crewNameComponent';
import { DifferenceWorkedTimeComponent } from './differenceWorkedTimeComponent';
import { RootState } from '../../../../../state';

const mapStateToProps = (state: RootState) => ({
	LabourSummaryWorkTime: state.WorkersLog.LabourInput.TimeEvidence.LabourSummaryWorkTime,
	CurrentSummaryWorkTime: state.WorkersLog.LabourInput.TimeEvidence.CurrentSummaryWorkTime,
	TimeDifference: state.WorkersLog.LabourInput.TimeEvidence.TimeDifference,
	CrewName:
		state.WorkersLog.LabourInput.General.ActualCrew && state.WorkersLog.General.all_crews
			? state.WorkersLog.General.all_crews[state.WorkersLog.LabourInput.General.ActualCrew].name
			: null,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function Summary(props: Props) {
	const [variant, setVariant] = useState<'success' | 'danger'>('danger');

	useEffect(() => {
		setVariant(
			props.LabourSummaryWorkTime === props.CurrentSummaryWorkTime && props.CurrentSummaryWorkTime > 0
				? 'success'
				: 'danger',
		);
	}, [props.LabourSummaryWorkTime, props.CurrentSummaryWorkTime]);

	return (
		<h4>
			<CrewNameComponent crewName={props.CrewName} />
			<TooltipComponent message="Liczba wypełnionych godzin" show={true}>
				<CurrentWorkedTimeComponent variant={variant} currentWorkedTime={props.CurrentSummaryWorkTime} />
			</TooltipComponent>
			/
			<TooltipComponent message="Liczba godzin wypełniona w dzienniku brygadzistowskim" show={true}>
				<SummaryWorkedTimeComponent variant={variant} sumWorkTimeEvidence={props.LabourSummaryWorkTime} />
			</TooltipComponent>
			<span>
				<small className={'text-muted'}>Do uzupełnienia: </small>
			</span>
			<TooltipComponent message="Liczba godzin do wypełnienia" show={true}>
				<DifferenceWorkedTimeComponent variant={variant} TimeDifference={props.TimeDifference} />
			</TooltipComponent>
		</h4>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
