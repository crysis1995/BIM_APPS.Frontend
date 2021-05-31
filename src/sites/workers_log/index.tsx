import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Components from './components';
import { WORKERS_LOG } from './redux/constants';
import { CrewState } from './redux/work_time_evidence/crew/types/state';
import { WorkersState } from './redux/work_time_evidence/worker/types/state';
import WorkersLogGeneralActions from './redux/general/actions';
import Viewer from '../../components/ForgeViewer/components';
import { Props } from '../../types/ReactComponentProps';

type ComponentProps = {};
const mapStateToProps = (state: {
	WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState } };
}) => ({});
const mapDispatchToProps = {
	workersLogInitialize: WorkersLogGeneralActions.workersLogInitialize,
};
function WorkersLog(props: Props<typeof mapStateToProps, typeof mapDispatchToProps, ComponentProps>) {
	props.workersLogInitialize();
	return (
		<React.Fragment>
			<Route
				exact
				path={`/workers_log/${WORKERS_LOG.WORK_TIME_EVIDENCE}`}
				component={Components.Layout.WorkTimeEvidence}
			/>
			<Route exact path={`/workers_log/${WORKERS_LOG.LABOUR_INPUT}`}>
				<Col xs={6}>
					<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
						<Viewer />
					</div>
				</Col>
				<Col xs={6}>
					<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
						<Components.Layout.LabourInput />
					</div>
				</Col>
			</Route>
		</React.Fragment>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkersLog);
