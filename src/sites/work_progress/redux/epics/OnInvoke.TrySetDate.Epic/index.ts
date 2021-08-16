import WorkProgress from '../../../types';
import { ModalType } from '../../../../../components/Modal/type';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../store';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, merge, of } from 'rxjs';
import dayjs from 'dayjs';
import {
	FormatType,
	GetFormattedDate,
} from '../../../../workers_log/redux/work_time_evidence/general/utils/GetFormattedDate';
import GeneralActions from '../../monolithic/general/actions';
import { RootActions } from '../../../../../reducers/type';

export const OnInvokeTrySetDate: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkProgress.Monolithic.General.Redux.IActions['TrySetDate']> =>
				data.type === WorkProgress.Monolithic.General.Redux.Types.TRY_SET_DATE,
		),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			if (
				action.payload &&
				state.WorkProgress.Monolithic.General.calendar_by_dates &&
				state.WorkProgress.Monolithic.General.calendar_all
			) {
				let rotationDay: number | undefined;
				let isValid: boolean = true;
				// sprawdzam czy jest taki dzien rotacji w przewidzianych
				// dniach rotacji
				if (action.payload in state.WorkProgress.Monolithic.General.calendar_by_dates) {
					const calendarDateID = state.WorkProgress.Monolithic.General.calendar_by_dates[action.payload];
					rotationDay = state.WorkProgress.Monolithic.General.calendar_all[calendarDateID].rotation_day;
				} else {
					isValid = false;
					let current = GetFormattedDate(dayjs(action.payload).subtract(1, 'day'), FormatType.Day);
					const counterMax = 100;
					let iter = 0;
					while (!(current in state.WorkProgress.Monolithic.General.calendar_by_dates)) {
						iter++;
						current = GetFormattedDate(dayjs(current).subtract(1, 'day'), FormatType.Day);
						if (iter === counterMax) break; // zabezpiecznie do 100
					}
					if (current in state.WorkProgress.Monolithic.General.calendar_by_dates) {
						const calendarDateID = state.WorkProgress.Monolithic.General.calendar_by_dates[current];
						rotationDay = state.WorkProgress.Monolithic.General.calendar_all[calendarDateID].rotation_day;
					} else rotationDay = 0;
				}
				return merge(
					of(GeneralActions.SetDate(action.payload)),
					of(GeneralActions.IsValidDatesPair(isValid)),
					of(GeneralActions.SetRotationDay(rotationDay)),
				);
			} else return EMPTY;
		}),
	);
