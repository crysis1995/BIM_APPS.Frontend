import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Col } from 'react-bootstrap';
import { RootState } from '../../store';

const ActualProjectSelector = (state: RootState) => state.CMSLogin.actual_project;
function ProjectAccessor(props: PropsWithChildren<{}>) {
	const project = useSelector(ActualProjectSelector);
	const [message, setMessage] = useState('');
	useEffect(() => {
		if (!project?.id) setMessage('Wybierz projekt');
		else if (!project?.urn) setMessage('Model niedostępny dla wybranego projektu');
	}, [project]);

	if (project?.id && project?.urn) return <>{props.children}</>;
	return (
		<Col sm={'auto'} className={'p-3'}>
			<Alert variant={'warning'}>{message}</Alert>
		</Col>
	);
}

export default React.memo(ProjectAccessor);
