import WorkProgress from '../../../types';
import { ModalType } from '../../../../../components/Modal/type';
import ForgeViewer from '../../../../../components/ForgeViewer/types';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../store';
import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import ForgeViewerActions from '../../../../../components/ForgeViewer/redux/actions';

type ActionTypes =
	| WorkProgress.Monolithic.General.Redux.Actions
	| WorkProgress.Monolithic.Upgrading.Redux.Actions
	| ModalType.Redux.Actions
	| WorkProgress.Monolithic.Terms.Redux.Actions
	| ForgeViewer.Redux.Actions;

export const OnChangeSelectElementsEpic: Epic<ActionTypes, ActionTypes, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['SelectElements']> =>
				data.type === WorkProgress.Monolithic.Upgrading.Redux.Types.SELECT_ELEMENTS,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const data = state.WorkProgress.Monolithic.Upgrading.selectedElements
				.map((revitID) => state.ForgeViewer.model_elements?.[revitID].forgeId)
				.filter((x) => !!x) as number[];

			return of(ForgeViewerActions.SetElements({ selected: data }));
		}),
	);
