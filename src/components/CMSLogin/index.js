import React from 'react';
import { Button, Form, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { getUserProjects } from './components/CMSLogin.Selector';
import { setActiveProject, userLogout } from './redux/actions';

function CMSLogin({ is_login, active_project, projects, username, userLogout, setActiveProject }) {
	return is_login ? (
		<>
			<Form className="mr-3" inline>
				<Form.Control
					value={active_project}
					onChange={(e) => setActiveProject(e.target.value)}
					as="select"
					size={'sm'}>
					<option>Wybierz...</option>
					{projects.map((e) => (
						<option data-testid="options" key={v4()} value={e.id}>
							{e.webcon_code ? e.webcon_code + ' - ' + e.name : e.name}
						</option>
					))}
				</Form.Control>
			</Form>
			<NavDropdown alignRight className="" title={<span>Witaj, {username}</span>} id="nav-dropdown">
				<NavDropdown.Item>
					<Link className="" to="/settings">
						Ustawienia konta
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item onClick={userLogout}>Wyloguj</NavDropdown.Item>
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

const mapStateToProps = (state) => ({
	is_login: state.CMSLogin.is_login,
	username: state.CMSLogin.user.username,
	active_project: state.CMSLogin.project.id,
	projects: getUserProjects(state),
});

const mapDispatchToProps = {
	userLogout,
	setActiveProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(CMSLogin);
