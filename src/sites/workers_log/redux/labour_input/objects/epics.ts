import { combineEpics, Epic, ofType } from 'redux-observable';
import { LabourInput } from '../types';
import { ModalType } from '../../../../../components/Modal/type';
import { catchError, combineAll, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { combineLatest, concat, EMPTY, from, iif, of } from 'rxjs';
import RestAPIService from '../../../../../services/rest.api.service';
import LabourInputObjectsActions from './actions';
import ModalActions from '../../../../../components/Modal/redux/actions';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { GetObjectTimeEvidencesType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectTimeEvidences';
import dayjs from 'dayjs';
import LabourInputTimeEvidenceActions from '../time_evidence/actions';
import normalize from '../../../../../utils/Normalize';
import { RootState } from '../../../../../store';
import CurrentElementsFilter from '../../utils/CurrentElements.Filter';
import ForgeViewerActions from '../../../../../components/ForgeViewer/redux/actions';
import ForgeViewer from '../../../../../components/ForgeViewer/types';

type ActionType =
	| LabourInput.Redux.Objects.Actions
	| LabourInput.Redux.General.Actions
	| LabourInput.Redux.TimeEvidence.Actions
	| ModalType.Redux.Actions
	| ForgeViewer.Redux.Actions;
const OnChangeLevelOrDate: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(
				data,
			): data is ReturnType<
				LabourInput.Redux.General.IActions['SetDate'] | LabourInput.Redux.General.IActions['ChooseLevel']
			> =>
				data.type === LabourInput.Redux.General.Types.SET_DATE ||
				data.type === LabourInput.Redux.General.Types.CHOOSE_LEVEL,
		),
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
			const date = state.WorkersLog.LabourInput.General.ActualDate;
			const project = state.CMSLogin.actual_project?.id;
			return date && project
				? concat(
						of(LabourInputObjectsActions.FetchObjectsStart()),
						from(
							new RestAPIService(
								state.CMSLogin.credentials?.access_token,
							).WORKERS_LOG.LABOUR_INPUT.GetObjectsFilteredByStatuses({ date, project }) as Promise<
								LabourInput.Payload.Objects.ObjectWithStatus[]
							>,
						).pipe(
							withLatestFrom(state$),
							mergeMap(([data, state]) => {
								const level = state.WorkersLog.LabourInput.General.ActiveLevel;
								const objects = normalize(data, 'id') as {
									[key: string]: LabourInput.Payload.Objects.ObjectWithStatus;
								};
								return concat(
									of(LabourInputObjectsActions.FetchObjectsEnd(objects)),
									of(
										LabourInputObjectsActions.SetFilteredObjects(
											level
												? Object.values(objects)
														.filter((object) => object.level.toString() === level.id)
														.map((e) => e.id)
												: [],
										),
									),
								);
							}),
							catchError(() =>
								of(
									ModalActions.InitializeModal({
										title: 'Błąd!',
										modalType: ModalType.Payload.EModalType.Error,
										body: 'Pobieranie aktualnych statusów nie powiodło się!',
									}),
								),
							),
						),
				  )
				: EMPTY;
		}),
	);

const OnSetFilteredObjects: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	combineLatest(
		action$.pipe(ofType(LabourInput.Redux.Objects.Types.SET_FILTERED_OBJECTS)),
		action$.pipe(ofType(ForgeViewer.Redux.Types.SET_MODEL_ELEMENTS)),
	).pipe(
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			try {
				const { filteredData } = new CurrentElementsFilter(CurrentElementsFilter.validateData(state));
				return of(ForgeViewerActions.SetElements(filteredData.forgeElements));
			} catch (e) {
				console.log(e.message);
				return EMPTY;
			}
		}),
	);

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

