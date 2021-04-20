import { combineEpics, Epic, ofType } from 'redux-observable';
import { Notification } from '../../Notification/types';
import { catchError, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { CMSLogin } from '../type';
import { cleanCachedData, getCachedData, isExpired, resetPasswordAPI, setCachedData } from './utils';
import { concat, EMPTY, from, of } from 'rxjs';
import CMSLoginActions from './actions';
import { setInitial } from '../../../sites/work_progress/redux/actions';
import GraphQLAPIService from '../../../services/graphql.api.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import { RootState } from '../../../sites/workers_log/redux/work_time_evidence/general/epics';
import NotificationActions from '../../Notification/redux/actions';
import { UserDataType } from '../../../services/graphql.api.service/CONSTANTS/Queries/UserData';
import { UserProjectsType } from '../../../services/graphql.api.service/CONSTANTS/Queries/UserProjects';

type ActionType = CMSLogin.Redux.Actions | Notification.Redux.Actions | ReturnType<typeof setInitial>;

const handleLogout: Epic<ActionType, ActionType> = (action$) =>
	action$.pipe(
		ofType(CMSLogin.Redux.Types.USER_LOGOUT_START),
		mergeMap((_) => {
			cleanCachedData();
			return of(CMSLoginActions.UserLogoutEnd(), setInitial());
		}),
	);

const handleLogin: Epic<ActionType, ActionType> = (action$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<CMSLogin.Redux.IActions['UserLoginStart']> =>
				data.type === CMSLogin.Redux.Types.USER_LOGIN_START,
		),
		mergeMap((action) =>
			from(
				new GraphQLAPIService().login({
					name: action.payload.data.identifier,
					password: action.payload.data.password,
				}),
			).pipe(
				mergeMap(({ data }) => {
					if (data) {
						const API = new GraphQLAPIService(data.login.jwt);
						return concat(
							of(CMSLoginActions.UserLoginEnd(data.login.user.id, { access_token: data.login.jwt })),
							from(
								Promise.all([
									API.userData({ id: data.login.user.id }),
									API.getUserProjectRoles({
										user_id: data.login.user.id,
									}),
								]),
							).pipe(
								map(([userData, projectRoles]) => {
									if (userData.data && projectRoles.data) {
										action.payload.data.checkbox &&
											setCachedData(
												userData.data.user,
												data.login.jwt,
												projectRoles.data.warbudProjUserRoles,
											);
										return CMSLoginActions.SetUserData(
											userData.data.user,
											projectRoles.data.warbudProjUserRoles,
										);
									}
									return NotificationActions.showNotification({
										title: 'Błąd!',
										message: 'Nie udało sie pobrać danych użytkownika!',
									});
								}),
							),
						);
					}
					return of(
						NotificationActions.showNotification({
							title: 'Błąd!',
							message: 'Nie udało sie poprawnie zalogować.',
						}),
					);
				}),
			),
		),
	);

const OnStartupLoginComponent: Epic<ActionType, ActionType, RootState> = (action$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<CMSLogin.Redux.IActions['StartupComponent']> =>
				data.type === CMSLogin.Redux.Types.STARTUP_LOGIN_COMPONENT,
		),
		mergeMap(() => {
			let data = getCachedData<UserDataType.User, UserProjectsType.WarbudProjUserRole[]>();
			if (data && data.user_token && !isExpired(data.user_token)) {
				return concat(
					of(CMSLoginActions.UserLoginEnd(data.user.id, { access_token: data.user_token })),
					of(CMSLoginActions.SetUserData(data.user, data.projects)),
				);
			} else {
				return EMPTY;
			}
		}),
	);

const OnSetUserData: Epic<ActionType, ActionType, RootState> = (action$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<CMSLogin.Redux.IActions['SetUserData']> =>
				data.type === CMSLogin.Redux.Types.USER_FETCH_DATA,
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
					}),
				);
			}
			return EMPTY;
		}),
	);

const OnResetPassword: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<CMSLogin.Redux.IActions['UserResetPasswordInit']> =>
				data.type === CMSLogin.Redux.Types.USER_PASSWORD_RESET_INIT,
		),
		withLatestFrom(state$),
		mergeMap(([value, state]) => {
			if (state.CMSLogin.credentials.access_token) {
				if (value.payload.password === value.payload.passwordConfirmation) {
					return fromPromise(
						resetPasswordAPI(value.payload.password, state.CMSLogin.credentials.access_token),
					).pipe(
						mergeMap(({ data, errors }) => {
							if (data) return of(CMSLoginActions.UserResetPassword('Pomyślnie zmieniono hasło!'));
							if (errors)
								return of(
									NotificationActions.showNotification({
										title: 'Błąd!',
										message: errors.reduce<string>(
											(previousValue, currentValue) => previousValue + currentValue + '\n',
											'',
										),
									}),
								);
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
