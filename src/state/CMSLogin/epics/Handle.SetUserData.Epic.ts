import { Epic } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { RootActions, RootDependencies, RootState } from '../../../state';
import { CMSLoginType } from '../type';

export const HandleSetUserDataEpic: Epic<RootActions, RootActions, RootState, RootDependencies> = (
	action$,
	state$,
	dependencies,
) =>
	action$.pipe(
		filter(
			(value): value is ReturnType<CMSLoginType.Redux.IActions['SetUserData']> =>
				value.type === CMSLoginType.Redux.Types.USER_SET_DATA,
		),
		mergeMap(({ payload: { user, claims } }) => {
			return EMPTY;
		}),
	);
