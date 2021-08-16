import { ReturnTypeFromInterface } from '../../../types/ReturnTypeFromInterface';
import { GetCrewsAndTheirCrewSummariesType } from '../../../services/graphql.api.service/CONSTANTS/Queries/GetCrewsAndTheirCrewSummaries';
import { CMSLoginType } from '../../../components/CMSLogin/type';
import {
	OTHER_WORK_TYPE,
	WORKERS_LOG__WORKERS_TYPE,
} from '../../../services/graphql.api.service/CONSTANTS/GeneralTypes';
import dayjs, { Dayjs } from 'dayjs';
import { GetGroupedOtherWorksTimeEvidencesType } from '../../../services/graphql.api.service/CONSTANTS/Queries/GetGroupedOtherWorksTimeEvidences';
import { WORKER_TYPES } from '../redux/constants';
import { CrewSummariesData } from '../redux/work_time_evidence/crew/utils/ExtractRequestData';
import { GetObjectsByLevelType } from '../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import { CountAllAndEmptyType } from '../../../services/graphql.api.service/CONSTANTS/Queries/CountAllAndEmpty';

namespace WorkersLog {
	export namespace General {
		export namespace Redux {
			export interface Store {
				initialized: boolean;
				last_initialized: Date;
				all_crews: { [key: string]: GetCrewsAndTheirCrewSummariesType.WorkersLogCrew } | null;
			}
			export interface IActions {
				Initialize: () => { type: WorkersLog.General.Redux.Types.WORKERS_LOG_INITIALIZE };
				Finish: () => { type: WorkersLog.General.Redux.Types.WORKERS_LOG_FINISH };
				FetchCrewsData: (data: GetCrewsAndTheirCrewSummariesType.Response) => {
					type: WorkersLog.General.Redux.Types.WORKERS_LOG_FETCH_CREWS_DATA;
					payload: typeof data;
				};
			}
			export type Actions = ReturnTypeFromInterface<WorkersLog.General.Redux.IActions>;
			export enum Types {
				WORKERS_LOG_INITIALIZE = 'workers_log__INITIALIZE',
				WORKERS_LOG_FINISH = 'workers_log__FINISH',
				WORKERS_LOG_FETCH_CREWS_DATA = 'workers_log__FETCH_CREWS_DATA',
			}
		}
	}
	export namespace LabourInput {
		export namespace Redux {
			export namespace General {
				export interface Store {
					IsActive: boolean;
					ActiveLevel: CMSLoginType.Payload.Level | null;
					ActualDate: string;
					ActiveWorkType: WORKERS_LOG__WORKERS_TYPE | null;
					ActualCrew: string | null;
					OtherWorks: null | { [key: string]: LabourInput.Payload.General.OtherWorksData };
					OtherWorksLoading: boolean;
				}

				export interface IActions {
					InitializeComponent: (value: boolean) => {
						type: typeof LabourInput.Redux.General.Types.INITIALIZE;
						payload: typeof value;
					};
					SetInitial: () => {
						type: typeof LabourInput.Redux.General.Types.SET_INITIAL;
					};
					ChooseLevel: (data: CMSLoginType.Payload.Level | null) => {
						type: typeof LabourInput.Redux.General.Types.CHOOSE_LEVEL;
						payload: typeof data;
					};
					SetDate: (data: dayjs.Dayjs) => {
						type: typeof LabourInput.Redux.General.Types.SET_DATE;
						payload: typeof data;
					};

					SelectWorkerType: (data: WORKERS_LOG__WORKERS_TYPE | null) => {
						type: typeof LabourInput.Redux.General.Types.SELECT_WORKER_TYPE;
						payload: { data: typeof data };
					};

					SelectCrew: (data: string | null) => {
						type: typeof LabourInput.Redux.General.Types.SELECT_CREW;
						payload: {
							data: typeof data;
						};
					};

					FetchOtherWorksStart: () => {
						type: typeof LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_START;
					};
					FetchOtherWorksEnd: (data: { [key: string]: LabourInput.Payload.General.OtherWorksData }) => {
						type: typeof LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_END;
						payload: typeof data;
					};
				}

				export type Actions = ReturnTypeFromInterface<LabourInput.Redux.General.IActions>;

