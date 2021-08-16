import React from 'react';
import Accessors from '../../components/Accessors';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Components from './components';
import { WORKERS_LOG } from './redux/constants';
import WorkersLogGeneralActions from './redux/general/actions';
import Viewer from '../../components/ForgeViewer/components';
import { RootState } from '../../store';
import { EApplicationsWithModules } from '../types';

type ComponentProps = {};
const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {
	workersLogInitialize: WorkersLogGeneralActions.Initialize,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
function WorkersLog(props: Props) {
	props.workersLogInitialize();
	return (
		<Accessors.CMSLoginAccessor>
			<Accessors.ProjectAccessor>
				<Accessors.BIM360ServiceAccessor>
					<Route exact path={`/workers_log/${WORKERS_LOG.WORK_TIME_EVIDENCE}`}>
						<Accessors.AppsPermissionAccessor
							requiredApp={EApplicationsWithModules.WORKERS_LOG_WORK_TIME_EVIDENCE}>
							<Components.Layout.WorkTimeEvidence />
						</Accessors.AppsPermissionAccessor>
					</Route>
					<Route exact path={`/workers_log/${WORKERS_LOG.LABOUR_INPUT}`}>
						<Accessors.AppsPermissionAccessor
							requiredApp={EApplicationsWithModules.WORKERS_LOG_LABOUR_INPUT}>
							<Col xs={6}>
								<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
									<Viewer runBy={EApplicationsWithModules.WORKERS_LOG_LABOUR_INPUT}/>
								</div>
							</Col>
							<Col xs={6}>
								<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
									<Components.Layout.LabourInput />
								</div>
							</Col>
						</Accessors.AppsPermissionAccessor>
					</Route>
				</Accessors.BIM360ServiceAccessor>
			</Accessors.ProjectAccessor>
		</Accessors.CMSLoginAccessor>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkersLog);
