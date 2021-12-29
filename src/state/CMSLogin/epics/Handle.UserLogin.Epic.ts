import { Epic } from 'redux-observable';
import { filter, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import CMSLoginActions from '../actions';
import { RootDependencies, RootState } from '../../../state';
import { CMSLoginType } from '../type';
import { StorageKeys } from '../../../services/storage.service';
import { RootActions } from '../../_types/RootActions';

export const HandleUserLoginEpic: Epic<RootActions, RootActions, RootState, RootDependencies> = (
	action$,
	state$,
	dependencies,
) => {
	return action$.pipe(
		filter(
			(value): value is ReturnType<CMSLoginType.Redux.IActions['UserLogin']> =>
				value.type === CMSLoginType.Redux.Types.USER_LOGIN_END,
		),
		mergeMap(({ payload }) => {
			if (payload.remember_me) {
				dependencies.storage.set(StorageKeys.Credentials, payload.credentials);
			}

			return of(CMSLoginActions.UserFetchDataStart(), CMSLoginActions.UserFetchClaimsStart());
		}),
	);
};
