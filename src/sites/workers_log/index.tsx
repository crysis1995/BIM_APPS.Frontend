import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Loader from '../../components/Loader';
import Components from './components';
import { WORKERS_LOG } from './redux/constants';

function WorkersLog() {
	// console.log(props);
	return (
		<React.Suspense fallback={<Loader />}>
			<Route exact path={`/workers_log/${WORKERS_LOG.WORK_TIME_EVIDENCE}`}>
				{/*<Col xs={6}>*/}
				{/*	<div className="d-flex align-items-stretch" style={{ height: '100%' }}>*/}
				<Components.Layout.WorkTimeEvidence />
				{/*	</div>*/}
				{/*</Col>*/}
			</Route>
			<Route exact path={`/workers_log/${WORKERS_LOG.LABOUR_INPUT}`}>
				<Col xs={6}>
					<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
						{/*<Viewer />*/}
					</div>
				</Col>
				<Col xs={6}>
					<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
						<Components.Layout.LabourInput />
					</div>
				</Col>
			</Route>
		</React.Suspense>
	);
}

export default connect(null, null)(WorkersLog);
