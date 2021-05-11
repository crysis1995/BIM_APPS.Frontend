import React from 'react';
import { CMSLoginType } from '../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../redux';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import HideComponent from '../../../../../components/HideComponent';
import ObjectTableComponent from './ObjectTableComponent';
import LoaderComponent from '../../../../../components/Loader/LoaderComponent';

const mapStateToProps = (state: {
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
}) => ({
	isHide:
		!state.WorkersLog.LabourInput.Objects.AllObjects ||
		!state.WorkersLog.LabourInput.General.ActualCrew ||
		!state.WorkersLog.LabourInput.General.ActiveWorkType,
	isLoading:
		state.WorkersLog.LabourInput.General.StatusesLoading ||
		state.WorkersLog.LabourInput.Objects.Loading ||
		state.WorkersLog.LabourInput.TimeEvidence.LabourSummaryWorkTimeLoading,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function ObjectsListComponent(props: Props) {
	return (
		<LoaderComponent loading={props.isLoading}>
			<HideComponent when={props.isHide}>
				<Row>
					<Col>
						<ObjectTableComponent />
					</Col>
				</Row>
			</HideComponent>
		</LoaderComponent>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectsListComponent);
