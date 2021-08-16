import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CMSLoginType } from '../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../redux';
import { connect } from 'react-redux';
import ToFillTimeSummary from './ToFillTimeSummary';
import { LabourInputDescriptionForm } from './LabourInputDescriptionForm';
import { ElementType } from './types';

const mapStateToProps = (state: {
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
}) => ({
	crewType: state.WorkersLog.LabourInput.General.ActiveWorkType,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function ModalBody(props: Props) {
	return (
		<>
			<Row>
				<Col xs={12}>
					<h4>
						<ToFillTimeSummary />
					</h4>
				</Col>
			</Row>
			<Row>
				<LabourInputDescriptionForm crewType={props.crewType} elementType={ElementType.Wall} />
			</Row>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalBody);
