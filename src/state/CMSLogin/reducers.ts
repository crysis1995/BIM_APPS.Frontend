import _ from 'lodash';
import { CMSLoginType } from './type';
import normalize from '../../utils/Normalize';
import { AppPayload, Project } from '../../generated/graphql';
import Types = CMSLoginType.Redux.Types;

export const INITIAL_STATE: CMSLoginType.Redux.Store = {
	Credentials: null,
	CurrentProject: null,
	info: null,
	IsLogin: false,
	Loading: false,
	Projects: null,
	RememberMe: false,
	user: null,
	UserApps: null,
	Users: {},
	UsersLoading: {},

	/* deprecated*/
	actual_project: null,
	credentials: null,
	permissions: [],
	loading: false,
	is_login: false,
	projects: null,
	warbud_apps: null,
	project_roles: null,
};

const CMSLoginReducer = (state = INITIAL_STATE, action: CMSLoginType.Redux.Actions) => {
	switch (action.type) {
		case CMSLoginType.Redux.Types.STARTUP_LOGIN_COMPONENT:
			return state;
		case CMSLoginType.Redux.Types.USER_LOGIN_END:
			state = StoreActions.Credentials.Set(state, action);
			state = StoreActions.RememberMe.Set(state, action);
			state = StoreActions.IsLogin.Set(state, action, true);
			return StoreActions.Loading.Set(state, action, false);
		case CMSLoginType.Redux.Types.USER_FETCH_DATA_END:
			state = StoreActions.Users.Add(state, action);
			state = StoreActions.User.Set(state, action);
			return state;
		case Types.USER_FETCH_CLAIMS_END:
			state = StoreActions.Projects.Set(state, action);
			return StoreActions.UserApps.Set(state, action);
		case CMSLoginType.Redux.Types.USER_LOGOUT_START:
			return state;
		case CMSLoginType.Redux.Types.USER_LOGOUT_END:
			return { ...INITIAL_STATE };
		case CMSLoginType.Redux.Types.USER_PASSWORD_RESET_INIT:
			return state;
		case CMSLoginType.Redux.Types.USER_PASSWORD_RESET:
			return StoreActions.IsLogin.Set(state, action, true);
		// case CMSLoginType.Redux.Types.USER_SET_DATA:
		// 	state = StoreActions.CurrentProject.SetIfOne(state, action);
		// 	return StoreActions.User.Set(state, action);
		case CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECTID:
			return StoreActions.CurrentProject.Set(state, action);
		case CMSLoginType.Redux.Types.FETCH_USER_START:
			return StoreActions.UsersLoading.LoadingStart(state, action);
		case CMSLoginType.Redux.Types.FETCH_USER_FINISH:
			state = StoreActions.Users.Add(state, action);
			return StoreActions.UsersLoading.LoadingFinish(state, action);
		default:
			return state;
	}
};

export default CMSLoginReducer;

