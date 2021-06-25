import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Components from './components';
import { WORKERS_LOG } from './redux/constants';
import WorkersLogGeneralActions from './redux/general/actions';
import Viewer from '../../components/ForgeViewer/components';
import { Props } from '../../types/PropsType';
import { RootState } from '../../store';

type ComponentProps = {};
const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {
	workersLogInitialize: WorkersLogGeneralActions.Initialize,
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
