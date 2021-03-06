import * as React from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { logUserIfValid } from '../components/CMSLogin/redux/actions';
import Loader from '../components/Loader';
import ModalComponent from '../components/Modal/component';

// todo zrobić sidebar

//components
const Header = React.lazy(() => import('./header'));
const WorkProgressLayout = React.lazy(() => import('../sites/work_progress'));
const WorkAcceptanceLayout = React.lazy(() => import('../sites/work_acceptance'));
const ScheduleLayout = React.lazy(() => import('../sites/schedule'));
const WorkersLogLayout = React.lazy(() => import('../sites/workers_log'));
const Login = React.lazy(() => import('../components/CMSLogin/components/login'));
const Settings = React.lazy(() => import('../components/CMSLogin/components/settings'));

class Layout extends React.Component {
	componentDidMount() {
		this.props.logUserIfValid();
	}
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
						<Header {...this.props} />
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
										else if (!this.props.project.id)
											return (
												<Col sm={'auto'} className={'p-3'}>
													<Alert variant={'warning'}>Wybierz projekt</Alert>
												</Col>
											);
										else if (!this.props.project.urn)
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
										else if (!this.props.project.id)
											return (
												<Col sm={'auto'} className={'p-3'}>
													<Alert variant={'warning'}>Wybierz projekt</Alert>
												</Col>
											);
										else if (!this.props.project.urn)
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

const mapStateToProps = ({ Autodesk, Odbiory, CMSLogin }) => ({
	Autodesk_is_login: Autodesk.isLogin,
	started: Odbiory.OdbioryComponent.started,
	CMS_is_login: CMSLogin.is_login,
	project: CMSLogin.project,
});

const mapDispatchToProps = { logUserIfValid };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
