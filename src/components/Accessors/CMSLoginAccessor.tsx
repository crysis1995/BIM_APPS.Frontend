import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../store';

const mapStateToProps = (state: RootState) => ({
	is_login: state.CMSLogin.is_login,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const LoginAccessor: React.FunctionComponent<Props> = React.memo((props) => {
	if (props.is_login) return <>{props.children}</>;
	else return <Redirect to="/login" />;
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginAccessor);
