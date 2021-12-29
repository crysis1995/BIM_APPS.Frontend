import { Epic } from 'redux-observable';
import { RootActions } from '../../_types/RootActions';
import { RootState } from '../../_types/RootState';
import { RootDependencies } from '../../_types/RootDependencies';
import { FetchUserStartEpic } from '../ActionEpics';
import { EMPTY, from, mergeMap, of } from 'rxjs';
import CMSLoginActions from '../actions';
import { map } from 'rxjs/operators';

export const OnFetchUserStartEpic: Epic<RootActions, RootActions, RootState, RootDependencies> = (
	action$,
	state$,
	dependencies,
) =>
	action$.pipe(
		FetchUserStartEpic,
		map((data) => data.payload.userId),
		mergeMap((userID) =>
			from(dependencies.cache.users.get(userID)).pipe(
				mergeMap((cachedData) => {
					if (cachedData) {
						return of(CMSLoginActions.FetchUserFinish({ user: cachedData }));
					}
					return from(dependencies.api.GraphQL.Operations.QueryUser({ id: userID })).pipe(
						mergeMap((response) => {
							if (response.data) {
								dependencies.cache.users.put(response.data.user);
								return of(
									CMSLoginActions.FetchUserFinish({ user: response.data.user }),
								);
							}
							dependencies.logger.error('Brak usera o ID :' + userID);
							return EMPTY;
						}),
					);
				}),
			),
		),
	);
