import WorkersLog from '../../../../types';
import { Epic } from 'redux-observable';

import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { from } from 'rxjs';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import LabourInputTimeEvidenceActions from '../../time_evidence/actions';
import { RootActions, RootState } from '../../../../../../state';

export const OnStartUpdateObjectTimeEvidenceEpic: Epic<RootActions, RootActions, RootState> = (
	action$,
	state$,
) =>
	action$.pipe(
		filter(
			(
				data,
			): data is ReturnType<
				WorkersLog.LabourInput.Redux.TimeEvidence.IActions['UpdateObjectTimeEvidenceStart']
			> =>
				data.type ===
				WorkersLog.LabourInput.Redux.TimeEvidence.Types.UPDATE_OBJECT_TIME_EVIDENCE_START,
		),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			console.log(action.payload.workedTime);
			const UpdateObjectWorkTimeEvidenceAPI = new GraphQLAPIService(
				state.CMSLogin.credentials?.token,
			).WorkersLog.LabourInput.ObjectTimeEvidences.Update;
			return from(
				UpdateObjectWorkTimeEvidenceAPI({
					object_time_evidence_id: action.payload.id,
					worked_time: action.payload.workedTime,
				}),
			).pipe(
				map((data) =>
					LabourInputTimeEvidenceActions.UpdateObjectTimeEvidenceEnd(
						data.updateWorkersLogObjectTimeEvidence.workersLogObjectTimeEvidence,
					),
				),
			);
		}),
	);
