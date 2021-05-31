import React from 'react';
import { CMSLoginType } from '../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../redux';
import { connect } from 'react-redux';
import HideComponent from '../../../../../components/HideComponent';
import ObjectsTimeInputColector from './ObjectTableComponent';
import LoaderComponent from '../../../../../components/Loader/LoaderComponent';

const mapStateToProps = (state: {
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
}) => ({
	isHide:
		!state.WorkersLog.LabourInput.Objects.AllObjects ||
		!state.WorkersLog.LabourInput.General.ActualCrew ||
		!state.WorkersLog.LabourInput.General.ActiveWorkType ||
		!state.WorkersLog.LabourInput.General.ActiveLevel,
	isLoading:
		state.WorkersLog.LabourInput.General.StatusesLoading ||
		state.WorkersLog.LabourInput.General.OtherWorksLoading ||
		state.WorkersLog.LabourInput.Objects.Loading ||
		state.WorkersLog.LabourInput.TimeEvidence.LabourSummaryWorkTimeLoading ||
		state.WorkersLog.LabourInput.TimeEvidence.GroupedOtherWorkTimeEvidenceLoading,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function ObjectsListComponent(props: Props) {
	return (
		<LoaderComponent loading={props.isLoading}>
			<HideComponent when={props.isHide}>
				<div className={'f-flex flex-row'} style={{ overflowY: 'auto' }}>
					<div className={'f-flex flex-column'}>
						<ObjectsTimeInputColector />
					</div>
				</div>
			</HideComponent>
		</LoaderComponent>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectsListComponent);