				export enum Types {
					SET_DATE = 'labour_input__SET_DATE',
					CHOOSE_LEVEL = 'labour_input__CHOOSE_LEVEL',
					SELECT_WORKER_TYPE = 'labour_input__SELECT_WORKER_TYPE',
					SELECT_CREW = 'labour_input__SELECT_CREW',
					SET_INITIAL = 'labour_input__SET_INITIAL',
					INITIALIZE = 'labour_input__INITIALIZE',
					FETCH_OTHER_WORKS_START = 'labour_input__FETCH_OTHER_WORKS_START',
					FETCH_OTHER_WORKS_END = 'labour_input__FETCH_OTHER_WORKS_END',
				}
			}
			export namespace Objects {
				export interface Store {
					ByRevitID: { [key: string]: LabourInput.Payload.Objects.ObjectWithStatus['id'] };
					AllObjects: null | { [key: string]: LabourInput.Payload.Objects.ObjectWithStatus };
					Loading: boolean;
					FilteredObjects: LabourInput.Payload.Objects.ObjectWithStatus['id'][];
					ObjectsGroups: LabourInput.Payload.Objects.ObjectWithStatus['id'][];
					Selection: number[];
				}

				export interface IActions {
					FetchObjectsStart: () => {
						type: typeof LabourInput.Redux.Objects.Types.FETCH_OBJECTS_START;
					};
					FetchObjectsEnd: (data: { [key: string]: LabourInput.Payload.Objects.ObjectWithStatus }) => {
						type: typeof LabourInput.Redux.Objects.Types.FETCH_OBJECTS_END;
						payload: typeof data;
					};
					SetFilteredObjects: (data: number[]) => {
						type: typeof LabourInput.Redux.Objects.Types.SET_FILTERED_OBJECTS;
						payload: typeof data;
					};

					HandleSelectObject: (data: number[]) => {
						type: typeof LabourInput.Redux.Objects.Types.HANDLE_SELECT_OBJECT;
						payload: typeof data;
					};
					SelectObject: (data: number | number[]) => {
						type: typeof LabourInput.Redux.Objects.Types.SELECT_OBJECT;
						payload: typeof data;
					};
					GroupObjectsInit: (
						objectIds: number[],
						workedTime?: number,
					) => {
						type: typeof LabourInput.Redux.Objects.Types.GROUP_OBJECTS_INIT;
						payload: {
							objectIds: typeof objectIds;
							workedTime: typeof workedTime;
						};
					};
					GroupObjects: (data: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'][]) => {
						type: typeof LabourInput.Redux.Objects.Types.GROUP_OBJECTS;
						payload: typeof data;
					};

					UngroupObjectsInit: (
						groupID: string,
						data: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'][],
					) => {
						type: typeof LabourInput.Redux.Objects.Types.UNGROUP_OBJECTS_INIT;
						payload: { data: typeof data; groupID: typeof groupID };
					};
					UngroupObjects: (data: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'][]) => {
						type: typeof LabourInput.Redux.Objects.Types.UNGROUP_OBJECTS;
						payload: typeof data;
					};
				}

				export type Actions = ReturnTypeFromInterface<LabourInput.Redux.Objects.IActions>;

				export enum Types {
					FETCH_OBJECTS_START = 'labour_input__OBJECTS__FETCH_OBJECTS_START',
					FETCH_OBJECTS_END = 'labour_input__OBJECTS__FETCH_OBJECTS_END',
					SET_FILTERED_OBJECTS = 'labour_input__OBJECTS__SET_FILTERED_OBJECTS',
					SELECT_OBJECT = 'labour_input__SELECT_OBJECT',
					HANDLE_SELECT_OBJECT = 'labour_input__HANDLE_SELECT_OBJECT',
					GROUP_OBJECTS_INIT = 'labour_input__GROUP_OBJECTS_INIT',
					GROUP_OBJECTS = 'labour_input__GROUP_OBJECTS',
					UNGROUP_OBJECTS = 'labour_input__UNGROUP_OBJECTS',
					UNGROUP_OBJECTS_INIT = 'labour_input__UNGROUP_OBJECTS_INIT',
				}
			}
			export namespace TimeEvidence {
				export interface Store {
					ObjectsTimeEvidencesLoading: { [key: string]: boolean };
					ObjectsTimeEvidences: null | {
						[key: string]: LabourInput.Payload.TimeEvidence.ObjectTimeEvidence | null;
					};

					LabourSummaryWorkTime: number;
					LabourSummaryWorkTimeLoading: boolean;

					CurrentSummaryWorkTime: number;
					CurrentSummaryWorkTimeLoading: boolean;