const StoreActions = {
	User: {
		Set: (
			state: CMSLoginType.Redux.Store,
			action: ReturnType<CMSLoginType.Redux.IActions['UserFetchDataEnd']>,
		): CMSLoginType.Redux.Store => {
			const user = action.payload;
			return {
				...state,
				user,
			};
		},
	},
	Projects: {
		Set: (
			state: CMSLoginType.Redux.Store,
			action: ReturnType<CMSLoginType.Redux.IActions['UserFetchClaimsEnd']>,
		): CMSLoginType.Redux.Store => {
			const claims = action.payload;
			const projectList = claims.filter((e) => e.project).map((e) => e.project) as Project[];
			const Projects = normalize(projectList, 'id');
			return {
				...state,
				Projects,
			};
		},
	},
	UserApps: {
		Set: (
			state: CMSLoginType.Redux.Store,
			action: ReturnType<CMSLoginType.Redux.IActions['UserFetchClaimsEnd']>,
		): CMSLoginType.Redux.Store => {
			const claims = action.payload;
			const UserApps = claims.reduce<CMSLoginType.Redux.Store['UserApps']>(
				(previousValue, currentValue) => {
					if (previousValue && currentValue.project) {
						if (!previousValue[currentValue.project.id]) {
							previousValue[currentValue.project.id] = new Array<AppPayload>();
						}
						previousValue[currentValue.project.id].push(currentValue.app);
					}
					return previousValue;
				},
				{},
			);

			return {
				...state,
				UserApps,
			};
		},
	},
	Credentials: {
		Set: (
			state: CMSLoginType.Redux.Store,
			action: ReturnType<CMSLoginType.Redux.IActions['UserLogin']>,
		): CMSLoginType.Redux.Store => {
			const { credentials: Credentials } = action.payload;
			return { ...state, Credentials };
		},
	},
	RememberMe: {
		Set: (
			state: CMSLoginType.Redux.Store,
			action: ReturnType<CMSLoginType.Redux.IActions['UserLogin']>,
		): CMSLoginType.Redux.Store => {
			const { remember_me: RememberMe } = action.payload;
			return { ...state, RememberMe };
		},
	},
	IsLogin: {
		Set: (
			state: CMSLoginType.Redux.Store,
			action: ReturnType<
				| CMSLoginType.Redux.IActions['UserLogin']
				| CMSLoginType.Redux.IActions['UserResetPassword']
			>,
			value: boolean,
		): CMSLoginType.Redux.Store => {
			return { ...state, IsLogin: value };
		},
	},
	Loading: {
		Set: (
			state: CMSLoginType.Redux.Store,
			action: ReturnType<CMSLoginType.Redux.IActions['UserLogin']>,
			value: boolean,
		): CMSLoginType.Redux.Store => {
			return { ...state, Loading: value };
		},
	},
	CurrentProject: {
		Set: (
			state: CMSLoginType.Redux.Store,
			action: ReturnType<CMSLoginType.Redux.IActions['SetCurrentProjectId']>,
		): CMSLoginType.Redux.Store => {
			const { projectId } = action.payload;
			const CurrentProject = state.Projects?.[projectId] ?? null;
			return { ...state, CurrentProject };
		},
		SetIfOne: (
			state: CMSLoginType.Redux.Store,
			action: ReturnType<CMSLoginType.Redux.IActions['SetUserData']>,
		): CMSLoginType.Redux.Store => {
			const keys = _.keys(state.Projects).map((e) => parseInt(e));
			if (keys.length === 1 && state.Projects) {
				const CurrentProject = state.Projects[keys[0]];
				return { ...state, CurrentProject };
			}
			return state;
		},
	},
	Users: {
		Add: (
			state: CMSLoginType.Redux.Store,
			action: ReturnType<
				| CMSLoginType.Redux.IActions['FetchUserFinish']
				| CMSLoginType.Redux.IActions['UserFetchDataEnd']
			>,
		): CMSLoginType.Redux.Store => {
			const user =
				action.type === CMSLoginType.Redux.Types.FETCH_USER_FINISH
					? action.payload.user
					: action.payload;
			return {
				...state,
				Users: {
					...state.Users,
					[user.id]: user,
				},
			};
		},
	},
	UsersLoading: {
		LoadingStart: (
			state: CMSLoginType.Redux.Store,
			action: ReturnType<CMSLoginType.Redux.IActions['FetchUserStart']>,
		): CMSLoginType.Redux.Store => {
			return {
				...state,
				UsersLoading: { ...state.UsersLoading, [action.payload.userId]: true },
			};
		},
		LoadingFinish: (
			state: CMSLoginType.Redux.Store,
			action: ReturnType<CMSLoginType.Redux.IActions['FetchUserFinish']>,
		): CMSLoginType.Redux.Store => {
			return {
				...state,
				UsersLoading: { ...state.UsersLoading, [action.payload.user.id]: false },
			};
		},
	},
};
