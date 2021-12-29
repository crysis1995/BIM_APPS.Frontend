import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Col } from 'react-bootstrap';
import { CMSLoginSelectors } from '../../state/CMSLogin/selectors';

function ProjectAccessor(props: PropsWithChildren<{}>) {
	const project = useSelector(CMSLoginSelectors.GetCurrentProject);

	const [message, setMessage] = useState('');
	useEffect(() => {
		if (!project?.id) setMessage('Wybierz projekt');
		else if (project?.models.length === 0)
			setMessage('Model niedostępny dla wybranego projektu');
	}, [project]);

	if (project?.id && project?.models.length > 0) return <>{props.children}</>;
	return (
		<Col sm={'auto'} className={'p-3'}>
			<Alert variant={'warning'}>{message}</Alert>
		</Col>
	);
}

export default React.memo(ProjectAccessor);