					GroupedOtherWorkTimeEvidenceId: null | string;
					GroupedOtherWorkTimeEvidenceLoading: boolean;

					OtherWorksTimeEvidences: null | {
						[key: string]: LabourInput.Payload.TimeEvidence.OtherWorksTimeEvidence;
					};
					OtherWorksTimeEvidencesLoading: { [key: string]: boolean };

					TimeDifference: number;
					CanFillTime: boolean;
				}

				export interface IActions {
					SetSummaryWorkTimeStart: () => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.SET_SUMMARY_WORK_TIME_START;
					};

					SetSummaryWorkTimeEnd: (data: number) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.SET_SUMMARY_WORK_TIME_END;
						payload: typeof data;
					};

					FetchAllObjectTimeEvidenceStart: () => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.FETCH_ALL_OBJECTS_TIME_EVIDENCE_START;
					};

					FetchAllObjectTimeEvidenceEnd: (data: LabourInput.Payload.TimeEvidence.ObjectTimeEvidence[]) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.FETCH_ALL_OBJECTS_TIME_EVIDENCE_END;
						payload: typeof data;
					};
					FetchObjectTimeEvidenceStart: (objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'][]) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_START;
						payload: typeof objectID;
					};
					FetchObjectTimeEvidenceEnd: (data: LabourInput.Payload.TimeEvidence.ObjectTimeEvidence) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_END;
						payload: typeof data;
					};
					CreateObjectTimeEvidenceStart: (
						ObjectTimeEvidenceID: LabourInput.Payload.TimeEvidence.ObjectTimeEvidence['id'] | null,
						objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'],
						workedTime: number,
					) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.CREATE_OBJECT_TIME_EVIDENCE_START;
						payload: {
							ObjectTimeEvidenceID: typeof ObjectTimeEvidenceID;
							workedTime: typeof workedTime;
							objectID: typeof objectID;
						};
					};
					CreateObjectTimeEvidenceEnd: (data: LabourInput.Payload.TimeEvidence.ObjectTimeEvidence) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.CREATE_OBJECT_TIME_EVIDENCE_END;
						payload: typeof data;
					};

					UpdateObjectTimeEvidenceStart: (
						id: string,
						workedTime: number,
					) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.UPDATE_OBJECT_TIME_EVIDENCE_START;
						payload: {
							id: typeof id;
							workedTime: typeof workedTime;
						};
					};
					UpdateObjectTimeEvidenceEnd: (data: LabourInput.Payload.TimeEvidence.ObjectTimeEvidence) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.UPDATE_OBJECT_TIME_EVIDENCE_END;
						payload: typeof data;
					};

					DeleteObjectTimeEvidenceStart: (id: LabourInput.Payload.TimeEvidence.ObjectTimeEvidence['id']) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.DELETE_OBJECT_TIME_EVIDENCE_START;
						payload: typeof id;
					};

					DeleteObjectTimeEvidenceEnd: (id: LabourInput.Payload.TimeEvidence.ObjectTimeEvidence['id']) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.DELETE_OBJECT_TIME_EVIDENCE_END;
						payload: typeof id;
					};

					FetchGroupedOtherWorkTimeEvidenceStart: () => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.FETCH_GROUPED_OTHER_WORK_TIME_EVIDENCE_START;
					};
					FetchGroupedOtherWorkTimeEvidenceEnd: (
						data: LabourInput.Payload.TimeEvidence.GroupedOtherWorkTimeEvidence,
					) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.FETCH_GROUPED_OTHER_WORK_TIME_EVIDENCE_END;
						payload: typeof data;
					};

					CreateOtherWorkStart: (data: LabourInput.Payload.TimeEvidence.CreateOtherWorkPayload) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.CREATE_OTHER_WORK_START;
						payload: typeof data;
					};
					CreateOtherWorkEnd: (data: LabourInput.Payload.TimeEvidence.OtherWorksTimeEvidence) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.CREATE_OTHER_WORK_END;
						payload: typeof data;
					};

					UpdateOtherWorkStart: (data: {
						worked_time: number;
						id: LabourInput.Payload.TimeEvidence.OtherWorksTimeEvidence['id'];
					}) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.UPDATE_OTHER_WORK_START;
						payload: typeof data;
					};
					UpdateOtherWorkEnd: (data: LabourInput.Payload.TimeEvidence.OtherWorksTimeEvidence) => {
						type: typeof LabourInput.Redux.TimeEvidence.Types.UPDATE_OTHER_WORK_END;
						payload: typeof data;
					};
				}
				export type Actions = ReturnTypeFromInterface<LabourInput.Redux.TimeEvidence.IActions>;
				export enum Types {
					SET_SUMMARY_WORK_TIME_START = 'labour_input__SET_SUMMARY_WORK_TIME_START',
					SET_SUMMARY_WORK_TIME_END = 'labour_input__SET_SUMMARY_WORK_TIME_END',

					FETCH_ALL_OBJECTS_TIME_EVIDENCE_START = 'labour_input__FETCH_ALL_OBJECTS_TIME_EVIDENCE_START',
					FETCH_ALL_OBJECTS_TIME_EVIDENCE_END = 'labour_input__FETCH_ALL_OBJECTS_TIME_EVIDENCE_END',
					FETCH_OBJECT_TIME_EVIDENCE_START = 'labour_input__FETCH_OBJECT_TIME_EVIDENCE_START',
					FETCH_OBJECT_TIME_EVIDENCE_END = 'labour_input__FETCH_OBJECT_TIME_EVIDENCE_END',

					CREATE_OBJECT_TIME_EVIDENCE_START = 'labour_input__CREATE_OBJECT_TIME_EVIDENCE_START',
					CREATE_OBJECT_TIME_EVIDENCE_END = 'labour_input__CREATE_OBJECT_TIME_EVIDENCE_END',
					UPDATE_OBJECT_TIME_EVIDENCE_START = 'labour_input__UPDATE_OBJECT_TIME_EVIDENCE_START',
					UPDATE_OBJECT_TIME_EVIDENCE_END = 'labour_input__UPDATE_OBJECT_TIME_EVIDENCE_END',
					DELETE_OBJECT_TIME_EVIDENCE_START = 'labour_input__DELETE_OBJECT_TIME_EVIDENCE_START',
					DELETE_OBJECT_TIME_EVIDENCE_END = 'labour_input__DELETE_OBJECT_TIME_EVIDENCE_END',

					FETCH_GROUPED_OTHER_WORK_TIME_EVIDENCE_START = 'labour_input__FETCH_GROUPED_OTHER_WORK_TIME_EVIDENCE_START',
					FETCH_GROUPED_OTHER_WORK_TIME_EVIDENCE_END = 'labour_input__FETCH_GROUPED_OTHER_WORK_TIME_EVIDENCE_END',

					CREATE_OR_UPDATE_OTHER_WORK_TIME_EVIDENCE_START = 'labour_input__CREATE_OR_UPDATE_OTHER_WORK_TIME_EVIDENCE_START',
					CREATE_OR_UPDATE_OTHER_WORK_TIME_EVIDENCE_END = 'labour_input__CREATE_OR_UPDATE_OTHER_WORK_TIME_EVIDENCE_END',
					CREATE_OTHER_WORK_START = 'labour_input__CREATE_OTHER_WORK_START',
					CREATE_OTHER_WORK_END = 'labour_input__CREATE_OTHER_WORK_END',
					UPDATE_OTHER_WORK_START = 'labour_input__UPDATE_OTHER_WORK_START',
					UPDATE_OTHER_WORK_END = 'labour_input__UPDATE_OTHER_WORK_END',
				}
			}
		}
		export namespace Payload {
			export namespace General {
				export interface OtherWorksData {
					id: string;
					name: string;
					work_type: OTHER_WORK_TYPE;
					crew_type: null | WORKERS_LOG__WORKERS_TYPE;
				}
			}

			export namespace Objects {
				export interface ObjectWithStatus {
					id: number;
					revit_id: number;
					level: number;
					statuses: Status[];
					VCF_Realisation: string | null;
					area?: number;
					running_meter?: number;
					volume?: number;
				}

				export interface Status {
					id: number;
					date: Date;
					user?: number;
					status: GetObjectsByLevelType.StatusEnum;
				}

				export interface WorkTimeGroupedObjects {
					id: string;
					objects: { id: string }[];
				}
			}
			export namespace TimeEvidence {
				export interface ObjectTimeEvidence {
					id: string;
					worked_time: number;
					objects: { id: string }[];
				}

				export interface CreateOtherWorkPayload {
					id: string | number;
					work_type: OTHER_WORK_TYPE;
					commentary?: string;
				}

				export type GroupedOtherWorkTimeEvidence =
					GetGroupedOtherWorksTimeEvidencesType.WorkersLogGroupedOtherWorksTimeEvidence;
				export type OtherWorksTimeEvidence = GetGroupedOtherWorksTimeEvidencesType.OtherWorksTimeEvidence;
			}
		}
	}

	export namespace WorkTimeEvidence {
		export namespace Crew {
			export namespace Payload {
				export interface CrewPayload {
					id: string;
					name: string;
					is_subcontractor: boolean;
					workers_type: WORKERS_LOG__WORKERS_TYPE;
					// workers: WorkerPayload['id'][];
				}

				export interface CrewSummary {
					id: string;
					workers: WorkersLog.WorkTimeEvidence.Worker.Payload.WorkerPayload['id'][];
				}

				export interface GetAllCrewSummariesResponse {
					workersLogCrewSummaries: WorkersLogCrewSummaryResponse[];
				}

				export interface CreateWorkersLogCrewSummaryResponse {
					createWorkersLogCrewSummary: {
						workersLogCrewSummary: WorkersLogCrewSummaryResponse;
					};
				}

				export interface WorkersLogCrewSummaryResponse {
					id: string;
					workers: { id: WorkersLog.WorkTimeEvidence.Worker.Payload.WorkerPayload['id'] }[];
				}

				export interface GQLUpdateCrewSummary {
					updateWorkersLogCrewSummary: {
						workersLogCrewSummary: WorkersLogCrewSummaryResponse;
					};
				}
			}
			export namespace Redux {
				export interface Store {
					all: null | { [key: string]: WorkersLog.WorkTimeEvidence.Crew.Payload.CrewPayload };
					loading: boolean;
					actual: WorkersLog.WorkTimeEvidence.Crew.Payload.CrewPayload['id'] | null;
					loading_summary: boolean;
					summary: null | WorkersLog.WorkTimeEvidence.Crew.Payload.CrewSummary;
				}
				export interface IActions {
					addCrew: () => {
						type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.ADD;
					};
					chooseCrew: (crew: WorkersLog.WorkTimeEvidence.Crew.Payload.CrewPayload['id']) => {
						type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.CHOOSE;
						payload: { crew: typeof crew };
					};
					DeleteCrewInit: (
						crew: WorkersLog.WorkTimeEvidence.Crew.Payload.CrewPayload['id'],
						summaries: CountAllAndEmptyType.Response['all']['values'],
					) => {
						type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.DELETE_INIT;
						payload: { crew: typeof crew; summaries: typeof summaries };
					};
					DeleteCrewFinish: (crew: WorkersLog.WorkTimeEvidence.Crew.Payload.CrewPayload['id']) => {
						type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.DELETE_FINISH;
						payload: typeof crew;
					};
					fetchCrewStart: () => {
						type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_START;
					};
					fetchCrewEnd: (crews: { [key: string]: WorkersLog.WorkTimeEvidence.Crew.Payload.CrewPayload }) => {
						type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_END;
						payload: {
							crews: typeof crews;
						};
					};
					fetchCrewError: (error: string) => {
						type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_ERROR;
						payload: { error: typeof error };
					};

					fetchCrewSummariesStart: (data: CrewSummariesData) => {
						type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_CREW_SUMMARIES_START;
						payload: { data: typeof data };
					};
					fetchCrewSummariesEnd: (
						crew_summary: WorkersLog.WorkTimeEvidence.Crew.Payload.CrewSummary | null,
					) => {
						type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_CREW_SUMMARIES_END;
						payload: { crew_summary: typeof crew_summary };
					};
					createCrewSummary: () => {
						type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.CREATE_CREW_SUMMARY;
					};
					updateCrewSummary: (crew_summary: WorkersLog.WorkTimeEvidence.Crew.Payload.CrewSummary | null) => {
						type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.UPDATE_CREW_SUMMARY;
						payload: { crew_summary: typeof crew_summary };
					};
					cleanSummary: () => {
						type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.CLEAN_SUMMARY;
					};
				}

				export type Actions = ReturnTypeFromInterface<WorkersLog.WorkTimeEvidence.Crew.Redux.IActions>;
				export enum Types {
					FETCH_START = 'workers_log__FETCH_CREW_START',
					FETCH_END = 'workers_log__FETCH_CREW_END',
					FETCH_ERROR = 'workers_log__FETCH_CREW_ERROR',

					FETCH_CREW_SUMMARIES_START = 'workers_log__FETCH_CREW_SUMMARIES_START',
					FETCH_CREW_SUMMARIES_END = 'workers_log__FETCH_CREW_SUMMARIES_END',
					FETCH_CREW_SUMMARIES_ERROR = 'workers_log__FETCH_CREW_SUMMARIES_ERROR',

					CLEAN_SUMMARY = 'workers_log__CREW__CLEAN_SUMMARY',

					CHOOSE = 'workers_log__CHOOSE_CREW',
					DELETE_INIT = 'workers_log__DELETE_INIT',
					DELETE_FINISH = 'workers_log__DELETE_FINISH',
					ADD = 'workers_log__ADD_CREW',

					UPDATE_CREW_SUMMARY = 'workers_log__UPDATE_CREW_SUMMARY',
					CREATE_CREW_SUMMARY = 'workers_log__CREATE_CREW_SUMMARY',
				}
			}
		}
		export namespace General {
			export namespace Payload {
				export enum ERaportType {
					Financial = 'financial',
					Hourly = 'hourly',
				}
				export interface ICalendarByDate {
					[key: string]: {
						date: string;
						is_holiday: boolean;
					};
				}
			}
			export namespace Redux {
				export interface Store {
					worker_type: null | WORKERS_LOG__WORKERS_TYPE;
					calendar: {
						by_date: WorkersLog.WorkTimeEvidence.General.Payload.ICalendarByDate | null;
						view_range: {
							start: string;
							end: string;
						} | null;
					};
				}
				export interface IActions {
					StartComponent: () => {
						type: typeof WorkersLog.WorkTimeEvidence.General.Redux.Types.START;
					};
					EndComponent: () => {
						type: typeof WorkersLog.WorkTimeEvidence.General.Redux.Types.END;
					};

					selectWorkerType: (worker_type: WORKERS_LOG__WORKERS_TYPE) => {
						type: typeof WorkersLog.WorkTimeEvidence.General.Redux.Types.SELECT_WORKER_TYPE;
						payload: { worker_type: typeof worker_type };
					};

					setCalendar: (days: Dayjs[]) => {
						type: typeof WorkersLog.WorkTimeEvidence.General.Redux.Types.SET_CALENDAR;
						payload: { days: typeof days };
					};

					generateRaportStart: (type: WorkersLog.WorkTimeEvidence.General.Payload.ERaportType) => {
						type: typeof WorkersLog.WorkTimeEvidence.General.Redux.Types.GENERATE_RAPORT_START;
						payload: {
							type: typeof type;
						};
					};
				}
				export type Actions = ReturnTypeFromInterface<WorkersLog.WorkTimeEvidence.General.Redux.IActions>;
				export enum Types {
					START = 'workers_log__workTimeEvidence__START',
					END = 'workers_log__workTimeEvidence__END',
					SELECT_WORKER_TYPE = 'workers_log__workTimeEvidence__SELECT_WORKER_TYPE',
					SET_DATE_RANGE = 'workers_log__workTimeEvidence__SET_DATE_RANGE',
					SET_CALENDAR = 'workers_log__workTimeEvidence__SET_CALENDAR',
					GENERATE_RAPORT_START = 'workers_log__workTimeEvidence__GENERATE_RAPORT_START',
					GENERATE_RAPORT_END = 'workers_log__workTimeEvidence__GENERATE_RAPORT_END',
				}
			}
		}
		export namespace TimeEvidence {
			export namespace Payload {
				export interface ISummaryByDate {
					[date: string]: number;
				}
				export interface IEvidencesByDate {
					[date: string]: string[];
				}
				export interface ISummaryByWorker {
					[worker_id: string]: number;
				}
				export interface IEvidencesByWorker {
					[worker_id: string]: string[];
				}
				export enum EditingMode {
					BY_DATE = 'BY_DATE',
					BY_WORKER = 'BY_WORKER',
					BY_BOTH = 'BY_BOTH',
				}

				export interface EditingData {
					mode: EditingMode;
					coordinates: string | { worker: string; date: string };
				}

				export interface IEvidenceByDate {
					[date: string]: WorkersLogWorkTimeEvidenceResponse['id'];
				}

				export interface IBlockedData {
					by_worker: {
						[id: string]: {
							by_date: {
								[date: string]: Project['id'];
							};
						};
					};
				}

				export interface GetWorkerTimeEvidenceResponse {
					workersLogWorkTimeEvidences: WorkersLogWorkTimeEvidenceResponse[];
				}

				export interface WorkersLogWorkTimeEvidenceResponse {
					id: string;
					date: string;
					worked_time: number;
					project: Project;
				}

				export interface Project {
					id: string;
				}

				export interface UpdateWorkerTimePayload {
					date: string;
					worker: string;
					project: string;
					worked_time: number;
					filling_engineer: string;
					crew_summary: string;
				}

				export interface UpdateWorkerTimeSucceedResponse {
					id: number;
					date: string;
					worked_time: number;
					filling_engineer: { id: string };
					project: { id: string };
					worker: { id: string };
				}

				export interface UpdateWorkerTimeAbortedResponse {
					message: string;
				}
			}
			export namespace Redux {
				export interface Store {
					all: null | {
						[
							id: string
						]: WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.WorkersLogWorkTimeEvidenceResponse;
					};
					all_by_workers: null | WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.IEvidencesByWorker;
					all_by_days: null | WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.IEvidencesByDate;
					work_evidence: {
						by_worker: {
							[id: string]: {
								by_date: WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.IEvidenceByDate | null;
							};
						};
					} | null;
					summary: {
						by_dates: null | WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.ISummaryByDate;
						by_workers: null | WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.ISummaryByWorker;
					};
					loading: boolean;
					editing: WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.EditingData | null;
					blocked: null | WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.IBlockedData;
				}
				export interface IActions {
					setInitial: () => {
						type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.SET_INITIAL;
					};
					fetchWorkerWorkEvidenceStart: (worker_id: string[]) => {
						type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.FETCH_WORKER_TIME_EVIDENCE_START;
						payload: { worker_id: typeof worker_id };
					};
					fetchWorkerWorkEvidenceEnd: (
						worker_id: string,
						workTimeEvidences: WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.WorkersLogWorkTimeEvidenceResponse[],
					) => {
						type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.FETCH_WORKER_TIME_EVIDENCE_END;
						payload: { worker_id: typeof worker_id; workTimeEvidences: typeof workTimeEvidences };
					};
					fetchWorkerWorkEvidenceFinish: () => {
						type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.FETCH_WORKER_TIME_EVIDENCE_FINISH_ALL;
					};
					editingStart: (data: WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.EditingData) => {
						type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_START;
						payload: { data: typeof data };
					};
					editingWorkedTimeInit: (
						worker: string,
						date: string,
						hours: number,
					) => {
						type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_WORKED_TIME_INIT;
						payload: {
							worker: typeof worker;
							date: typeof date;
							hours: typeof hours;
						};
					};
					editingWorkedTimeSucceed: (
						data: WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.UpdateWorkerTimeSucceedResponse,
						worker_id: string,
					) => {
						type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_WORKED_TIME_SUCCEED;
						payload: { data: typeof data; worker_id: typeof worker_id };
					};
					editingWorkedTimeAborted: (
						data: WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.UpdateWorkerTimeAbortedResponse,
						worker_id: string,
					) => {
						type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_WORKED_TIME_ABORTED;
						payload: { data: typeof data; worker_id: typeof worker_id };
					};
					editingCancel: () => {
						type: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_CANCEL;
					};
				}
				export type Actions = ReturnTypeFromInterface<WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions>;
				export enum Types {
					SET_INITIAL = 'workers_log__TIME_EVIDENCE__SET_INITIAL',

					FETCH_WORKER_TIME_EVIDENCE_START = 'workers_log__FETCH_WORKER_TIME_EVIDENCE_START',
					FETCH_WORKER_TIME_EVIDENCE_END = 'workers_log__FETCH_WORKER_TIME_EVIDENCE_END',
					FETCH_WORKER_TIME_EVIDENCE_FINISH_ALL = 'workers_log__FETCH_WORKER_TIME_EVIDENCE_FINISH_ALL',
					FETCH_WORKER_TIME_EVIDENCE_ERROR = 'workers_log__FETCH_WORKER_TIME_EVIDENCE_ERROR',

					EDITING_START = 'workers_log__EDITING_START',
					EDITING_WORKED_TIME_INIT = 'workers_log__EDITING_WORKED_TIME_INIT',
					EDITING_WORKED_TIME_SUCCEED = 'workers_log__EDITING_WORKED_TIME_SUCCEED',
					EDITING_WORKED_TIME_ABORTED = 'workers_log__EDITING_WORKED_TIME_ABORTED',
					EDITING_CANCEL = 'workers_log__EDITING_CANCEL',
					EDITING_END = 'workers_log__EDITING_END',
				}
			}
		}
		export namespace Worker {
			export namespace Redux {
				export interface Store {
					all: null | { [key: string]: WorkersLog.WorkTimeEvidence.Worker.Payload.WorkerPayload };
					loading: boolean;
					loading_map: boolean;
					loading_workers: boolean;
					warbud_workers_map: null | {
						[key: string]: WorkersLog.WorkTimeEvidence.Worker.Payload.IWarbudWorkerMapData;
					};
				}

				export interface IActions {
					fetchWorkersStart: () => {
						type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.FETCH_WORKERS_START;
					};
					fetchWorkersEnd: (workers: {
						[key: string]: WorkersLog.WorkTimeEvidence.Worker.Payload.WorkerPayload;
					}) => {
						type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.FETCH_WORKERS_END;
						payload: { workers: typeof workers };
					};
					createWorker: (worker: { name: string; worker_type: WORKERS_LOG__WORKERS_TYPE }) => {
						type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.CREATE;
						payload: { worker: typeof worker };
					};
					addNewWorker: (worker: WorkersLog.WorkTimeEvidence.Worker.Payload.WorkerPayload) => {
						type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.ADD_NEW;
						payload: typeof worker;
					};
					addWorker: (workerID: WorkersLog.WorkTimeEvidence.Worker.Payload.WorkerPayload['id']) => {
						type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.ADD;
						payload: { worker: typeof workerID };
					};
					deleteWorker: (workerID: WorkersLog.WorkTimeEvidence.Worker.Payload.WorkerPayload['id']) => {
						type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.DELETE;
						payload: typeof workerID;
					};
					copyWorkersToCrew: (
						workerIDList: WorkersLog.WorkTimeEvidence.Worker.Payload.WorkerPayload['id'][],
					) => {
						type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.COPY_WORKERS;
						payload: typeof workerIDList;
					};
					fetchWorkersMapStart: () => {
						type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.FETCH_WORKERS_MAP_START;
					};
					fetchWorkersMapEnd: (workers: {
						[key: string]: WorkersLog.WorkTimeEvidence.Worker.Payload.IWarbudWorkerMapData;
					}) => {
						type: WorkersLog.WorkTimeEvidence.Worker.Redux.Types.FETCH_WORKERS_MAP_END;
						payload: {
							workers: typeof workers;
						};
					};
				}

				export type Actions = ReturnTypeFromInterface<WorkersLog.WorkTimeEvidence.Worker.Redux.IActions>;
				export enum Types {
					FETCH_WORKERS_START = 'workers_log__FETCH_WORKERS_START',
					FETCH_WORKERS_END = 'workers_log__FETCH_WORKERS_END',

					SET_ALL = 'workers_log__SET_ALL_WORKERS',
					ADD = 'workers_log__ADD_WORKER',
					ADD_NEW = 'workers_log__ADD_NEW_WORKER',
					CREATE = 'workers_log__CREATE',
					DELETE = 'workers_log__DELETE_WORKER',
					COPY_WORKERS = 'workers_log__COPY_WORKERS',
					SET_WORK_TIME = 'workers_log__SET_WORKER_WORK_TIME',

					FETCH_WORKERS_MAP_START = 'workers_log__FETCH_WORKERS_MAP_START',
					FETCH_WORKERS_MAP_END = 'workers_log__FETCH_WORKERS_MAP_END',
					FETCH_WORKERS_MAP_ERROR = 'workers_log__FETCH_WORKERS_MAP_ERROR',
				}
			}
			export namespace Payload {
				export interface WorkerPayload {
					id: string;
					name: null | string;
					is_house_worker: boolean;
					warbud_id: string | null;
				}

				export interface IWarbudWorkersMap {
					data: IWarbudWorkerMapData[];
					count: number;
				}
				export interface IWarbudWorkerMapData {
					EmplId: string;
					Nazwa: string;
				}

				export interface WorkersLogWorkersData {
					workersLogWorkers: WorkersLogWorker[];
				}

				export interface WorkersLogWorker {
					id: string;
					warbud_id: string;
					is_house_worker: boolean;
					name?: string;
				}

				export interface WorkersLogCrewsData {
					workersLogCrews: WorkersLogCrew[];
				}

				export interface WorkersLogCrew {
					id: string;
					name: string;
					workers_type?: WORKER_TYPES;
				}
			}
		}
	}
}

export default WorkersLog;
