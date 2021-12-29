import { Epic } from 'redux-observable';

import { distinctUntilChanged, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import CurrentElementsFilter from '../../Utils/CurrentElements.Filter';
import ForgeViewerActions from '../../../../../../components/ForgeViewer/redux/actions';
import { of } from 'rxjs';
import { EmptyForgeViewerPayload } from '../../../../../../components/ForgeViewer/redux/utils';
import { RootActions } from '../../../../../../state/types/RootActions';
import { RootState } from '../../../../../../state';

export const OnChangeStatusOnModelVisibilityEpic: Epic<RootActions, RootActions, RootState> = (
	action$,
	state$,
) =>
	state$.pipe(
		map((state) => ({
			isStatusOnModelVisible: state.WorkProgress.Prefabricated.General.isStatusOnModelVisible,
			statuses: state.WorkProgress.Prefabricated.Objects.allStatuses,
			statusesByRevitID: state.WorkProgress.Prefabricated.Objects.statusesByRevitID,
			statuesLoadingByRevitID:
				state.WorkProgress.Prefabricated.Objects.statuesLoadingByRevitID,
		})),
		distinctUntilChanged(
			(previous, current) => JSON.stringify(previous) === JSON.stringify(current),
		),
		withLatestFrom(state$),
		mergeMap(([value, state]) => {
			if (value.isStatusOnModelVisible) {
				const { filteredData } = new CurrentElementsFilter(
					CurrentElementsFilter.validateData(state),
				);
				return of(ForgeViewerActions.SetElements(filteredData.forgeElements));
			}
			return of(ForgeViewerActions.SetElements(EmptyForgeViewerPayload()));
		}),
	);
