import WorkProgress from '../../../types';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../store';
import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import ForgeViewerActions from '../../../../../components/ForgeViewer/redux/actions';
import { RootActions } from '../../../../../reducers/type';

export const OnChangeSelectElementsEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['SelectElements']> =>
				data.type === WorkProgress.Monolithic.Upgrading.Redux.Types.SELECT_ELEMENTS,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const data = state.WorkProgress.Monolithic.Upgrading.selectedElements
				.map((revitID) => state.ForgeViewer.model_elements?.[revitID]?.forgeId)
				.filter((x) => !!x) as number[];

			return of(ForgeViewerActions.SetElements({ selected: data }));
		}),
	);
