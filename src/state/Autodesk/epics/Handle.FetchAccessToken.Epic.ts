import { Epic, ofType } from 'redux-observable';
import { AutodeskLogin } from '../type';
import { catchError, delay, map, mergeMap } from 'rxjs/operators';
import { concat, from, merge, of } from 'rxjs';
import AutodeskLoginActions from '../actions';

import NotificationActions from '../../Notifications/actions';
import RestAPIService from '../../../services/rest.api.service';
import { RootActions, RootDependencies, RootState } from '../../../state';

export const OnHandleFetchAccessToken: Epic<
	RootActions,
	RootActions,
	RootState,
	RootDependencies
> = (action$) =>
	action$.pipe(
		ofType(AutodeskLogin.Redux.Types.HANDLE_FETCH_ACCESS_TOKEN),
		delay(2000),
		mergeMap(() =>
			concat(
				from(new RestAPIService().GENERAL.getAccessToken().then((e) => e.json())).pipe(
					map((e) => AutodeskLoginActions.Login3Legged(e)),
					catchError((err) => {
						return merge(
							of(AutodeskLoginActions.Logout3Legged()),
							of(
								NotificationActions.showNotification({
									title: 'Błąd!',
									message: 'Nie udało się połączyć z usługą BIM360!',
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
