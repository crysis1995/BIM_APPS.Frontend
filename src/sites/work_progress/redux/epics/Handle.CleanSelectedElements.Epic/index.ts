import WorkProgress from '../../../types';
import { Epic, ofType } from 'redux-observable';

import { combineLatest, EMPTY, of } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import WorkProgressMonolithicUpgradingActions from '../../monolithic/upgrading/actions';
import { RootActions } from '../../../../../state/types/RootActions';
import { RootState } from '../../../../../state';

export const HandleCleanSelectedElements: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	combineLatest([
		action$.pipe(ofType(WorkProgress.Monolithic.General.Redux.Types.SET_LEVEL)),
		action$.pipe(ofType(WorkProgress.Monolithic.General.Redux.Types.SET_DATE)),
		action$.pipe(ofType(WorkProgress.Monolithic.General.Redux.Types.SET_ROTATION_DAY)),
	]).pipe(
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
			if (state.WorkProgress.Monolithic.Upgrading.selectedElements.length > 0)
				return of(WorkProgressMonolithicUpgradingActions.SelectElements([]));
			else return EMPTY;
		}),
	);
