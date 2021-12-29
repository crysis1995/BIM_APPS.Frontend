import { Epic } from 'redux-observable';
import { RootActions } from '../../../_types/RootActions';
import { RootState } from '../../../_types/RootState';
import { RootDependencies } from '../../../_types/RootDependencies';
import { mergeMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ComponentEnd$ } from '../../General/actionEpics';

export const OnComponentEndEpic: Epic<RootActions, RootActions, RootState, RootDependencies> = (
	action$,
	state$,
	dependencies,
) =>
	action$.pipe(
		ComponentEnd$,
		mergeMap((value) => {
			return EMPTY;
		}),
	);
