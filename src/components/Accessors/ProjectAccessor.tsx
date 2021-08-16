import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Alert, Col } from 'react-bootstrap';
import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
	project: state.CMSLogin.actual_project,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const ProjectAccessor: React.FunctionComponent<Props> = (props) => {
	const [message, setMessage] = useState('');
	useEffect(() => {
		if (!props.project?.id) setMessage('Wybierz projekt');
		else if (!props.project?.urn) setMessage('Model niedostępny dla wybranego projektu');
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
