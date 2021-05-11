import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CMSLoginType } from '../CMSLogin/type';

const mapStateToProps = (state: { CMSLogin: CMSLoginType.Redux.Store }) => ({
	is_login: state.CMSLogin.is_login,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const LoginAccessor: React.FunctionComponent<Props> = (props) => {
	if (props.is_login) return <>{props.children}</>;
	else return <Redirect to="/login" />;
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginAccessor);
