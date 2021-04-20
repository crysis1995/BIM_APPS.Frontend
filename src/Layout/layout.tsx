import * as React from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import Loader from '../components/Loader';
import ModalComponent from '../components/Modal/component';
import NotificationComponent from '../components/Notification';
import { AutodeskLogin } from '../components/AutodeskLogin/type';
import { CMSLogin } from '../components/CMSLogin/type';

// todo zrobić sidebar

const Header = React.lazy(() => import('./header'));
const WorkProgressLayout = React.lazy(() => import('../sites/work_progress'));
const WorkAcceptanceLayout = React.lazy(() => import('../sites/work_acceptance'));
const ScheduleLayout = React.lazy(() => import('../sites/schedule'));
const WorkersLogLayout = React.lazy(() => import('../sites/workers_log'));
const Login = React.lazy(() => import('../components/CMSLogin/components/login'));
const Settings = React.lazy(() => import('../components/CMSLogin/components/settings'));

const mapStateToProps = (state: {
	Autodesk: AutodeskLogin.Redux.Store;
	CMSLogin: CMSLogin.Redux.Store;
	Odbiory: { OdbioryComponent: { started: boolean } };
}) => ({
	Autodesk_is_login: state.Autodesk.isLogin,
	started: state.Odbiory.OdbioryComponent.started,
	CMS_is_login: state.CMSLogin.is_login,
	project: state.CMSLogin.actual_project,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
class Layout extends React.Component<Props> {
	render() {
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
								<Route path="/login" component={Login} />
								<Route path="/settings" component={Settings} />

								<Route
									path={['/work_progress/:type', '/work_progress']}
									render={(props) => {
										if (!this.props.CMS_is_login) return <Redirect to="/login" />;
										else if (!this.props.project?.id)
											return (
												<Col sm={'auto'} className={'p-3'}>
													<Alert variant={'warning'}>Wybierz projekt</Alert>
												</Col>
											);
										else if (!this.props.project?.urn)
											return (
												<Col sm={'auto'} className={'p-3'}>
													<Alert variant={'warning'}>
														Model niedostępny dla wybranego projektu
													</Alert>
												</Col>
											);
										else if (!this.props.Autodesk_is_login)
											return (
												<Col sm={'auto'} className={'p-3'}>
													<Alert variant={'warning'}>
														Usługa BIM360 niedostępna - odśwież stronę lub wróć później
													</Alert>
												</Col>
											);
										else return <WorkProgressLayout {...props} />;
									}}
								/>
								<Route path="/work_acceptance" component={WorkAcceptanceLayout} />
								<Route path="/schedule" component={ScheduleLayout} />
								<Route
									path={['/workers_log/:module', '/workers_log']}
									render={() => {
										if (!this.props.CMS_is_login) return <Redirect to="/login" />;
										else if (!this.props.project?.id)
											return (
												<Col sm={'auto'} className={'p-3'}>
													<Alert variant={'warning'}>Wybierz projekt</Alert>
												</Col>
											);
										else if (!this.props.project?.urn)
											return (
												<Col sm={'auto'} className={'p-3'}>
													<Alert variant={'warning'}>
														Model niedostępny dla wybranego projektu
													</Alert>
												</Col>
											);
										else if (!this.props.Autodesk_is_login)
											return (
												<Col sm={'auto'} className={'p-3'}>
													<Alert variant={'warning'}>
														Usługa BIM360 niedostępna - odśwież stronę lub wróć później
													</Alert>
												</Col>
											);
										else return <WorkersLogLayout />;
									}}
								/>
								<Route exact path="/">
									<Col>
										<div className="p-5">
											<h1>Strona główna aplikacji BIM</h1>
											<p>Na feedback czekamy tu - bimspace@warbud.pl</p>
										</div>
									</Col>
								</Route>
							</Switch>
						</Row>
					</Container>
				</React.Suspense>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
