import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './main';
import { ERoutes } from './ERoutes';
import Accessors from '../../components/Accessors';

export default function Account() {
	return (
		<Accessors.CMSLoginAccessor>
			<Routes>
				<Route path={'/'} element={<Main />}>
					<Route path={ERoutes.AccountSettings} />
					<Route path={ERoutes.PermissionsSettings} />
					<Route path={ERoutes.PasswordReset} />
				</Route>
			</Routes>
		</Accessors.CMSLoginAccessor>
	);
}
