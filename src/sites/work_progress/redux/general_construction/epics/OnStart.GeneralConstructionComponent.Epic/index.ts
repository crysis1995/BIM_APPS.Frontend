import { Epic, ofType } from 'redux-observable';
import { RootActions } from '../../../../../../reducers/type';
import { RootState } from '../../../../../../store';
import { combineLatest, EMPTY, merge } from 'rxjs';
import WorkProgress from '../../../../types';
import { mergeMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import FetchObjects from './FetchObjects';
import { CMSLoginType } from '../../../../../../components/CMSLogin/type';

export const OnStartGeneralConstructionComponentEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	combineLatest([
		action$.pipe(ofType(WorkProgress.GeneralConstruction.General.Redux.Types.COMPONENT_STARTED)),
		action$.pipe(ofType(CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECT)),
	]).pipe(
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
			const token = state.CMSLogin.credentials?.access_token;
			const GRAPHQL = new GraphQLAPIService(token);
			const project = state.CMSLogin.actual_project;
			if (!project) return EMPTY;
			return merge(FetchObjects(GRAPHQL, project)).pipe(
				takeUntil(action$.pipe(ofType(WorkProgress.GeneralConstruction.General.Redux.Types.COMPONENT_ENDED))),
			);
		}),
	);
