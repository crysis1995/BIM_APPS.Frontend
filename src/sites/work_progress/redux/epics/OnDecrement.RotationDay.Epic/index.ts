import WorkProgress from '../../../types';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../store';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import GeneralActions from '../../monolithic/general/actions';
import { RootActions } from '../../../../../reducers/type';

export const OnDecrementRotationDayEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkProgress.Monolithic.General.Redux.IActions['DecrementDay']> =>
				data.type === WorkProgress.Monolithic.General.Redux.Types.DECREMENT_DAY,
		),
		withLatestFrom(state$),
		switchMap(([_, state]) => {
			if (state.WorkProgress.Monolithic.General.rotation_day > 0)
				return of(GeneralActions.TrySetRotationDay(state.WorkProgress.Monolithic.General.rotation_day - 1));
			else return EMPTY;
		}),
	);
