import { CMSLoginType } from '../type';
import { UserProjectsType } from '../../../services/graphql.api.service/CONSTANTS/Queries/UserProjects';

export const INITIAL_STATE: CMSLoginType.Redux.Store = {
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

function SetUserData(state: CMSLoginType.Redux.Store, action: ReturnType<CMSLoginType.Redux.IActions['SetUserData']>) {
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

const CMSLoginReducer = (state = INITIAL_STATE, action: CMSLoginType.Redux.Actions) => {
	switch (action.type) {
		case CMSLoginType.Redux.Types.STARTUP_LOGIN_COMPONENT:
		case CMSLoginType.Redux.Types.USER_LOGIN_START:
			return { ...state, loading: true };
		case CMSLoginType.Redux.Types.USER_LOGIN_END:
			return {
				...state,
				loading: false,
				is_login: true,
				user: {
					id: action.payload.user,
				},
				credentials: action.payload.credentials,
			};
		case CMSLoginType.Redux.Types.USER_LOGOUT_START:
		case CMSLoginType.Redux.Types.USER_LOGOUT_END:
			return { ...INITIAL_STATE };
		case CMSLoginType.Redux.Types.USER_PASSWORD_RESET_INIT:
		case CMSLoginType.Redux.Types.USER_PASSWORD_RESET:
			return { ...state, is_login: true };
		case CMSLoginType.Redux.Types.USER_FETCH_DATA:
			return SetUserData(state, action);
		case CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECT:
			return {
				...state,
				actual_project: action.payload.project
					? {
							id: action.payload.project.id,
							urn: action.payload.project.urn,
							name: action.payload.project.name,
							webcon_code: action.payload.project.webcon_code,
							levels_all: action.payload.project.levels_all,
							cranes_all: action.payload.project.cranes_all,
							crane_ranges: action.payload.project.crane_ranges,
							params: action.payload.project.params,
							defaultViewName: action.payload.project.defaultViewName,
					  }
					: null,
			};
		default:
			return state;
	}
};

export default CMSLoginReducer;
