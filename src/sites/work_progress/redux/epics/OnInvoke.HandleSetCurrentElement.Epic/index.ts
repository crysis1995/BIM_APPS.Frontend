import WorkProgress from '../../../types';
import { Epic, ofType } from 'redux-observable';
import { RootState } from '../../../../../store';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import CurrentElementsFilter from '../../utils/CurrentElements.Filter';
import ForgeViewerActions from '../../../../../components/ForgeViewer/redux/actions';
import WorkProgressMonolithicUpgradingActions from '../../monolithic/upgrading/actions';
import { RootActions } from '../../../../../reducers/type';

export const OnInvokeHandleSetCurrentElementEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		ofType(WorkProgress.Monolithic.Upgrading.Redux.Types.HANDLE_SET_CURRENT_ELEMENTS),
		withLatestFrom(state$),
		filter(
			([action, state]) =>
				!state.WorkProgress.Monolithic.Upgrading.loading ||
				!state.WorkProgress.Monolithic.General.levels_loading ||
				!state.WorkProgress.Monolithic.General.calendar_loading ||
				!state.WorkProgress.Monolithic.General.cranes_loading,
		),
		switchMap(([action, state]) => {
			try {
				const { filteredData } = new CurrentElementsFilter(CurrentElementsFilter.validateData(state));
				return of(
					ForgeViewerActions.SetElements(filteredData.forgeElements),
					WorkProgressMonolithicUpgradingActions.SetActualElements(
						filteredData.currentElements,
						filteredData.currentElementsWithStatuses,
					),
				);
			} catch (Error) {
				console.log(Error.message);
				return EMPTY;
			}
		}),
	);
