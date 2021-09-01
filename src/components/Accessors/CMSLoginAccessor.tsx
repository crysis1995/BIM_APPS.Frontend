import React, { PropsWithChildren } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const CMSIsLoginSelector = (state: RootState) => state.CMSLogin.is_login;
function LoginAccessor(props: PropsWithChildren<{}>) {
	const is_login = useSelector(CMSIsLoginSelector);
	if (is_login) return <>{props.children}</>;
	else return <Redirect to="/login" />;
}

export default React.memo(LoginAccessor);
