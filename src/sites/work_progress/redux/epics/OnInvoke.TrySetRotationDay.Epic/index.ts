import WorkProgress from '../../../types';
import { ModalType } from '../../../../../components/Modal/type';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../store';
import { filter, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, merge, of } from 'rxjs';
import GeneralActions from '../../monolithic/general/actions';
import { RootActions } from '../../../../../reducers/type';

export const OnInvokeTrySetRotationDay: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkProgress.Monolithic.General.Redux.IActions['TrySetRotationDay']> =>
				data.type === WorkProgress.Monolithic.General.Redux.Types.TRY_SET_ROTATION_DAY,
		),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			if (
				action.payload > 0 &&
				state.WorkProgress.Monolithic.General.calendar_by_rotation_days &&
				state.WorkProgress.Monolithic.General.calendar_all
			) {
				let date: string | undefined;
				// sprawdzam czy jest taki dzien rotacji w przewidzianych
				// dniach rotacji
				if (action.payload.toString() in state.WorkProgress.Monolithic.General.calendar_by_rotation_days) {
					const calendarDateID =
						state.WorkProgress.Monolithic.General.calendar_by_rotation_days[action.payload.toString()];
					date = state.WorkProgress.Monolithic.General.calendar_all[calendarDateID].date_id.data;
				}

				return merge(
					date ? of(GeneralActions.SetDate(date)) : EMPTY,
					of(GeneralActions.SetRotationDay(action.payload)),
					of(GeneralActions.IsValidDatesPair(true)),
				);
			} else return EMPTY;
		}),
	);
