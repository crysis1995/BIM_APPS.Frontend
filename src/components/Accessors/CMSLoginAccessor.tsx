import React, { PropsWithChildren } from 'react';
import { CMSLoginSelectors } from '../../state/CMSLogin/selectors';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';


function LoginAccessor(props: PropsWithChildren<{}>) {
	const is_login = useSelector(CMSLoginSelectors.IsLogin);
	if (is_login) return <>{props.children}</>;
	else return <Navigate replace to="/login" />;
}

export default React.memo(LoginAccessor);
