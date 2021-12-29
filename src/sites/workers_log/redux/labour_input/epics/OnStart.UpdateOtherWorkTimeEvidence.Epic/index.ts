import { Epic } from 'redux-observable';
import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import WorkersLog from '../../../../types';
import { EMPTY, from, of } from 'rxjs';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import LabourInputTimeEvidenceActions from '../../time_evidence/actions';
import { RootActions } from '../../../../../../state/types/RootActions';
import { RootState } from '../../../../../../state';

export const OnStartUpdateOtherWorkTimeEvidenceEpic: Epic<RootActions, RootActions, RootState> = (
	action$,
	state$,
) => {
	return action$.pipe(
		filter(
			(
				data,
			): data is ReturnType<
				WorkersLog.LabourInput.Redux.TimeEvidence.IActions['UpdateOtherWorkStart']
			> =>
				data.type ===
				WorkersLog.LabourInput.Redux.TimeEvidence.Types.UPDATE_OTHER_WORK_START,
		),
		withLatestFrom(state$),
		mergeMap(
			([
				{
					payload: { worked_time, id },
				},
				state,
			]) => {
				return from(
					new GraphQLAPIService(
						state.CMSLogin.credentials?.token,
					).WorkersLog.LabourInput.OtherWorkTimeEvidence.Update({
						other_works_time_evidence: id,
						worked_time,
					}),
				).pipe(
					mergeMap((responseData) => {
						if (responseData)
							return of(
								LabourInputTimeEvidenceActions.UpdateOtherWorkEnd(
									responseData.updateWorkersLogOtherWorksTimeEvidence
										.workersLogOtherWorksTimeEvidence,
								),
							);
						else return EMPTY;
					}),
				);
			},
		),
	);
};
