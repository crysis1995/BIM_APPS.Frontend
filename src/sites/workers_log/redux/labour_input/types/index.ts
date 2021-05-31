import { ReturnTypeFromInterface } from '../../../../../types/ReturnTypeFromInterface';
import { CMSLoginType } from '../../../../../components/CMSLogin/type';
import dayjs from 'dayjs';
import {
	OTHER_WORK_TYPE,
	WORKERS_LOG__WORKERS_TYPE,
} from '../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';
import { GetStatusesType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetStatuses';
import { GetGroupedOtherWorksTimeEvidencesType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetGroupedOtherWorksTimeEvidences';

export namespace LabourInput {
	export namespace Redux {
		export namespace General {
			export interface Store {
				ActiveLevel: CMSLoginType.Payload.Level | null;
				ActualDate: string;
				ActiveWorkType: WORKERS_LOG__WORKERS_TYPE | null;
				ActualCrew: string | null;
				Statuses: null | { [key: string]: GetStatusesType.AcceptanceStatus };
				StatusesLoading: boolean;
				OtherWorks: null | { [key: string]: LabourInput.Payload.General.OtherWorksData };
				OtherWorksLoading: boolean;
			}

			export interface IActions {
				InitializeComponent: () => {
					type: typeof LabourInput.Redux.General.Types.INITIALIZE;
				};
				SetInitial: () => {
					type: typeof LabourInput.Redux.General.Types.SET_INITIAL;
				};
				ChooseLevel: (
					data: CMSLoginType.Payload.Level | null,
				) => {
					type: typeof LabourInput.Redux.General.Types.CHOOSE_LEVEL;
					payload: typeof data;
				};
				SetDate: (
					data: dayjs.Dayjs,
				) => {
					type: typeof LabourInput.Redux.General.Types.SET_DATE;
					payload: typeof data;
				};

				FetchStatusesStart: () => {
					type: typeof LabourInput.Redux.General.Types.FETCH_STATUSES_START;
				};
				FetchStatusesEnd: (statuses: {
					[key: string]: GetStatusesType.AcceptanceStatus;
				}) => {
					type: typeof LabourInput.Redux.General.Types.FETCH_STATUSES_END;
					payload: typeof statuses;
				};

				SelectWorkerType: (
					data: WORKERS_LOG__WORKERS_TYPE,
				) => {
					type: typeof LabourInput.Redux.General.Types.SELECT_WORKER_TYPE;
					payload: { data: typeof data };
				};

				SelectCrew: (
					data: string,
				) => {
					type: typeof LabourInput.Redux.General.Types.SELECT_CREW;
					payload: {
						data: typeof data;
					};
				};

				FetchOtherWorksStart: () => {
					type: typeof LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_START;
				};
				FetchOtherWorksEnd: (data: {
					[key: string]: LabourInput.Payload.General.OtherWorksData;
				}) => {
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
				FETCH_STATUSES_START = 'labour_input__FETCH_STATUSES_START',
				FETCH_STATUSES_END = 'labour_input__FETCH_STATUSES_END',
				SET_INITIAL = 'labour_input__SET_INITIAL',
				INITIALIZE = 'labour_input__INITIALIZE',
				FETCH_OTHER_WORKS_START = 'labour_input__FETCH_OTHER_WORKS_START',
				FETCH_OTHER_WORKS_END = 'labour_input__FETCH_OTHER_WORKS_END',
			}
		}
		export namespace Objects {
			export interface Store {
				AllObjects: null | { [key: string]: LabourInput.Payload.Objects.ObjectWithStatus };
				Loading: boolean;
				FilteredObjects: LabourInput.Payload.Objects.ObjectWithStatus['id'][];
				Selection: number[];
			}

			export interface IActions {
				FetchObjectsStart: () => {
					type: typeof LabourInput.Redux.Objects.Types.FETCH_OBJECTS_START;
				};
				FetchObjectsEnd: (data: {
					[key: string]: LabourInput.Payload.Objects.ObjectWithStatus;
				}) => {
					type: typeof LabourInput.Redux.Objects.Types.FETCH_OBJECTS_END;
					payload: typeof data;
				};
				SetFilteredObjects: (
					data: number[],
				) => {
					type: typeof LabourInput.Redux.Objects.Types.SET_FILTERED_OBJECTS;
					payload: typeof data;
				};

				SelectObject: (
					data: number | number[],
				) => {
					type: typeof LabourInput.Redux.Objects.Types.SELECT_OBJECT;
					payload: typeof data;
				};
			}

			export type Actions = ReturnTypeFromInterface<LabourInput.Redux.Objects.IActions>;

			export enum Types {
				FETCH_OBJECTS_START = 'labour_input__OBJECTS__FETCH_OBJECTS_START',
				FETCH_OBJECTS_END = 'labour_input__OBJECTS__FETCH_OBJECTS_END',
				SET_FILTERED_OBJECTS = 'labour_input__OBJECTS__SET_FILTERED_OBJECTS',
				SELECT_OBJECT = 'labour_input__SELECT_OBJECT',
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

				SetSummaryWorkTimeEnd: (
					data: number,
				) => {
					type: typeof LabourInput.Redux.TimeEvidence.Types.SET_SUMMARY_WORK_TIME_END;
					payload: typeof data;
				};

				FetchAllObjectTimeEvidenceStart: () => {
					type: typeof LabourInput.Redux.TimeEvidence.Types.FETCH_ALL_OBJECTS_TIME_EVIDENCE_START;
				};

				FetchAllObjectTimeEvidenceEnd: (
					data: LabourInput.Payload.TimeEvidence.ObjectTimeEvidence[],
				) => {
					type: typeof LabourInput.Redux.TimeEvidence.Types.FETCH_ALL_OBJECTS_TIME_EVIDENCE_END;
					payload: typeof data;
				};
				FetchObjectTimeEvidenceStart: (
					objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'],
				) => {
					type: typeof LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_START;
					payload: typeof objectID;
				};
				FetchObjectTimeEvidenceEnd: (
					data: LabourInput.Payload.TimeEvidence.ObjectTimeEvidence | null,
					objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'],
				) => {
					type: typeof LabourInput.Redux.TimeEvidence.Types.FETCH_OBJECT_TIME_EVIDENCE_END;
					payload: { data: typeof data; objectID: typeof objectID };
				};
				CreateOrUpdateObjectTimeEvidenceStart: (
					ObjectTimeEvidenceID: LabourInput.Payload.TimeEvidence.ObjectTimeEvidence['id'] | null,
					objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'],
					workedTime: number,
				) => {
					type: typeof LabourInput.Redux.TimeEvidence.Types.CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_START;
					payload: {
						ObjectTimeEvidenceID: typeof ObjectTimeEvidenceID;
						workedTime: typeof workedTime;
						objectID: typeof objectID;
					};
				};
				CreateOrUpdateObjectTimeEvidenceEnd: (
					data: LabourInput.Payload.TimeEvidence.ObjectTimeEvidence | null,
					objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'],
				) => {
					type: typeof LabourInput.Redux.TimeEvidence.Types.CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_END;
					payload: { data: typeof data; objectID: typeof objectID };
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

				CreateOtherWorkStart: (
					data: LabourInput.Payload.TimeEvidence.CreateOtherWorkPayload,
				) => {
					type: typeof LabourInput.Redux.TimeEvidence.Types.CREATE_OTHER_WORK_START;
					payload: typeof data;
				};
				CreateOtherWorkEnd: (
					data: LabourInput.Payload.TimeEvidence.OtherWorksTimeEvidence,
				) => {
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
				UpdateOtherWorkEnd: (
					data: LabourInput.Payload.TimeEvidence.OtherWorksTimeEvidence,
				) => {
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

				CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_START = 'labour_input__CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_START',
				CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_END = 'labour_input__CREATE_OR_UPDATE_OBJECT_TIME_EVIDENCE_END',

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
				status: number;
			}
		}
		export namespace TimeEvidence {
			export interface ObjectTimeEvidence {
				id: number | string;
				worked_time: number;
			}

			export interface CreateOtherWorkPayload {
				id: string | number;
				work_type: OTHER_WORK_TYPE;
			}

			export type GroupedOtherWorkTimeEvidence = GetGroupedOtherWorksTimeEvidencesType.WorkersLogGroupedOtherWorksTimeEvidence;
			export type OtherWorksTimeEvidence = GetGroupedOtherWorksTimeEvidencesType.OtherWorksTimeEvidence;
		}
	}
}
