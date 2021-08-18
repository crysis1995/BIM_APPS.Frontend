import { Epic, ofType } from 'redux-observable';
import { RootActions } from '../../../../../../reducers/type';
import { RootState } from '../../../../../../store';
import WorkProgress from '../../../../types';
import { map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, from, merge, of } from 'rxjs';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import PrefabricatedObjectsActions from '../../objects/actions';

export const HandleSetStatusesEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		ofType(WorkProgress.Prefabricated.Objects.Redux.Types.HANDLE_SET_STATUSES),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			const { status, objects, date } = (
				action as ReturnType<WorkProgress.Prefabricated.Objects.Redux.IActions['HandleSetStatuses']>
			).payload;

			const { credentials, user, actual_project } = state.CMSLogin;
			if (user && actual_project) {
				return from(objects).pipe(
					mergeMap((value) => {
						return merge(
							of(PrefabricatedObjectsActions.SetStatusesStart(value.revit_id)),
							from(
								new GraphQLAPIService(
									credentials?.access_token,
								).WorkProgress.Prefabricated.AcceptanceObjectStatuses.Create({
									status,
									date,
									object: value.id,
									user: user.id,
									project: actual_project.id,
								}),
							).pipe(
								tap((data) => console.log(data)),
								map((data) =>
									PrefabricatedObjectsActions.SetStatusesFinish(
										value.revit_id,
										data.createAcceptanceObjectStatus.acceptanceObjectStatus,
									),
								),
							),
						);
					}),
				);
			}
			return EMPTY;
		}),
	);
