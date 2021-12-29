import { Epic } from 'redux-observable';

import { catchError, filter, mergeMap } from 'rxjs/operators';

import { EMPTY, from, of } from 'rxjs';
import CMSLoginActions from '../actions';

import { CMSLoginType } from '../type';
import { StorageKeys } from '../../../services/storage.service';
import { RootActions } from '../../_types/RootActions';
import { RootState } from '../../_types/RootState';
import { RootDependencies } from '../../_types/RootDependencies';

export const OnStartLoginComponentEpic: Epic<
	RootActions,
	RootActions,
	RootState,
	RootDependencies
> = (action$, state$, dependencies) =>
	action$.pipe(
		filter(
			(value): value is ReturnType<CMSLoginType.Redux.IActions['StartupComponent']> =>
				value.type === CMSLoginType.Redux.Types.STARTUP_LOGIN_COMPONENT,
		),
		mergeMap(() => {
			const credentials = dependencies.storage.get<CMSLoginType.Payload.Credentials>(
				StorageKeys.Credentials,
			);
			if (credentials === null) return EMPTY;

			// checking token validity
			dependencies.api.GraphQL.SetToken(credentials.token);
			return from(dependencies.api.GraphQL.Operations.QueryMe()).pipe(
				mergeMap((value) => {
					if (value.data) {
						return of(
							CMSLoginActions.UserLogin({
								remember_me: false,
								credentials,
							}),
						);
					}
					// data errors
					dependencies.storage.clear(StorageKeys.Credentials);
					return EMPTY;
				}),
				catchError((err) => {
					// network errors
					dependencies.storage.clear(StorageKeys.Credentials);
					return EMPTY;
				}),
			);
		}),
	);
