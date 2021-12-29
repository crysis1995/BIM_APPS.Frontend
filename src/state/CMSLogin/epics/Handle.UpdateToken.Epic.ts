import { Epic } from 'redux-observable';

import { distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { RootActions, RootDependencies, RootState } from '../../../state';
import { CMSLoginSelectors } from '../selectors';

export const HandleUpdateTokenEpic: Epic<RootActions, RootActions, RootState, RootDependencies> = (
	action$,
	state$,
	dependencies,
) =>
	state$.pipe(
		distinctUntilChanged(
			(previous, current) =>
				CMSLoginSelectors.CMSCredentialTokenSelector(previous) ===
				CMSLoginSelectors.CMSCredentialTokenSelector(current),
		),
		mergeMap((state) => {
			dependencies.api.GraphQL.SetToken(CMSLoginSelectors.CMSCredentialTokenSelector(state));
			return EMPTY;
		}),
	);
