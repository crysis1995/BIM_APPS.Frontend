import { RootState } from '../_types/RootState';

export function Login3LeggedSelector(state: RootState) {
	return state.Autodesk.login_3_legged;
}

export const AutodeskIsLoginSelector = (state: RootState) => state.Autodesk.isLogin;
