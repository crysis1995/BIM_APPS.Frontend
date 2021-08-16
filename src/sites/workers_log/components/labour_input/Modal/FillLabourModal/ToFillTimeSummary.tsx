import React, { useEffect, useState } from 'react';
import { DifferenceWorkedTimeComponent } from '../../WorkTimeSummary/differenceWorkedTimeComponent';
import { TooltipComponent } from '../../../../../../components/Tooltip';
import { CMSLoginType } from '../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../redux';
import { connect } from 'react-redux';

const mapStateToProps = (state: {
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
}) => ({
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

function ToFillTimeSummary(props: Props) {
	const [variant, setVariant] = useState<'success' | 'danger'>(props.TimeDifference > 0 ? 'danger' : 'success');
	useEffect(() => {
		if (props.TimeDifference > 0) setVariant('danger');
		else setVariant('success');
	}, [variant]);

	return (
		<>
			<span>
				<small className={'text-muted'}>Godzin do uzupełnienia: </small>
			</span>
			<TooltipComponent message="Liczba godzin do wypełnienia" show={true}>
				<DifferenceWorkedTimeComponent variant={variant} TimeDifference={props.TimeDifference} />
			</TooltipComponent>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ToFillTimeSummary);
