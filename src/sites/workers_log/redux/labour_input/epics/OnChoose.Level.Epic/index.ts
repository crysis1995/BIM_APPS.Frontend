import WorkersLog from '../../../../types';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../../store';
import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import ForgeViewerActions from '../../../../../../components/ForgeViewer/redux/actions';
import { RootActions } from '../../../../../../reducers/type';

export const OnChooseLevelEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.LabourInput.Redux.General.IActions['ChooseLevel']> =>
				data.type === WorkersLog.LabourInput.Redux.General.Types.CHOOSE_LEVEL,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			return of(ForgeViewerActions.SetCurrentLevel(action.payload?.name));
			// if (state.ForgeViewer.sheets) {
			// 	const sheet = Object.values(state.ForgeViewer.sheets).filter(
			// 		(x) =>
			// 			action.payload &&
			// 			x.name.toLowerCase().includes(action.payload.name.toLowerCase()) &&
			// 			x.name.toLowerCase().includes('WSPro'.toLowerCase()),
			// 	);
			// 	if (sheet.length > 0) return of(ForgeViewerActions.SetCurrentSheet(sheet[0]));
			// }
			// return EMPTY;
		}),
	);
