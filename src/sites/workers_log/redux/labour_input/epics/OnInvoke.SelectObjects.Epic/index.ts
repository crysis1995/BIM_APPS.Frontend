import { Epic } from 'redux-observable';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import WorkersLog from '../../../../types';

import { of } from 'rxjs';
import ForgeViewerActions from '../../../../../../components/ForgeViewer/redux/actions';
import { RootActions } from '../../../../../../state/types/RootActions';
import { RootState } from '../../../../../../state';

export const OnInvokeSelectObjectsEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['SelectObject']> =>
				data.type === WorkersLog.LabourInput.Redux.Objects.Types.SELECT_OBJECT,
		),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			const { model_elements } = state.ForgeViewer;
			const { Selection, AllObjects } = state.WorkersLog.LabourInput.Objects;
			const data = Selection.map(
				(id) => AllObjects?.[id].revit_id && model_elements?.[AllObjects?.[id].revit_id]?.forgeId,
			).filter((x) => !!x) as number[];
			return of(ForgeViewerActions.SetElements({ selected: data }));
		}),
	);
