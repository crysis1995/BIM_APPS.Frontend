import { Epic } from 'redux-observable';

import { debounceTime, distinctUntilChanged, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import _ from 'lodash';
import CurrentElementsFilter from '../../Utils/CurrentElements.Filter';
import ForgeViewerActions from '../../../../../../components/ForgeViewer/redux/actions';
import { EmptyForgeViewerPayload } from '../../../../../../components/ForgeViewer/redux/utils';
import ForgeViewer from '../../../../../../components/ForgeViewer/types';
import { RootActions } from '../../../../../../state/types/RootActions';
import { RootState } from '../../../../../../state';

export const StateHandleChangeGeneralShowStatusesOnModelEpic: Epic<RootActions, RootActions, RootState> = (
	action$,
	state$,
) =>
	state$.pipe(
		map((state) => ({
			ShowStatusesOnModel: state.WorkProgress.GeneralConstruction.General.ShowStatusesOnModel,
			ObjectStatusAll: state.WorkProgress.GeneralConstruction.Objects.ObjectStatusAll,
		})),
		distinctUntilChanged(_.isEqual),
		debounceTime(200), // opoznienie zbierania zmian w danych
		withLatestFrom(state$),
		mergeMap(([value, state]) => {
			if (value.ShowStatusesOnModel) {
				const {
					filteredData: { forgeElements },
				} = new CurrentElementsFilter(CurrentElementsFilter.validateData(state));
				return of(
					ForgeViewerActions.SetElements({
						...forgeElements,
						[ForgeViewer.Payload.ElementOperationTypesEnum.SELECTED]: state.ForgeViewer.selected_elements,
					}),
				);
			}
			return of(ForgeViewerActions.SetElements(EmptyForgeViewerPayload(state, { keepSelected: true })));
		}),
	);
