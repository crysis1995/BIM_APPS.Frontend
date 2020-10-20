import React from 'react';
import { Col, Row, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from '../../components/Loader';

const WorkProgress = React.lazy(() => import('./components'));
const Viewer = React.lazy(() => import('../../components/ForgeViewer/components'));

function AcceptanceLayout(props) {
	if (!props.CMSLogin.is_login) return <Redirect to="/login" />;
	else if (!props.CMSLogin.project.id)
		return (
			<Col className={'p-3'}>
				<Alert variant={'warning'}>Najpierw wybierz projekt</Alert>
			</Col>
		);
	else if (!props.CMSLogin.project.urn)
		return (
			<Col className={'p-3'}>
				<Alert variant={'warning'}>Model niedostępny</Alert>
			</Col>
		);
	else if (!props.isLogin)
		return (
			<Col className={'p-3'}>
				<Alert variant={'warning'}>BIM360 niedostępna</Alert>
			</Col>
		);
	else
		return (
			<React.Suspense fallback={<Loader />}>
				<Col>
					<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
						{props.started && <Viewer />}
					</div>
				</Col>
				<Col>
					<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
						{props.isLogin ? <WorkProgress {...props} /> : null}
					</div>
				</Col>
			</React.Suspense>
		);
}

const mapStateToProps = ({ Autodesk, Odbiory, CMSLogin }) => ({
	isLogin: Autodesk.isLogin,
	started: Odbiory.OdbioryComponent.started,
	CMSLogin,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(AcceptanceLayout);
