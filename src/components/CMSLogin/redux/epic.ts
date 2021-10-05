import { combineEpics, Epic } from 'redux-observable';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { CMSLoginType } from '../type';
import { cleanCachedData, getCachedData, isExpired, resetPasswordAPI } from './utils';
import { concat, EMPTY, from, merge, of } from 'rxjs';
import CMSLoginActions from './actions';
import GraphQLAPIService from '../../../services/graphql.api.service';
import NotificationActions from '../../Notification/redux/actions';
import { UserDataType } from '../../../services/graphql.api.service/CONSTANTS/Queries/UserData';
import { RootState } from '../../../store';
import WorkProgressGeneralActions from '../../../sites/work_progress/redux/general/actions';
import { RootActions } from '../../../reducers/type';

const handleLogout: Epic<RootActions, RootActions> = (action$) =>
	action$.pipe(
		filter((data) => data.type === CMSLoginType.Redux.Types.USER_LOGOUT_START),
		switchMap((_) => {
			cleanCachedData();
			return merge(of(CMSLoginActions.UserLogoutEnd()), of(WorkProgressGeneralActions.SetInitial()));
		}),
	);

const handleLogin: Epic<RootActions, RootActions> = (action$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<CMSLoginType.Redux.IActions['UserLoginEnd']> =>
				data.type === CMSLoginType.Redux.Types.USER_LOGIN_END,
		),
		mergeMap(({ payload }) => {
			const API = new GraphQLAPIService(payload.credentials.access_token);
			return concat(
				from(
					Promise.all([
						API.userData({ id: payload.user }),
						API.getUserProjectRoles({
							user_id: payload.user,
						}),
					]),
				).pipe(
					map(([userData, projectRoles]) => {
						if (userData && projectRoles) {
							return CMSLoginActions.SetUserData(userData.user, projectRoles.warbudProjUserRoles);
						}
						return NotificationActions.showNotification({
							title: 'Błąd!',
							message: 'Nie udało sie pobrać danych użytkownika!',
						});
					}),
				),
			);
		}),
	);

const OnStartupLoginComponent: Epic<RootActions, RootActions, RootState> = (action$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<CMSLoginType.Redux.IActions['StartupComponent']> =>
				data.type === CMSLoginType.Redux.Types.STARTUP_LOGIN_COMPONENT,
		),
		mergeMap(() => {
			let data = getCachedData<UserDataType.User>();
			if (data && data.user_token && !isExpired(data.user_token)) {
				return concat(of(CMSLoginActions.UserLoginEnd(data.user.id, { access_token: data.user_token })));
			} else {
				return EMPTY;
			}
		}),
	);

const OnSetUserData: Epic<RootActions, RootActions, RootState> = (action$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<CMSLoginType.Redux.IActions['SetUserData']> =>
				data.type === CMSLoginType.Redux.Types.USER_FETCH_DATA,
		),
		mergeMap((action) => {
			if (action.payload.project.length === 1) {
				const data = action.payload.project[0];
				return of(
					CMSLoginActions.SetCurrentProject({
						id: data.project.id,
						name: data.project.name,
						urn: data.project.bim_models[0]?.model_urn,
						webcon_code: data.project.webcon_code,
						cranes_all: data.project.crane_ranges.reduce<CMSLoginType.Payload.ActualProject['cranes_all']>(
							(prev, acc) => {
								if (acc.crane) {
									prev[acc.crane.id] = acc.crane;
									return prev;
								}
								return prev;
							},
							{},
						),
						levels_all: data.project.crane_ranges.reduce<CMSLoginType.Payload.ActualProject['levels_all']>(
							(prev, acc) => {
								if (acc.levels.length > 0) {
									acc.levels.forEach((level) => {
										if (!(level.id in prev)) prev[level.id] = level;
									});
								}
								return prev;
							},
							{},
						),
						crane_ranges: data.project.crane_ranges.reduce<
							CMSLoginType.Payload.ActualProject['crane_ranges']
						>((previousValue, currentValue) => {
							if (currentValue.crane && currentValue.levels.length > 0) {
								previousValue[currentValue.crane.id] = currentValue.levels.map((lvl) => lvl.id);
							}
							return previousValue;
						}, {}),
						params: data.project.params,
						defaultViewName: data.project.bim_models[0]?.defaultViewName,
					}),
				);
			}
			return EMPTY;
		}),
	);

const OnResetPassword: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<CMSLoginType.Redux.IActions['UserResetPasswordInit']> =>
				data.type === CMSLoginType.Redux.Types.USER_PASSWORD_RESET_INIT,
		),
		withLatestFrom(state$),
		mergeMap(([value, state]) => {
			if (state.CMSLogin.credentials?.access_token) {
				if (value.payload.password === value.payload.passwordConfirmation) {
					return from(resetPasswordAPI(value.payload.password, state.CMSLogin.credentials.access_token)).pipe(
						mergeMap((data) => {
							if (data) return of(CMSLoginActions.UserResetPassword('Pomyślnie zmieniono hasło!'));
							return EMPTY;
						}),
						catchError((error) =>
							of(
								NotificationActions.showNotification({
									title: 'Błąd!',
									message: error,
								}),
							),
						),
					);
				} else {
					return of(
						NotificationActions.showNotification({
							title: 'Błąd!',
							message: 'Podane przez użytkownika hasła są różne!',
						}),
					);
				}
			}
			return EMPTY;
		}),
	);

export default combineEpics(OnStartupLoginComponent, handleLogout, handleLogin, OnResetPassword, OnSetUserData);
