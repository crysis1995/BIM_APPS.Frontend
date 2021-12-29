import React from 'react';
import { Col, Nav } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ResetPassword from '../password-reset';
import { ERoutes } from '../ERoutes';

export default function Main() {
	let navigate = useNavigate();
	return (
		<>
			<Col xs="2" className="p-5 bg-light">
				<Nav className="flex-column border-right " variant="pills">
					<Nav.Item>
						<Nav.Link
							onSelect={() => navigate(ERoutes.AccountSettings)}
							eventKey={ERoutes.AccountSettings}
							disabled>
							Ustawienia konta
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							onSelect={() => navigate(ERoutes.PermissionsSettings)}
							eventKey={ERoutes.PermissionsSettings}>
							Ustawienia dostępów
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							onSelect={() => navigate(ERoutes.PasswordReset)}
							eventKey={ERoutes.PasswordReset}>
							Reset hasła
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Col>
			<Col className="p-5">
				<Routes>
					<Route path={ERoutes.Main} element={<>Wybierz akcje...</>} />
					<Route
						path={ERoutes.AccountSettings}
						element={<>{ERoutes.AccountSettings}</>}
					/>
					<Route
						path={ERoutes.PermissionsSettings}
						element={<>{ERoutes.PermissionsSettings}</>}
					/>
					<Route path={ERoutes.PasswordReset} element={<ResetPassword />} />
				</Routes>
			</Col>
		</>
	);
}
