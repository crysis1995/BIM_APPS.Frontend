import { combineEpics, Epic, ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import RestAPIService from '../../../services/rest.api.service';
import NotificationActions from '../../Notification/redux/actions';
import AutodeskLoginActions from './actions';
import { timer } from './utils';
import { AutodeskLogin } from '../type';
import { Notification } from '../../Notification/types';

type ActionType = AutodeskLogin.Redux.Actions | Notification.Redux.Actions;

const OnHandleFetchAccessToken: Epic<ActionType, ActionType> = (action$) =>
	action$.pipe(
		ofType(AutodeskLogin.Redux.Types.HANDLE_FETCH_ACCESS_TOKEN),
		mergeMap(() =>
			concat(
				from(new RestAPIService().GENERAL.getAccessToken().then((e) => e.json())).pipe(
					map((e) => {
						return AutodeskLoginActions.Login3Legged(e);
					}),
					catchError((err) => {
						return concat(
							of(AutodeskLoginActions.Logout3Legged()),
							of(
								NotificationActions.showNotification({
									title: 'Błąd!',
									message: "Nie udało się połączyć z usługą BIM360!",
									triggered_time: new Date(),
								}),
							),
							of(AutodeskLoginActions.HandleFetchAccessToken()),
						);
					}),
				),
			),
		),
	);

const handleTimer: Epic<ActionType, ActionType> = (action$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<AutodeskLogin.Redux.IActions['Login3Legged']> =>
				data.type === AutodeskLogin.Redux.Types.LOGIN_3_LEGGED,
		),
		mergeMap((data) =>
			// MNOZE PRZEZ 1000 ZEBY DOSTAC MILISEKUNDY
			from(timer(data.payload.expires_in * 1000)).pipe(map(() => AutodeskLoginActions.HandleFetchAccessToken())),
		),
	);

export default combineEpics(OnHandleFetchAccessToken, handleTimer);
