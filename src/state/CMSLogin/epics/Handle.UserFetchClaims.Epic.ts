import { Epic } from 'redux-observable';
import { RootActions } from '../../_types/RootActions';
import { RootState } from '../../_types/RootState';
import { RootDependencies } from '../../_types/RootDependencies';
import { filter, mergeMap } from 'rxjs/operators';
import { CMSLoginType } from '../type';
import { EMPTY, from, of } from 'rxjs';
import CMSLoginActions from '../actions';

type ExtractedAppsAndProjectsType = {
	apps: Set<number>;
	projects: Set<number>;
};


export const HandleUserFetchClaimsEpic: Epic<
	RootActions,
	RootActions,
	RootState,
	RootDependencies
> = (action$, state$, dependencies) =>
	action$.pipe(
		filter(
			(value): value is ReturnType<CMSLoginType.Redux.IActions['UserFetchClaimsStart']> =>
				value.type === CMSLoginType.Redux.Types.USER_FETCH_CLAIMS_START,
		),
		mergeMap(() =>
			from(dependencies.api.GraphQL.Operations.QueryMyClaims()).pipe(
				mergeMap((value) => {
					if (value.data) {
						return of(CMSLoginActions.UserFetchClaimsEnd(value.data.myClaims));
					}
					return EMPTY;
				}),
			),
		),
	);
