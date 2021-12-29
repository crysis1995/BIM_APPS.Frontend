import React, { useEffect } from 'react';
import { Button, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ProjectSelector } from './components/ProjectSelector';
import { GetUserName } from './Utils/GetUserName';
import { CMSLoginSelectors } from '../../state/CMSLogin/selectors';
import CMSLoginActions from '../../state/CMSLogin/actions';
import _ from 'lodash';
import AppRoutes from '../../pages/appRoutes';

function CMSLoginComponent() {
	const dispatch = useDispatch();
	const isLogin = useSelector(CMSLoginSelectors.IsLogin, _.isEqual);
	const user = useSelector(CMSLoginSelectors.GetMe, _.isEqual);

	useEffect(() => {
		dispatch(CMSLoginActions.StartupComponent());
	}, []);

	function Logout() {
		dispatch(CMSLoginActions.UserLogoutStart());
	}
	if (!isLogin) {
		return (
			<Link to={AppRoutes.Login}>
				<Button variant="outline-primary" size="sm">
					Zaloguj się
				</Button>
			</Link>
		);
	}

	return (
		<>
			<ProjectSelector />
			<NavDropdown
				alignRight
				className=""
				title={<span>{GetUserName(user)}</span>}
				id="nav-dropdown">
				<NavDropdown.Item>
					<Link to={AppRoutes.Account} className={'text-dark'}>
						Ustawienia konta
					</Link>
				</NavDropdown.Item>
				{/*<PermissionProvider.Show when={PermissionProvider.PermissionEnum.UserIsAdmin}>*/}
				{/*	<NavDropdown.Item>*/}
				{/*		<Link to="/projects" className={'text-dark'}>*/}
				{/*			Zarządzanie projektami*/}
				{/*		</Link>*/}
				{/*	</NavDropdown.Item>*/}
				{/*</PermissionProvider.Show>*/}
				<NavDropdown.Item onClick={Logout}>Wyloguj</NavDropdown.Item>
			</NavDropdown>
		</>
	);
}

export default CMSLoginComponent;
