import React, { useEffect, useState } from 'react';
import { Button, Form, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import CMSLoginActions from './redux/actions';
import { CMSLogin } from './type';

const mapStateToProps = (state: { CMSLogin: CMSLogin.Redux.Store }) => ({
	is_login: state.CMSLogin.is_login,
	user: state.CMSLogin.user,
	projects: state.CMSLogin.projects,
});

const mapDispatchToProps = {
	UserLogoutStart: CMSLoginActions.UserLogoutStart,
	SetCurrentProject: CMSLoginActions.SetCurrentProject,
	StartupComponent: CMSLoginActions.StartupComponent,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function CMSLoginComponent(props: Props) {
	const [selectedProjectID, setSelectedProjectID] = useState<undefined | string>(undefined);

	useEffect(() => {
		props.StartupComponent();
	}, []);

	useEffect(() => {
		if (selectedProjectID && props.projects && props.projects[selectedProjectID]) {
			props.SetCurrentProject({
				id: props.projects[selectedProjectID].id,
				urn: props.projects[selectedProjectID].bim_models[0].model_urn,
				webcon_code: props.projects[selectedProjectID].webcon_code,
				name: props.projects[selectedProjectID].name,
			});
		}
	}, [selectedProjectID]);

	return props.is_login ? (
		<>
			<Form className="mr-3" inline>
				<Form.Control
					value={selectedProjectID}
					onChange={(e) => setSelectedProjectID(e.target.value)}
					as="select"
					size={'sm'}>
					<option>Wybierz...</option>
					{props.projects &&
						Object.values(props.projects).map((proj) => (
							<option data-testid="options" key={v4()} value={proj.id}>
								{proj.webcon_code ? proj.webcon_code + ' - ' + proj.name : proj.name}
							</option>
						))}
				</Form.Control>
			</Form>
			<NavDropdown
				alignRight
				className=""
				title={<span>Witaj, {props.user?.username || ''}</span>}
				id="nav-dropdown">
				<NavDropdown.Item>
					<Link className="" to="/settings">
						Ustawienia konta
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item onClick={() => props.UserLogoutStart()}>Wyloguj</NavDropdown.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(CMSLoginComponent);
