import * as React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Redirect, Route, Switch } from 'react-router-dom';

import Loader from '../components/Loader';
import ModalComponent from '../components/Modal/component';
import NotificationComponent from '../components/Notification';
import { MainComponent } from './mainComponent';
import { EApplications } from '../sites/types';

// todo zrobić sidebar

const Header = React.lazy(() => import('./header'));
const WorkProgressLayout = React.lazy(() => import('../sites/work_progress/layout'));
const ModelViewer = React.lazy(() => import('../sites/model_viewer/layout'));
const ConstructionMaterialsLayout = React.lazy(() => import('../sites/construction_materials/layout'));
const workersLogComponent = React.lazy(() => import('../sites/workers_log/layout'));
const Login = React.lazy(() => import('../components/CMSLogin/components/login'));
const Settings = React.lazy(() => import('../components/CMSLogin/components/settings'));

function Layout() {
	return (
		<>
			<React.Suspense fallback={<Loader />}>
				<Container
					fluid
					style={{
						minHeight: window.innerHeight,
						maxHeight: window.innerHeight,
						paddingLeft: 0,
						paddingRight: 0,
					}}>
					<Header />
					<NotificationComponent />
					<ModalComponent />
					<Row
						noGutters
						style={{ maxHeight: window.innerHeight - 56, minHeight: window.innerHeight - 56 }}
						className="justify-content-md-center">
						<Switch>
							<Route path="/login" component={Login} />;
							<Route path="/settings" component={Settings} />;
							<Route
								exact
								path={[`/${EApplications.WORK_PROGRESS}/:type`, `/${EApplications.WORK_PROGRESS}`]}
								component={WorkProgressLayout}
							/>
							<Route
								exact
								path={[`/${EApplications.WORKERS_LOG}/:module`, `/${EApplications.WORKERS_LOG}`]}
								component={workersLogComponent}
							/>
							<Route exact path={`/${EApplications.MODEL_VIEWER}`} component={ModelViewer} />
							<Route
								exact
								path={[`/${EApplications.CONSTRUCTION_MATERIALS}/:module`]}
								component={ConstructionMaterialsLayout}
							/>
							<Route exact path="/" component={MainComponent} />
							<Route>
								<Redirect to={'/'} />
							</Route>
						</Switch>
					</Row>
				</Container>
			</React.Suspense>
		</>
	);
}

export default Layout;
