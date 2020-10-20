import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { logUserIfValid } from '../components/CMSLogin/redux/actions';
import Loader from '../components/Loader';
import ModalComponent from '../components/Modal/component';

// todo zrobić sidebar

//components
const Header = React.lazy(() => import('./Header'));
const WorkProgressLayout = React.lazy(() => import('../sites/work_progress'));
const WorkAcceptanceLayout = React.lazy(() => import('../sites/work_acceptance'));
const ScheduleLayout = React.lazy(() => import('../sites/schedule'));
const Login = React.lazy(() => import('../components/CMSLogin/components/login'));
const Settings = React.lazy(() => import('../components/CMSLogin/components/settings'));

class Layout extends React.Component {
	componentDidMount() {

		// console.log(this.props)
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
							paddingLeft: 0,
							paddingRight: 0,
						}}>
						<Header {...this.props} />
						<Row noGutters style={{ minHeight: window.innerHeight - 56 }} className="justify-content-md-center">
							<Switch>
								<Route path="/login" component={Login} />
								<Route path="/settings" component={Settings} />
								<Route exact path="/">
									<Col>
										<div className="p-5">
											<h1>Strona główna aplikacji BIM</h1>
											<p>Na feedback czekamy tu - bimspace@warbud.pl</p>
										</div>
									</Col>
								</Route>
								<Route path="/work_progress" component={WorkProgressLayout} />
								<Route path="/work_acceptance" component={WorkAcceptanceLayout} />
								<Route path="/schedule" component={ScheduleLayout} />
							</Switch>
						</Row>
					</Container>
					<ModalComponent />
				</React.Suspense>
			</>
		);
	}
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = { logUserIfValid };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
