import WorkProgress from '../../../types';
import { ModalType } from '../../../../../components/Modal/type';
import { CMSLoginType } from '../../../../../components/CMSLogin/type';
import { Epic, ofType } from 'redux-observable';
import { RootState } from '../../../../../store';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import CurrentElementsFilter from '../../utils/CurrentElements.Filter';
import ForgeViewerActions from '../../../../../components/ForgeViewer/redux/actions';
import ForgeViewer from '../../../../../components/ForgeViewer/types';
import WorkProgressMonolithicUpgradingActions from '../../monolithic/upgrading/actions';

type ActionTypes =
	| WorkProgress.Monolithic.General.Redux.Actions
	| WorkProgress.Monolithic.Delays.Redux.Actions
	| WorkProgress.Monolithic.Upgrading.Redux.Actions
	| ModalType.Redux.Actions
	| CMSLoginType.Redux.Actions
	| ForgeViewer.Redux.Actions
	| WorkProgress.Monolithic.Terms.Redux.Actions;

export const OnInvokeHandleSetCurrentElementEpic: Epic<ActionTypes, ActionTypes, RootState> = (action$, state$) =>
	action$.pipe(
		ofType(WorkProgress.Monolithic.Upgrading.Redux.Types.HANDLE_SET_CURRENT_ELEMENTS),
		withLatestFrom(state$),
		filter(
			([action, state]) =>
				!state.WorkProgress.Monolithic.Upgrading.loading ||
				!state.WorkProgress.Monolithic.General.levels_loading ||
				!state.WorkProgress.Monolithic.General.calendar_loading ||
				!state.WorkProgress.Monolithic.General.cranes_loading
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
