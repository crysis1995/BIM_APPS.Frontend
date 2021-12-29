import { Epic, ofType } from 'redux-observable';

import { combineLatest, EMPTY, merge } from 'rxjs';
import WorkProgress from '../../../../types';

import { mergeMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import { FetchPrefabObjects } from './fetchPrefabObjects';
import { FetchPrefabObjectStatuses } from './fetchPrefabObjectStatuses';
import { RootActions, RootState } from '../../../../../../state';
import { CMSLoginType } from '../../../../../../state/CMSLogin/type';

export const OnStartPrefabricatedComponentEpic: Epic<RootActions, RootActions, RootState> = (
	action$,
	state$,
) =>
	combineLatest([
		action$.pipe(ofType(WorkProgress.Prefabricated.General.Redux.Types.COMPONENT_STARTED)),
		action$.pipe(ofType(CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECT)),
	]).pipe(
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
			const token = state.CMSLogin.credentials?.token;
			const GRAPHQL = new GraphQLAPIService(token);
			const project = state.CMSLogin.actual_project?.id;
			if (!project) return EMPTY;
			return merge(
				FetchPrefabObjects(GRAPHQL, project),
				FetchPrefabObjectStatuses(GRAPHQL, project),
			).pipe(
				takeUntil(
					action$.pipe(
						ofType(WorkProgress.Prefabricated.General.Redux.Types.COMPONENT_ENDED),
					),
				),
			);
		}),
	);
