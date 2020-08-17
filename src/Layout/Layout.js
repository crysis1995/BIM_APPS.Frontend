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
const AcceptanceLayout = React.lazy(() => import('./AcceptanceLayout'));
const Login = React.lazy(() => import('../components/CMSLogin/components/login'));

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
							paddingLeft: 0,
							paddingRight: 0,
						}}>
						<Header {...this.props} />
						<Row noGutters style={{ minHeight: window.innerHeight - 56 }} className="justify-content-md-center">
							<Switch>
								<Route path="/login" component={Login} />
								<Route exact path="/">
									<Col>
										<div className="p-5">
											<h1>
												Strona główna aplikacji BIM
											</h1>
											<p>
												Na feedback czekamy tu - bimspace@warbud.pl
											</p>
										</div>
										{/*<div className="d-flex align-items-stretch bg-primary" style={{ height: '100%' }}>*/}
										{/*	asdasddas*/}
										{/*</div>*/}
									</Col>
								</Route>
								<Route path="/work_progress" component={AcceptanceLayout} />
								<Route path="/work_acceptance" component={AcceptanceLayout} />
								<Route path="/4d" component={AcceptanceLayout} />
							</Switch>
						</Row>
					</Container>
					<ModalComponent />
				</React.Suspense>
			</>
		);
	}
}

const mapStateToProps = ({ CMSLogin }) => ({
	CMSLogin,
});

const mapDispatchToProps = { logUserIfValid };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
