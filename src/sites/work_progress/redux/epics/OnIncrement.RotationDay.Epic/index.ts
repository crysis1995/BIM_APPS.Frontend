import { Epic } from 'redux-observable';

import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import WorkProgress from '../../../types';
import { of } from 'rxjs';
import GeneralActions from '../../monolithic/general/actions';
import { RootActions, RootState } from '../../../../../state';

export const OnIncrementRotationDayEpic: Epic<RootActions, RootActions, RootState> = (
	action$,
	state$,
) =>
	action$.pipe(
		filter(
			(
				data,
			): data is ReturnType<WorkProgress.Monolithic.General.Redux.IActions['IncrementDay']> =>
				data.type === WorkProgress.Monolithic.General.Redux.Types.INCREMENT_DAY,
		),
		withLatestFrom(state$),
		switchMap(([_, state]) =>
			of(
				GeneralActions.TrySetRotationDay(
					state.WorkProgress.Monolithic.General.rotation_day + 1,
				),
			),
		),
	);
