import { Epic } from 'redux-observable';
import { RootActions } from '../../../../../../reducers/type';
import { RootState } from '../../../../../../store';
import WorkersLog from '../../../../types';
import { catchError, filter, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { concat, EMPTY, from, merge, of } from 'rxjs';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import ModalActions from '../../../../../../components/Modal/redux/actions';
import { ModalType } from '../../../../../../components/Modal/type';
import CrewActions from '../../crew/actions';

export const HandleDeleteCrewInitEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.WorkTimeEvidence.Crew.Redux.IActions['DeleteCrewInit']> =>
				data.type === WorkersLog.WorkTimeEvidence.Crew.Redux.Types.DELETE_INIT,
		),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			const access_token = state.CMSLogin.credentials?.access_token;
			const { crew, summaries } = action.payload;
			const api = new GraphQLAPIService(access_token).WorkersLog.WorkTimeEvidence;
			return concat(
				from(summaries).pipe(
					mergeMap((data) =>
						merge(
							from(api.CrewSummaries.Delete({ crew_summary: data.id })).pipe(
								mergeMap((data) => EMPTY),
								catchError((error) =>
									of(
										ModalActions.InitializeModal({
											title: 'Uwaga',
											modalType: ModalType.Payload.EModalType.Error,
											body: 'Nie udało sie usunąć brygady! Zgłoś problem do administratora',
										}),
									),
								),
							),
						),
					),
				),
				from(api.Crew.Delete({ crew })).pipe(mergeMap((data) => EMPTY)),
				of(CrewActions.DeleteCrewFinish(crew)),
			);
		}),
	);
