import React, { useEffect, useState } from 'react';
import { Button, Form, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import CMSLoginActions from './redux/actions';
import { CMSLoginType } from './type';
import PermissionProvider from '../Permissions';

const mapStateToProps = (state: { CMSLogin: CMSLoginType.Redux.Store }) => ({
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
				urn: props.projects[selectedProjectID].bim_models?.[0]?.model_urn,
				webcon_code: props.projects[selectedProjectID].webcon_code,
				name: props.projects[selectedProjectID].name,
				cranes_all: props.projects[selectedProjectID].crane_ranges.reduce<
					CMSLoginType.Payload.ActualProject['cranes_all']
				>((prev, acc) => {
					if (acc.crane) {
						prev[acc.crane.id] = acc.crane;
						return prev;
					}
					return prev;
				}, {}),
				levels_all: props.projects[selectedProjectID].crane_ranges.reduce<
					CMSLoginType.Payload.ActualProject['levels_all']
				>((prev, acc) => {
					if (acc.levels.length > 0) {
						acc.levels.forEach((level) => {
							if (!(level.id in prev)) prev[level.id] = level;
						});
					}
					return prev;
				}, {}),
				crane_ranges: props.projects[selectedProjectID].crane_ranges.reduce<
					CMSLoginType.Payload.ActualProject['crane_ranges']
				>((previousValue, currentValue) => {
					if (currentValue.crane && currentValue.levels.length > 0) {
						previousValue[currentValue.crane.id] = currentValue.levels.map((lvl) => lvl.id);
					}
					return previousValue;
				}, {}),
				params: props.projects[selectedProjectID].params,
			});
		} else props.SetCurrentProject(null);
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
					<Link to="/settings" className={"text-dark"}>
						Ustawienia konta
					</Link>
				</NavDropdown.Item>
				<PermissionProvider.Show when={PermissionProvider.PermissionEnum.UserIsAdmin}>
					<NavDropdown.Item>
						<Link to="/projects" className={"text-dark"}>
							Zarządzanie projektami
						</Link>
					</NavDropdown.Item>
				</PermissionProvider.Show>
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
