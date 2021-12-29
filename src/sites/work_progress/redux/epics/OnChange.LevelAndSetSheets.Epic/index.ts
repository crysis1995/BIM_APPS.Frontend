import WorkProgress from '../../../types';
import { combineLatest, of } from 'rxjs';
import ForgeViewer from '../../../../../components/ForgeViewer/types';
import { Epic } from 'redux-observable';

import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import ForgeViewerActions from '../../../../../components/ForgeViewer/redux/actions';
import { RootActions, RootState } from '../../../../../state';


export const OnChangeLevelAndSetSheetsEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
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
		mergeMap(([[changeLevelAction, _], state]) => {
			let levelName;
			const levelID = changeLevelAction.payload;
			if (state.WorkProgress.Monolithic.General.levels && levelID) {
				if (levelID in state.WorkProgress.Monolithic.General.levels) {
					levelName = state.WorkProgress.Monolithic.General.levels[levelID].name;
				}
			}
			return of(ForgeViewerActions.SetCurrentLevel(levelName));
		}),
	);
