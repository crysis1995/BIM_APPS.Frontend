import WorkProgress from '../../../types';
import ForgeViewer from '../../../../../components/ForgeViewer/types';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../store';
import { combineLatest } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import WorkProgressMonolithicUpgradingActions from '../../monolithic/upgrading/actions';
import { RootActions } from '../../../../../reducers/type';

export const OnChangeLevelOrDateEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	combineLatest([
		action$.pipe(
			filter(
				(data): data is ReturnType<WorkProgress.Monolithic.General.Redux.IActions['SetActiveTab']> =>
					data.type === WorkProgress.Monolithic.General.Redux.Types.SET_ACTIVE_TAB,
			),
		),
		action$.pipe(
			filter(
				(data): data is ReturnType<WorkProgress.Monolithic.General.Redux.IActions['SetRotationDay']> =>
					data.type === WorkProgress.Monolithic.General.Redux.Types.SET_ROTATION_DAY,
			),
		),
		action$.pipe(
			filter(
				(data): data is ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['FetchEnd']> =>
					data.type === WorkProgress.Monolithic.Upgrading.Redux.Types.FETCH_END,
			),
		),
		action$.pipe(
			filter(
				(data): data is ReturnType<ForgeViewer.Redux.IActions['SetViewerElements']> =>
					data.type === ForgeViewer.Redux.Types.SET_MODEL_ELEMENTS,
			),
		),
	]).pipe(
		withLatestFrom(state$),
		filter(
			([actions, state]) =>
				!state.ForgeViewer.model_elements_loading && !!state.WorkProgress.Monolithic.General.active_level,
		),
		map(() => WorkProgressMonolithicUpgradingActions.HandleSetCurrentElement()),
	);
