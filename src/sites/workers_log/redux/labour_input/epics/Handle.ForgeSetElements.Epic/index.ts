import WorkersLog from '../../../../types';
import ForgeViewer from '../../../../../../components/ForgeViewer/types';
import { Epic, ofType } from 'redux-observable';
import { RootState } from '../../../../../../store';
import { combineLatest, EMPTY, of } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';

import ForgeViewerActions from '../../../../../../components/ForgeViewer/redux/actions';
import { RootActions } from '../../../../../../reducers/type';
import CurrentElementsFilter from '../../utils/CurrentElements.Filter';

export const HandleForgeSetElementsEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	combineLatest([
		action$.pipe(ofType(WorkersLog.LabourInput.Redux.Objects.Types.SET_FILTERED_OBJECTS)),
		action$.pipe(ofType(ForgeViewer.Redux.Types.SET_MODEL_ELEMENTS)),
	]).pipe(
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			try {
				const { filteredData } = new CurrentElementsFilter(CurrentElementsFilter.validateData(state));
				return of(ForgeViewerActions.SetElements(filteredData.forgeElements));
			} catch (e) {
				console.log(e.message);
				return EMPTY;
			}
		}),
	);
