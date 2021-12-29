import { Epic, ofType } from 'redux-observable';

import { combineLatest, EMPTY } from 'rxjs';
import ForgeViewer from '../../../../../../components/ForgeViewer/types';
import WorkProgress from '../../../../types';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { RootActions } from '../../../../../../state/types/RootActions';
import { RootState } from '../../../../../../state';

export const OnFinishLoadForgeAndDBElementsEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	combineLatest([
		action$.pipe(ofType(ForgeViewer.Redux.Types.SET_MODEL_ELEMENTS)),
		action$.pipe(ofType(WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_OBJECTS_END)),
	]).pipe(
		withLatestFrom(state$),
		mergeMap(([actions,state]) => {
			const forgeElements = Object.values(state.ForgeViewer.model_elements || {})
			const prefabricatedElementRevitIDS = Object.keys(state.WorkProgress.Prefabricated.Objects.byRevitID || {})
			return EMPTY;
		})
	);
