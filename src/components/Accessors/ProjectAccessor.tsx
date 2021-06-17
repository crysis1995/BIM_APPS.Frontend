import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CMSLoginType } from '../CMSLogin/type';
import ModalActions from '../Modal/redux/actions';
import { Alert, Col } from 'react-bootstrap';

const mapStateToProps = (state: { CMSLogin: CMSLoginType.Redux.Store }) => ({
	project: state.CMSLogin.actual_project,
});

const mapDispatchToProps = {
	InitializeModal: ModalActions.InitializeModal,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const ProjectAccessor: React.FunctionComponent<Props> = (props) => {
	const [message, setMessage] = useState('');
	useEffect(() => {
		if (!props.project?.id) setMessage('Wybierz projekt');
		// props.InitializeModal({
		// 	body: 'Wybierz projekt',
		// 	modalType: ModalType.Payload.EModalType.Error,
		// 	title: 'Uwaga!',
		// });
		else if (!props.project?.urn) setMessage('Model niedostępny dla wybranego projektu');
		// props.InitializeModal({
		// 	body: 'Model niedostępny dla wybranego projektu',
		// 	modalType: ModalType.Payload.EModalType.Error,
		// 	title: 'Uwaga!',
		// });
	}, [props.project]);
	if (props.project?.id && props.project?.urn) return <>{props.children}</>;
	// return <Redirect to="/" />;
	return (
		<Col sm={'auto'} className={'p-3'}>
			<Alert variant={'warning'}>{message}</Alert>
		</Col>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAccessor);
