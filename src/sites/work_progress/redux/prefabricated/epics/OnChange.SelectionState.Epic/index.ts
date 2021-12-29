import { Epic, ofType } from 'redux-observable';

import WorkProgress from '../../../../types';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import ForgeViewerActions from '../../../../../../components/ForgeViewer/redux/actions';
import { RootActions } from '../../../../../../state/types/RootActions';
import { RootState } from '../../../../../../state';

export const OnChangeSelectionStateEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		ofType(WorkProgress.Prefabricated.Objects.Redux.Types.SELECT_ELEMENTS),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const selected = state.WorkProgress.Prefabricated.Objects.selection
				.map((revitID) => state.ForgeViewer.model_elements?.[revitID]?.forgeId)
				.filter((x) => !!x) as number[];
			return of(ForgeViewerActions.SetElements({ selected }));
		}),
	);
