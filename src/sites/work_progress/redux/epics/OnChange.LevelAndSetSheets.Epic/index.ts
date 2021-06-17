import WorkProgress from '../../../types';
import { ModalType } from '../../../../../components/Modal/type';
import { combineLatest, EMPTY, of } from 'rxjs';
import ForgeViewer from '../../../../../components/ForgeViewer/types';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../store';
import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import ForgeViewerActions from '../../../../../components/ForgeViewer/redux/actions';

type ActionTypes =
	| WorkProgress.Monolithic.General.Redux.Actions
	| WorkProgress.Monolithic.Upgrading.Redux.Actions
	| ModalType.Redux.Actions
	| WorkProgress.Monolithic.Terms.Redux.Actions
	| ForgeViewer.Redux.Actions;

export const OnChangeLevelAndSetSheetsEpic: Epic<ActionTypes, ActionTypes, RootState> = (action$, state$) =>
	combineLatest([
		action$.pipe(
			filter(
				(data): data is ReturnType<WorkProgress.Monolithic.General.Redux.IActions['ChangeLevel']> =>
					data.type === WorkProgress.Monolithic.General.Redux.Types.SET_LEVEL,
			),
		),
		action$.pipe(
			filter(
				(data): data is ReturnType<ForgeViewer.Redux.IActions['SetSheetsSuccess']> =>
					data.type === ForgeViewer.Redux.Types.SET_SHEETS_SUCCESS,
			),
		),
	]).pipe(
		withLatestFrom(state$),
		mergeMap(([[changeLevel, _], state]) => {
			const levelName = changeLevel.payload
				? state.WorkProgress.Monolithic.General.levels?.[changeLevel.payload]
				: null;
			if (state.ForgeViewer.sheets && levelName) {
				const filteredSheet = Object.values(state.ForgeViewer.sheets).filter(
					(sheet) => sheet.name.includes(levelName.name) && sheet.name.toLowerCase().includes('wspro'),
				);
				if (filteredSheet) {
					return of(ForgeViewerActions.SetCurrentSheet(filteredSheet[0]));
				} else return of(ForgeViewerActions.SetCurrentSheet(null));
			}
			return EMPTY;
		}),
	);
