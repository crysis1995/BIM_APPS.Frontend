import WorkersLog from '../../../../types';
import { ModalType } from '../../../../../../state/Modal/type';
import { Epic } from 'redux-observable';

import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import { EMPTY, from, merge, of } from 'rxjs';
import LabourInputTimeEvidenceActions from '../../time_evidence/actions';
import { GetGroupedOtherWorksTimeEvidencesType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetGroupedOtherWorksTimeEvidences';
import { CreateGroupedOtherWorkTimeEvidenceType } from '../../../../../../services/graphql.api.service/CONSTANTS/Mutations/CreateGroupedOtherWorkTimeEvidence';
import ModalActions from '../../../../../../state/Modal/actions';
import { RootActions, RootState } from '../../../../../../state';

export const HandleFetchGroupedOtherWorkTimeEvidenceEpic: Epic<
	RootActions,
	RootActions,
	RootState
> = (action$, state$) =>
	action$.pipe(
		filter(
			(
				data,
			): data is ReturnType<
				| WorkersLog.LabourInput.Redux.General.IActions['SetDate']
				| WorkersLog.LabourInput.Redux.General.IActions['ChooseLevel']
				| WorkersLog.LabourInput.Redux.General.IActions['SelectCrew']
			> =>
				data.type === WorkersLog.LabourInput.Redux.General.Types.SET_DATE ||
				data.type === WorkersLog.LabourInput.Redux.General.Types.CHOOSE_LEVEL ||
				data.type === WorkersLog.LabourInput.Redux.General.Types.SELECT_CREW,
		),
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
			const API = new GraphQLAPIService(state.CMSLogin.credentials?.token).WorkersLog
				.LabourInput.GroupedOtherWorkTimeEvidence;
			if (
				state.WorkersLog.LabourInput.General.ActualDate &&
				state.WorkersLog.LabourInput.General.ActualCrew &&
				state.WorkersLog.LabourInput.General.ActiveLevel
			) {
				try {
					return merge(
						of(LabourInputTimeEvidenceActions.FetchGroupedOtherWorkTimeEvidenceStart()),
						from(API.GetAll(GetData(state))).pipe(
							mergeMap((response) => {
								if (response.workersLogGroupedOtherWorksTimeEvidences.length > 0) {
									return of(
										LabourInputTimeEvidenceActions.FetchGroupedOtherWorkTimeEvidenceEnd(
											response.workersLogGroupedOtherWorksTimeEvidences[0],
										),
									);
								} else if (
									response.workersLogGroupedOtherWorksTimeEvidences.length === 0
								) {
									try {
										return from(
											API.Create(
												GetCreateGroupedOtherWorkTimeEvidenceData(state),
											),
										).pipe(
											mergeMap((response) => {
												if (response)
													return of(
														LabourInputTimeEvidenceActions.FetchGroupedOtherWorkTimeEvidenceEnd(
															{
																...response
																	.createWorkersLogGroupedOtherWorksTimeEvidence
																	.workersLogGroupedOtherWorksTimeEvidence,
																other_works_time_evidences: [],
															},
														),
													);
												return ErrorModalWithMessage(
													'Nie udało się utworzyć ewidencji czasu dla prac dodatkowych',
												);
											}),
										);
									} catch (e) {
										console.log(e);
										// @ts-ignore
										return ErrorModalWithMessage(e.message);
									}
								}
								return ErrorModalWithMessage();
							}),
						),
					);
				} catch (e) {
					console.log(e);
				}
			}
			return EMPTY;
		}),
	);

function GetData(state: RootState): GetGroupedOtherWorksTimeEvidencesType.Request {
	const project_id = state.CMSLogin.actual_project?.id,
		crew_id = state.WorkersLog.LabourInput.General.ActualCrew,
		date = state.WorkersLog.LabourInput.General.ActualDate,
		crew_type = state.WorkersLog.LabourInput.General.ActiveWorkType,
		level_id = state.WorkersLog.LabourInput.General.ActiveLevel?.id;
	if (!crew_id) throw new Error('Empty Crew!');
	if (!project_id) throw new Error('Empty project!');
	if (!crew_type) throw new Error('Empty Crew Type!');
	if (!level_id) throw new Error('Empty Level!');
	return { date, crew_id, project_id, crew_type, level_id };
}

function GetCreateGroupedOtherWorkTimeEvidenceData(
	state: RootState,
): CreateGroupedOtherWorkTimeEvidenceType.Request {
	const project_id = state.CMSLogin.actual_project?.id,
		crew_id = state.WorkersLog.LabourInput.General.ActualCrew,
		date = state.WorkersLog.LabourInput.General.ActualDate,
		crew_type = state.WorkersLog.LabourInput.General.ActiveWorkType,
		level_id = state.WorkersLog.LabourInput.General.ActiveLevel?.id;
	if (!crew_id) throw new Error('Empty Crew!');
	if (!project_id) throw new Error('Empty project!');
	if (!crew_type) throw new Error('Empty Crew Type!');
	if (!level_id) throw new Error('Empty Level!');
	return { date, crew_id, project_id, crew_type, level_id };
}

function ErrorModalWithMessage(message?: string) {
	return of(
		ModalActions.InitializeModal({
			modalType: ModalType.Payload.EModalType.Error,
			title: 'Uwaga!',
			body: message || 'Nie udało się utworzyć i pobrać ewidencji czasu dla prac dodatkowych',
		}),
	);
}
