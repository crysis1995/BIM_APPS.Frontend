import { Epic } from 'redux-observable';
import { RootActions } from '../../_types/RootActions';
import { RootState } from '../../_types/RootState';
import { RootDependencies } from '../../_types/RootDependencies';
import { catchError, filter, mergeMap } from 'rxjs/operators';
import { CMSLoginType } from '../type';
import { EMPTY, from, of } from 'rxjs';
import CMSLoginActions from '../actions';
import NotificationActions from '../../Notifications/actions';

export const HandleUserFetchDataStartEpic: Epic<
	RootActions,
	RootActions,
	RootState,
	RootDependencies
> = (action$, state$, dependencies) =>
	action$.pipe(
		filter(
			(value): value is ReturnType<CMSLoginType.Redux.IActions['UserFetchDataStart']> =>
				value.type === CMSLoginType.Redux.Types.USER_FETCH_DATA_START,
		),
		mergeMap(() => {
			return from(dependencies.api.GraphQL.Operations.QueryMe()).pipe(
				mergeMap((response) => {
					if (response.data) {
						return of(CMSLoginActions.UserFetchDataEnd(response.data.me));
					}
					if (response.errors) {
						return of(
							...response.errors.map((e) =>
								NotificationActions.showNotification({
									title: 'Błąd',
									message: e.message,
								}),
							),
						);
					}
					return EMPTY;
				}),
				catchError((err) => {
					return of(
						NotificationActions.showNotification({
							title: 'Błąd',
							message: 'Nie udało się pobrać danych użytkownika!',
						}),
					);
				}),
			);
		}),
	);
