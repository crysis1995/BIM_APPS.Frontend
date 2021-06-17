import React from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Col } from 'react-bootstrap';
import { AutodeskLogin } from '../components/AutodeskLogin/type';
import { CMSLoginType } from '../components/CMSLogin/type';
import WorkProgressLayout from '../sites/work_progress/index';
import { connect } from 'react-redux';

const mapStateToProps = (state: { Autodesk: AutodeskLogin.Redux.Store; CMSLogin: CMSLoginType.Redux.Store }) => ({
	Autodesk_is_login: state.Autodesk.isLogin,
	CMS_is_login: state.CMSLogin.is_login,
	project: state.CMSLogin.actual_project,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function WorkProgressComponent(props: Props) {
	if (!props.CMS_is_login) return <Redirect to="/login" />;
	else if (!props.project?.id)
		return (
			<Col sm={'auto'} className={'p-3'}>
				<Alert variant={'warning'}>Wybierz projekt</Alert>
			</Col>
		);
	else if (!props.project?.urn)
		return (
			<Col sm={'auto'} className={'p-3'}>
				<Alert variant={'warning'}>Model niedostępny dla wybranego projektu</Alert>
			</Col>
		);
	else if (!props.Autodesk_is_login)
		return (
			<Col sm={'auto'} className={'p-3'}>
				<Alert variant={'warning'}>Usługa BIM360 niedostępna - odśwież stronę lub wróć później</Alert>
			</Col>
		);
	else return <WorkProgressLayout />;
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkProgressComponent);
