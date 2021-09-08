import { RootActions } from '../../../../../../reducers/type';
import { RootState } from '../../../../../../store';
import { Epic, ofType } from 'redux-observable';
import WorkProgress from '../../../../types';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import ForgeViewerActions from '../../../../../../components/ForgeViewer/redux/actions';

export const OnChangeObjectSelectionEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		ofType(WorkProgress.GeneralConstruction.Objects.Redux.Types.SELECT_ELEMENTS),
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
			const selected = state.WorkProgress.GeneralConstruction.Objects.Selection.map(
				(revitID) => state.ForgeViewer.model_elements?.[revitID]?.forgeId,
			).filter((x) => !!x) as number[];
			return of(ForgeViewerActions.SetElements({ selected }));
		}),
	);