function FetchObjectTimeEvidenceEpic(state: RootState, data: GetObjectTimeEvidencesType.Request, object_ids: number) {
	return concat(
		of(LabourInputTimeEvidenceActions.FetchObjectTimeEvidenceStart(object_ids)),
		from(
			new GraphQLAPIService(
				state.CMSLogin.credentials?.access_token,
			).WorkersLog.LabourInput.ObjectTimeEvidences.Get({ ...data, object_ids, limit: 1 }),
		).pipe(
			map((data) =>
				LabourInputTimeEvidenceActions.FetchObjectTimeEvidenceEnd(
					data.workersLogObjectTimeEvidences.length > 0 ? data.workersLogObjectTimeEvidences[0] : null,
					object_ids,
				),
			),
		),
	);
}
function FetchObjectTimeEvidenceEpicv2(state: RootState, data: GetObjectTimeEvidencesType.Request, object_ids: number) {
	return from(
		new GraphQLAPIService(state.CMSLogin.credentials?.access_token).WorkersLog.LabourInput.ObjectTimeEvidences.Get({
			...data,
			object_ids,
			limit: 1,
		}),
	).pipe(
		map((data) => {
			if (data.workersLogObjectTimeEvidences.length > 0) return of(data.workersLogObjectTimeEvidences[0]);
			return EMPTY;
		}),
	);
}
const onFetchObjectsEnd: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(
				data,
			): data is ReturnType<
				LabourInput.Redux.Objects.IActions['FetchObjectsEnd'] | LabourInput.Redux.General.IActions['SelectCrew']
			> =>
				data.type === LabourInput.Redux.Objects.Types.SET_FILTERED_OBJECTS ||
				data.type === LabourInput.Redux.General.Types.SELECT_CREW,
		),
		withLatestFrom(state$),
		switchMap(([_, state]) => {
			const objectIDS = state.WorkersLog.LabourInput.Objects.FilteredObjects;
			try {
				const payloadDataWithoutObjectID = GetDataPayload(state);
				return concat(
					of(LabourInputTimeEvidenceActions.FetchAllObjectTimeEvidenceStart()),
					iif(
						() => objectIDS.length > 0,
						from(objectIDS)
							.pipe(
								mergeMap((id) => FetchObjectTimeEvidenceEpicv2(state, payloadDataWithoutObjectID, id)),
								combineAll(),
							)
							.pipe(
								map((data) => {
									return LabourInputTimeEvidenceActions.FetchAllObjectTimeEvidenceEnd(data);
								}),
							),
						of(LabourInputTimeEvidenceActions.FetchAllObjectTimeEvidenceEnd([])),
					),
				);
			} catch (Error) {
				return EMPTY;
			}
		}),
	);

const CreateOrUpdateObjectTimeEvidence: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(
				data,
			): data is ReturnType<LabourInput.Redux.TimeEvidence.IActions['CreateOrUpdateObjectTimeEvidenceStart']> =>
				data.type === LabourInput.Redux.TimeEvidence.Types.CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_START,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const { ObjectTimeEvidenceID, workedTime, objectID } = action.payload;
			const api = new GraphQLAPIService(state.CMSLogin.credentials?.access_token);
			if (ObjectTimeEvidenceID) {
				return from(
					api.WorkersLog.LabourInput.ObjectTimeEvidences.Update({
						object_time_evidence_id: ObjectTimeEvidenceID,
						worked_time: workedTime,
					}),
				).pipe(
					mergeMap((response) => {
						if (response)
							return of(
								LabourInputTimeEvidenceActions.CreateOrUpdateObjectTimeEvidenceEnd(
									response.updateWorkersLogObjectTimeEvidence.workersLogObjectTimeEvidence,
									objectID,
								)
							);
						return EMPTY;
					}),
				);
			} else {
				const date = dayjs(state.WorkersLog.LabourInput.General.ActualDate).format('YYYY-MM-DD'),
					project_id = state.CMSLogin.actual_project?.id,
					user_id = state.CMSLogin.user?.id,
					crew_id = state.WorkersLog.LabourInput.General.ActualCrew,
					worked_time = workedTime,
					object_id = objectID;
				if (!project_id || !user_id || !crew_id)
					return of(
						ModalActions.InitializeModal({
							title: 'Uwaga!',
							body: 'Nie można zapisać aktualizacji nakładu pracy dla elementu' + ' o ID : ' + objectID,
							modalType: ModalType.Payload.EModalType.Error,
						}),
					);
				return from(
					api.WorkersLog.LabourInput.ObjectTimeEvidences.Create({
						date,
						project_id,
						user_id,
						crew_id,
						worked_time,
						object_id,
					}),
				).pipe(
					mergeMap((response) => {
						if (response)
							return of(
								LabourInputTimeEvidenceActions.CreateOrUpdateObjectTimeEvidenceEnd(
									response.createWorkersLogObjectTimeEvidence.workersLogObjectTimeEvidence,
									objectID,
								),
							);
						return EMPTY;
					}),
				);
			}
		}),
	);

export default combineEpics(
	OnChangeLevelOrDate,
	onFetchObjectsEnd,
	CreateOrUpdateObjectTimeEvidence,
	OnSetFilteredObjects,
);
