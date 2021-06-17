import { combineEpics, Epic } from 'redux-observable';
import { LabourInput } from '../types';
import { ModalType } from '../../../../../components/Modal/type';
import { CMSLoginType } from '../../../../../components/CMSLogin/type';
import { WorkersLogGeneral } from '../../general/types';
import { CrewState } from '../../work_time_evidence/crew/types/state';
import { WorkersState } from '../../work_time_evidence/worker/types/state';
import { GeneralState } from '../../work_time_evidence/general/types/state';
import { TimeEvidenceState } from '../../work_time_evidence/time_evidence/types/state';
import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import { concat, EMPTY, from, of } from 'rxjs';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { GetGroupedOtherWorksTimeEvidencesType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetGroupedOtherWorksTimeEvidences';
import LabourInputTimeEvidenceActions from './actions';
import ModalActions from '../../../../../components/Modal/redux/actions';
import { CreateGroupedOtherWorkTimeEvidenceType } from '../../../../../services/graphql.api.service/CONSTANTS/Mutations/CreateGroupedOtherWorkTimeEvidence';
import { CreateOtherWorkTimeEvidenceType } from '../../../../../services/graphql.api.service/CONSTANTS/Mutations/CreateOtherWorkTimeEvidence';

type ActionType =
	| LabourInput.Redux.Objects.Actions
	| LabourInput.Redux.General.Actions
	| LabourInput.Redux.TimeEvidence.Actions
	| ModalType.Redux.Actions;

type RootState = {
	ForgeViewer: {
		sheets: { index: string; name: string }[];
	};
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: {
		General: WorkersLogGeneral.Redux.Store;
		LabourInput: {
			General: LabourInput.Redux.General.Store;
			Objects: LabourInput.Redux.Objects.Store;
			TimeEvidence: LabourInput.Redux.TimeEvidence.Store;
		};
		WorkTimeEvidence: {
			Crews: CrewState;
			Workers: WorkersState;
			General: GeneralState;
			TimeEvidence: TimeEvidenceState;
		};
	};
};
const FetchGroupedOtherWorkTimeEvidencesEpic: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(
				data,
			): data is ReturnType<
				| LabourInput.Redux.General.IActions['SetDate']
				| LabourInput.Redux.General.IActions['ChooseLevel']
				| LabourInput.Redux.General.IActions['SelectCrew']
			> =>
				data.type === LabourInput.Redux.General.Types.SET_DATE ||
				data.type === LabourInput.Redux.General.Types.CHOOSE_LEVEL ||
				data.type === LabourInput.Redux.General.Types.SELECT_CREW,
		),
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
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

			function ErrorModalWithMessage(message?: string) {
				return of(
					ModalActions.InitializeModal({
						modalType: ModalType.Payload.EModalType.Error,
						title: 'Uwaga!',
						body: message || 'Nie udało się utworzyć i pobrać ewidencji czasu dla prac dodatkowych',
					}),
				);
			}

			if (
				state.WorkersLog.LabourInput.General.ActualDate &&
				state.WorkersLog.LabourInput.General.ActualCrew &&
				state.WorkersLog.LabourInput.General.ActiveLevel
			) {
				try {
					const RequestData = GetData(state);
					const apiQueryPromise = new GraphQLAPIService(
						state.CMSLogin.credentials?.access_token,
					).WorkersLog.LabourInput.GroupedOtherWorkTimeEvidence.GetAll(RequestData);
					return concat(
						of(LabourInputTimeEvidenceActions.FetchGroupedOtherWorkTimeEvidenceStart()),
						from(apiQueryPromise).pipe(
							mergeMap((response) => {
								if (response.workersLogGroupedOtherWorksTimeEvidences.length > 0) {
									return of(
										LabourInputTimeEvidenceActions.FetchGroupedOtherWorkTimeEvidenceEnd(
											response.workersLogGroupedOtherWorksTimeEvidences[0],
										),
									);
								} else if (response.workersLogGroupedOtherWorksTimeEvidences.length === 0) {
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
									try {
										const RequestData = GetCreateGroupedOtherWorkTimeEvidenceData(state);
										return from(
											new GraphQLAPIService(
												state.CMSLogin.credentials?.access_token,
											).WorkersLog.LabourInput.GroupedOtherWorkTimeEvidence.Create(RequestData),
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
function GetRequestDataFrom(
	state: RootState,
	action: ReturnType<LabourInput.Redux.TimeEvidence.IActions['CreateOtherWorkStart']>,
): CreateOtherWorkTimeEvidenceType.Request | null {
	if (
		!state.WorkersLog.LabourInput.General.ActiveWorkType ||
		!state.WorkersLog.LabourInput.TimeEvidence.GroupedOtherWorkTimeEvidenceId
	)
		return null;
	return {
		grouped_other_works_id: state.WorkersLog.LabourInput.TimeEvidence.GroupedOtherWorkTimeEvidenceId,
		work_type: action.payload.work_type,
		crew_type: state.WorkersLog.LabourInput.General.ActiveWorkType,
		worked_time: 0,
		work_option_id: action.payload.id,
		description: action.payload.commentary,
	};
}

const OnCreateOtherWorkEpic: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<LabourInput.Redux.TimeEvidence.IActions['CreateOtherWorkStart']> =>
				data.type === LabourInput.Redux.TimeEvidence.Types.CREATE_OTHER_WORK_START,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const data = GetRequestDataFrom(state, action);
			if (data) {
				return from(
					new GraphQLAPIService(
						state.CMSLogin.credentials?.access_token,
					).WorkersLog.LabourInput.OtherWorkTimeEvidence.Create(data),
				).pipe(
					mergeMap((responseData) => {
						if (responseData) {
							return of(
								LabourInputTimeEvidenceActions.CreateOtherWorkEnd(
									responseData.createWorkersLogOtherWorksTimeEvidence
										.workersLogOtherWorksTimeEvidence,
								),
							);
						} else {
							return of(
								ModalActions.InitializeModal({
									title: 'Uwaga!',
									modalType: ModalType.Payload.EModalType.Error,
									body: 'Nie udało się dodać wybranej pozycji pracy do zestawienia!',
								}),
							);
						}
					}),
				);
			}

			return EMPTY;
		}),
	);

const OnUpdateOtherWorkTimeEvidence: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<LabourInput.Redux.TimeEvidence.IActions['UpdateOtherWorkStart']> =>
				data.type === LabourInput.Redux.TimeEvidence.Types.UPDATE_OTHER_WORK_START,
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
						state.CMSLogin.credentials?.access_token,
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
export default combineEpics(
	FetchGroupedOtherWorkTimeEvidencesEpic,
	OnCreateOtherWorkEpic,
	OnUpdateOtherWorkTimeEvidence,
);
