import { Epic } from 'redux-observable';
import { RootActions } from '../../../../../../reducers/type';
import { RootState } from '../../../../../../store';
import WorkProgress from '../../../../types';
import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import { concat, EMPTY, from, of } from 'rxjs';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import GeneralConstructionObjectActions from '../../objects/actions';

export const HandleSetStatusesEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(
				value,
			): value is ReturnType<WorkProgress.GeneralConstruction.Objects.Redux.IActions['HandleSetStatuses']> =>
				value.type === WorkProgress.GeneralConstruction.Objects.Redux.Types.HANDLE_SET_STATUSES,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const { date, status, objects } = action.payload;
			const user_id = state.CMSLogin.user?.id;
			const project_id = state.CMSLogin.actual_project?.id;
			if (user_id && project_id) {
				const API = new GraphQLAPIService(state.CMSLogin.credentials?.access_token).MONOLITHIC.Status;
				return from(objects).pipe(
					mergeMap(({ id, revit_id }) =>
						concat(
							of(GeneralConstructionObjectActions.SetStatusesStart(revit_id)),
							from(API.Create({ user_id, project_id, status, date, object_id: id })).pipe(
								mergeMap((statusResponse) =>
									statusResponse
										? of(
												GeneralConstructionObjectActions.SetStatusesFinish(
													revit_id,
													statusResponse,
												),
										  )
										: EMPTY,
								),
							),
						),
					),
				);
			}
			return EMPTY;
		}),
	);
