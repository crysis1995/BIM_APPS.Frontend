import WorkProgress from '../../../types';
import { Epic } from 'redux-observable';

import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { RootActions, RootState } from '../../../../../state';

export const OnChangeRotationDayEpic: Epic<RootActions, RootActions, RootState> = (
	action$,
	state$,
) =>
	action$.pipe(
		filter(
			(
				data,
			): data is ReturnType<WorkProgress.Monolithic.General.Redux.IActions['TrySetDate']> =>
				data.type === WorkProgress.Monolithic.General.Redux.Types.TRY_SET_DATE,
		),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			if (action.payload) {
				return EMPTY;
			} else return EMPTY;
		}),
	);
