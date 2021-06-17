import WorkProgress from '../../../types';
import { Epic, ofType } from 'redux-observable';
import { RootState } from '../../../../../store';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import GeneralActions from '../../monolithic/general/actions';
import WorkProgressMonolithicDelaysActions from '../../monolithic/delays/actions';
import WorkProgressMonolithicUpgradingActions from '../../monolithic/upgrading/actions';
import ObjectsActions from '../../monolithic/objects/actions';
import TermsActions from '../../monolithic/terms/actions';
import ForgeViewerActions from '../../../../../components/ForgeViewer/redux/actions';
import ForgeViewer from '../../../../../components/ForgeViewer/types';

type ActionTypes =
	| WorkProgress.Monolithic.General.Redux.Actions
	| WorkProgress.Monolithic.Delays.Redux.Actions
	| WorkProgress.Monolithic.Upgrading.Redux.Actions
	| WorkProgress.Monolithic.Objects.Redux.Actions
	| ForgeViewer.Redux.Actions
	| WorkProgress.Monolithic.Terms.Redux.Actions;

export const OnEndWorkProgressMonolithicComponent: Epic<ActionTypes, ActionTypes, RootState> = (action$, state$) =>
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
