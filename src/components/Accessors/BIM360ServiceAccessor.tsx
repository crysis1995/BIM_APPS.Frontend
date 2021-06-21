import React from 'react';
import { connect } from 'react-redux';
import { AutodeskLogin } from '../AutodeskLogin/type';
import { Alert, Col } from 'react-bootstrap';

const mapStateToProps = (state: { Autodesk: AutodeskLogin.Redux.Store }) => ({
	Autodesk_is_login: state.Autodesk.isLogin,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const BIM360ServiceAccessor: React.FunctionComponent<Props> = (props) => {
	if (props.Autodesk_is_login) return <>{props.children}</>;
	else
		return (
			<Col sm={'auto'} className={'p-3'}>
				<Alert variant={'warning'}>Usługa BIM360 niedostępna - odśwież stronę lub wróć później</Alert>
			</Col>
		);
};

export default connect(mapStateToProps, mapDispatchToProps)(BIM360ServiceAccessor);