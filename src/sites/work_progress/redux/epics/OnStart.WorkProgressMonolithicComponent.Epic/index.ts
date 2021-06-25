import WorkProgress from '../../../types';
import { ActionsObservable, Epic, ofType } from 'redux-observable';
import { RootState } from '../../../../../store';
import { mergeMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { combineLatest, EMPTY, merge } from 'rxjs';
import RestAPIService from '../../../../../services/rest.api.service';
import { ModalType } from '../../../../../components/Modal/type';
import { FetchRotationDaysEpic } from './FetchRotationDays.Epic';
import { FetchTermsEpic } from './FetchTerms.Epic';
import { FetchDelayCausesEpic } from './FetchDelayCauses.Epic';
import { SetProjectUtilsEpic } from './SetProjectUtils.Epic';
import { CMSLoginType } from '../../../../../components/CMSLogin/type';

type ActionTypes =
	| WorkProgress.Monolithic.General.Redux.Actions
	| WorkProgress.Monolithic.Delays.Redux.Actions
	| WorkProgress.Monolithic.Upgrading.Redux.Actions
	| ModalType.Redux.Actions
	| CMSLoginType.Redux.Actions
	| WorkProgress.Monolithic.Terms.Redux.Actions;

export const OnStartWorkProgressMonolithicComponent: Epic<ActionTypes, ActionTypes, RootState> = (action$, state$) =>
	combineLatest([
		action$.pipe(ofType(WorkProgress.Monolithic.General.Redux.Types.COMPONENT_STARTED)),
		action$.pipe(ofType(CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECT)),
	]).pipe(
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
			const token = state.CMSLogin.credentials?.access_token;
			const GRAPHQL = new GraphQLAPIService(token);
			const REST = new RestAPIService(token);
			const project = state.CMSLogin.actual_project?.id;
			if (!project) return EMPTY;
			return FetchNecessary(state, GRAPHQL, project, REST, action$);
		}),
	);

function FetchNecessary(
	state: any,
	GRAPHQL: GraphQLAPIService,
	project: string,
	REST: RestAPIService,
	action$: ActionsObservable<ActionTypes>,
) {
	return merge(
		SetProjectUtilsEpic(state),
		FetchRotationDaysEpic(GRAPHQL, project),
		FetchTermsEpic(REST, GRAPHQL, project),
		FetchDelayCausesEpic(GRAPHQL),
	).pipe(takeUntil(action$.pipe(ofType(WorkProgress.Monolithic.General.Redux.Types.COMPONENT_ENDED))));
}
