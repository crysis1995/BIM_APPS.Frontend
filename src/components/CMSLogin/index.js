import { HttpLink } from 'apollo-boost';
import React, { useState } from 'react';
import { Button, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { setAccountSettingsActive } from '../../Layout/redux/actions';
import { userLogout } from './redux/actions';

function CMSLogin(props) {
	return props.CMSLogin.is_login ? (
		<>
			<NavDropdown alignRight title={<span>Witaj, {props.CMSLogin.user.username}</span>} id="nav-dropdown">
				<NavDropdown.Item>
					<Link to="/settings">Ustawienia konta</Link>
				</NavDropdown.Item>
				<NavDropdown.Item onClick={props.userLogout}>Wyloguj</NavDropdown.Item>
			</NavDropdown>
		</>
	) : (
		<Link to="/login">
			<Button variant="outline-primary" size="sm">
				Zaloguj się
			</Button>
		</Link>
	);
}

const mapStateToProps = ({ CMSLogin }) => ({
	CMSLogin,
});

const mapDispatchToProps = {
	setAccountSettingsActive,
	userLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(CMSLogin);
