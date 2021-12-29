import WorkProgress from '../../../types';
import { Epic, ofType } from 'redux-observable';

import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import GeneralActions from '../../monolithic/general/actions';
import WorkProgressMonolithicDelaysActions from '../../monolithic/delays/actions';
import WorkProgressMonolithicUpgradingActions from '../../monolithic/upgrading/actions';
import ObjectsActions from '../../monolithic/objects/actions';
import TermsActions from '../../monolithic/terms/actions';
import ForgeViewerActions from '../../../../../components/ForgeViewer/redux/actions';
import { RootActions, RootState } from '../../../../../state';

export const OnEndWorkProgressMonolithicComponent: Epic<RootActions, RootActions, RootState> = (
	action$,
	state$,
) =>
	action$.pipe(
		ofType(WorkProgress.Monolithic.General.Redux.Types.COMPONENT_ENDED),
		mergeMap(() =>
			of(
				GeneralActions.SetInitial(),
				WorkProgressMonolithicDelaysActions.SetInitial(),
				WorkProgressMonolithicUpgradingActions.SetInitial(),
				ObjectsActions.SetInitial(),
				TermsActions.SetInitial(),
				ForgeViewerActions.SetInitial(),
			),
		),
	);
