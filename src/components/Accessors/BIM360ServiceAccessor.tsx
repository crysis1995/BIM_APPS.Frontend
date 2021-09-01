import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Col } from 'react-bootstrap';
import { RootState } from '../../store';

const AutodeskIsLoginSelector = (state: RootState) => state.Autodesk.isLogin;

function BIM360ServiceAccessor(props: PropsWithChildren<{}>) {
	const Autodesk_is_login = useSelector(AutodeskIsLoginSelector);
	if (Autodesk_is_login) return <>{props.children}</>;
	else
		return (
			<Col sm={'auto'} className={'p-3'}>
				<Alert variant={'warning'}>Usługa BIM360 niedostępna - odśwież stronę lub wróć później</Alert>
			</Col>
		);
}

export default React.memo(BIM360ServiceAccessor);
