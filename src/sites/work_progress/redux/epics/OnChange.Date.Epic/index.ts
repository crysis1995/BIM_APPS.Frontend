import WorkProgress from '../../../types';
import { ModalType } from '../../../../../components/Modal/type';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../store';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

type ActionTypes = WorkProgress.Monolithic.General.Redux.Actions | ModalType.Redux.Actions;
export const OnChangeRotationDayEpic: Epic<ActionTypes, ActionTypes, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkProgress.Monolithic.General.Redux.IActions['TrySetDate']> =>
				data.type === WorkProgress.Monolithic.General.Redux.Types.TRY_SET_DATE,
		),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			if (action.payload) {
				return EMPTY;
			} else return EMPTY;
		}),
	);
