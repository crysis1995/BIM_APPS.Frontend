import { Epic } from 'redux-observable';
import WorkProgress from '../../../types';
import { RootState } from '../../../../../store';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

type ActionTypes = WorkProgress.Monolithic.General.Redux.Actions;
// export const OnChangeComponentSelectionEpic: Epic<ActionTypes, ActionTypes, RootState> = (action$, state$) =>
// 	action$.pipe(
// 		filter(
// 			(data): data is ReturnType<WorkProgress.Monolithic.General.Redux.IActions['']> =>
// 				data.type === WorkProgress.Monolithic.General.Redux.Types.INCREMENT_DAY,
// 		),
// 		withLatestFrom(state$),
// 		switchMap(([action, state]) => {
// 			const elements_object = state.ForgeViewer.model_elements;
//
// 			/*
//
// 			UWAGA NIE SKONCZONE
//
//
//
// 			*/
// 			let selected_elements = new Set<number>();
// 			return EMPTY;
// 		}),
// 	);

export {}