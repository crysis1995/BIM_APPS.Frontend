import WorkProgress from '../../../types';
import { ModalType } from '../../../../../components/Modal/type';
import ForgeViewer from '../../../../../components/ForgeViewer/types';
import { Epic, ofType } from 'redux-observable';
import { RootState } from '../../../../../store';
import { combineLatest, iif, of } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import WorkProgressMonolithicUpgradingActions from '../../monolithic/upgrading/actions';

type ActionTypes =
	| WorkProgress.Monolithic.General.Redux.Actions
	| WorkProgress.Monolithic.Upgrading.Redux.Actions
	| ModalType.Redux.Actions
	| WorkProgress.Monolithic.Terms.Redux.Actions
	| ForgeViewer.Redux.Actions;

export const HandleCleanSelectedElements: Epic<ActionTypes, ActionTypes, RootState> = (action$, state$) =>
	combineLatest(
		action$.pipe(ofType(WorkProgress.Monolithic.General.Redux.Types.SET_LEVEL)),
		action$.pipe(ofType(WorkProgress.Monolithic.General.Redux.Types.SET_DATE)),
		action$.pipe(ofType(WorkProgress.Monolithic.General.Redux.Types.SET_ROTATION_DAY)),
	).pipe(
		withLatestFrom(state$),
		mergeMap(([_, state]) =>
			iif(
				() => state.WorkProgress.Monolithic.Upgrading.selectedElements.length > 0,
				of(WorkProgressMonolithicUpgradingActions.SelectElements([])),
			),
		),
	);
