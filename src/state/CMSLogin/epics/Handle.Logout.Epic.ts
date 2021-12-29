import { Epic, ofType } from 'redux-observable';

import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import CMSLoginActions from '../actions';
import { RootActions, RootDependencies, RootState } from '../../../state';
import { CMSLoginType } from '../type';
import { StorageKeys } from '../../../services/storage.service';

export const HandleLogoutEpic: Epic<RootActions, RootActions, RootState, RootDependencies> = (
	action$,
	state$,
	dependencies,
) =>
	action$.pipe(
		ofType(CMSLoginType.Redux.Types.USER_LOGOUT_START),
		switchMap(() => {
			dependencies.storage.clear(StorageKeys.Credentials);
			return of(CMSLoginActions.UserLogoutEnd());
		}),
	);
