import { CMSLogin } from '../type';
import { UserProjectsType } from '../../../services/graphql.api.service/CONSTANTS/Queries/UserProjects';

export const INITIAL_STATE: CMSLogin.Redux.Store = {
	user: null,
	info: null,
	credentials: null,
	actual_project: null,
	project_roles: null,
	warbud_apps: null,
	projects: null,
	is_login: false,
	loading: false,
	permissions: [],
};

function SetUserData(state: CMSLogin.Redux.Store, action: ReturnType<CMSLogin.Redux.IActions['SetUserData']>) {
	const { _project, project_roles, warbud_apps } = action.payload.project.reduce<{
		_project: { [key: string]: UserProjectsType.Project };
		project_roles: { [key: string]: UserProjectsType.ProjectRole };
		warbud_apps: { [key: string]: string[] };
	}>(
		(prev, acc) => {
			prev._project[acc.project.id] = acc.project;
			prev.project_roles[acc.project.id] = acc.project_role;
			prev.warbud_apps[acc.project.id] = acc.warbud_apps.map((e) => e.name);
			return prev;
		},
		{ _project: {}, project_roles: {}, warbud_apps: {} },
	);
	return {
		...state,
		user: {
			...state.user,
			username: action.payload.user.username,
			email: action.payload.user.email,
		},
		projects: _project,
		project_roles,
		warbud_apps,
	};
}

const CMSLoginReducer = (state = INITIAL_STATE, action: CMSLogin.Redux.Actions) => {
	switch (action.type) {
		case CMSLogin.Redux.Types.STARTUP_LOGIN_COMPONENT:
		case CMSLogin.Redux.Types.USER_LOGIN_START:
			return { ...state, loading: true };
		case CMSLogin.Redux.Types.USER_LOGIN_END:
			return {
				...state,
				loading: false,
				is_login: true,
				user: {
					id: action.payload.user,
				},
				credentials: action.payload.credentials,
			};
		case CMSLogin.Redux.Types.USER_LOGOUT_START:
		case CMSLogin.Redux.Types.USER_LOGOUT_END:
			return { ...INITIAL_STATE };
		case CMSLogin.Redux.Types.USER_PASSWORD_RESET_INIT:
		case CMSLogin.Redux.Types.USER_PASSWORD_RESET:
			return { ...state, is_login: true };
		case CMSLogin.Redux.Types.USER_FETCH_DATA:
			return SetUserData(state, action);
		case CMSLogin.Redux.Types.USER_SET_CURRENT_PROJECT:
			return {
				...state,
				actual_project: {
					id: action.payload.project.id,
					urn: action.payload.project.urn,
					name: action.payload.project.name,
					webcon_code: action.payload.project.webcon_code,
				},
			};
		default:
			return state;
	}
};

export default CMSLoginReducer;
