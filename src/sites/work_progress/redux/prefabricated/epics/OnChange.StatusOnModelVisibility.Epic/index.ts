import { Epic } from 'redux-observable';
import { RootState } from '../../../../../../store';
import { RootActions } from '../../../../../../reducers/type';
import { distinctUntilChanged, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import CurrentElementsFilter from '../../Utils/CurrentElements.Filter';
import ForgeViewerActions from '../../../../../../components/ForgeViewer/redux/actions';
import ForgeViewer from '../../../../../../components/ForgeViewer/types';
import { of } from 'rxjs';

export const OnChangeStatusOnModelVisibilityEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	state$.pipe(
		map((state) => ({
			isStatusOnModelVisible: state.WorkProgress.Prefabricated.General.isStatusOnModelVisible,
			statuses: state.WorkProgress.Prefabricated.Objects.allStatuses,
			statusesByRevitID: state.WorkProgress.Prefabricated.Objects.statusesByRevitID,
			statuesLoadingByRevitID: state.WorkProgress.Prefabricated.Objects.statuesLoadingByRevitID,
		})),
		distinctUntilChanged((previous, current) => JSON.stringify(previous) === JSON.stringify(current)),
		tap((data) => console.log(data.statuesLoadingByRevitID, data.statusesByRevitID)),
		withLatestFrom(state$),
		mergeMap(([value, state]) => {
			if (value.isStatusOnModelVisible) {
				const { filteredData } = new CurrentElementsFilter(CurrentElementsFilter.validateData(state));
				return of(ForgeViewerActions.SetElements(filteredData.forgeElements));
			}
			return of(
				ForgeViewerActions.SetElements({
					[ForgeViewer.Payload.ElementOperationTypesEnum.COLORED]: {},
					[ForgeViewer.Payload.ElementOperationTypesEnum.HIDDEN]: [],
					[ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED]: [],
					[ForgeViewer.Payload.ElementOperationTypesEnum.SELECTED]: [],
					[ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE]: [],
				}),
			);
		}),
	);
