import WorkersLog from '../../../../types';

import { GetObjectTimeEvidencesType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectTimeEvidences';
import { EMPTY, from, merge, of } from 'rxjs';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import { filter, map, repeatWhen, switchMap, withLatestFrom } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import LabourInputTimeEvidenceActions from '../../time_evidence/actions';
import { RootActions } from '../../../../../../state/types/RootActions';
import { RootState } from '../../../../../../state';

function GetDataPayload(state: RootState): GetObjectTimeEvidencesType.Request {
	const date = state.WorkersLog.LabourInput.General.ActualDate;
	const crew_id = state.WorkersLog.LabourInput.General.ActualCrew;
	const project_id = state.CMSLogin.actual_project?.id;
	const user_id = state.CMSLogin.user?.id;
	if (!crew_id) throw new Error('Nie wybrano Brygady!');
	if (!project_id) throw new Error('Nie wybrano projektu!');
	if (!user_id) throw new Error('Użytkownik nie jest poprawnie zalogowany');
	return {
		date,
		crew_id,
		project_id,
		user_id,
	};
}

export const OnEndFetchObjectsEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$
		.pipe(
			filter(
				(
					data,
				): data is ReturnType<
					| WorkersLog.LabourInput.Redux.Objects.IActions['FetchObjectsEnd']
					| WorkersLog.LabourInput.Redux.General.IActions['SelectCrew']
				> =>
					data.type === WorkersLog.LabourInput.Redux.Objects.Types.SET_FILTERED_OBJECTS ||
					data.type === WorkersLog.LabourInput.Redux.General.Types.SELECT_CREW,
			),
			withLatestFrom(state$),
			switchMap(([_, state]) => {
				const objectIDS = state.WorkersLog.LabourInput.Objects.FilteredObjects;
				try {
					const payloadDataWithoutObjectID = GetDataPayload(state);
					if (objectIDS.length === 0)
						return of(LabourInputTimeEvidenceActions.FetchAllObjectTimeEvidenceEnd([]));
					return merge(
						of(LabourInputTimeEvidenceActions.FetchAllObjectTimeEvidenceStart()),
						from(
							new GraphQLAPIService(
								state.CMSLogin.credentials?.token,
							).WorkersLog.LabourInput.ObjectTimeEvidences.Get(payloadDataWithoutObjectID),
						).pipe(
							map((data) => {
								return LabourInputTimeEvidenceActions.FetchAllObjectTimeEvidenceEnd(
									data.workersLogObjectTimeEvidences,
								);
							}),
						),
					);
				} catch (Error) {
					return EMPTY;
				}
			}),
		)
