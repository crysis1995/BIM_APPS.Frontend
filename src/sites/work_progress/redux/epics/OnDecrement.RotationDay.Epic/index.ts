import WorkProgress from '../../../types';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../store';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { iif, of } from 'rxjs';
import GeneralActions from '../../monolithic/general/actions';

type ActionTypes = WorkProgress.Monolithic.General.Redux.Actions;

export const OnDecrementRotationDayEpic: Epic<ActionTypes, ActionTypes, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkProgress.Monolithic.General.Redux.IActions['DecrementDay']> =>
				data.type === WorkProgress.Monolithic.General.Redux.Types.DECREMENT_DAY,
		),
		withLatestFrom(state$),
		switchMap(([_, state]) =>
			iif(
				() => state.WorkProgress.Monolithic.General.rotation_day > 0,
				of(GeneralActions.TrySetRotationDay(state.WorkProgress.Monolithic.General.rotation_day - 1)),
			),
		),
	);
