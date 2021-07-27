import * as React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import Loader from '../components/Loader';
import ModalComponent from '../components/Modal/component';
import NotificationComponent from '../components/Notification';
import { MainComponent } from './mainComponent';
import ModelViewer from '../sites/model_viewer';
import { EApplications } from '../sites/types';

// todo zrobić sidebar

const Header = React.lazy(() => import('./header'));
const WorkProgressLayout = React.lazy(() => import('./workProgressComponent'));
const workersLogComponent = React.lazy(() => import('./workersLogComponent'));
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
								path={[`/${EApplications.WORK_PROGRESS}/:type`, `/${EApplications.WORK_PROGRESS}`]}
								component={WorkProgressLayout}
							/>
							<Route
								path={[`/${EApplications.WORKERS_LOG}/:module`, `/${EApplications.WORKERS_LOG}`]}
								component={workersLogComponent}
							/>
							<Route path={`/${EApplications.MODEL_VIEWER}`} component={ModelViewer} />
							<Route exact path="/" component={MainComponent} />
						</Switch>
					</Row>
				</Container>
			</React.Suspense>
		</>
	);
}

export default Layout;
