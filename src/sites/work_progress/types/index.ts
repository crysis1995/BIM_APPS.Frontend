import { ReturnTypeFromInterface } from '../../../types/ReturnTypeFromInterface';
import { Constants } from '../redux/constants';
import { CMSLoginType } from '../../../components/CMSLogin/type';
import { GetProjectRotationDaysType } from '../../../services/graphql.api.service/CONSTANTS/Queries/GetProjectRotationDays';
import { GetObjectsByLevelType } from '../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import { GetAllDelacCausesType } from '../../../services/graphql.api.service/CONSTANTS/Queries/GetAllDelayCauses';
import { GetAllAcceptanceTermsType } from '../../../services/graphql.api.service/CONSTANTS/Queries/GetAcceptanceTerms';
import { UpdateTermType } from '../../../services/graphql.api.service/CONSTANTS/Mutations/UpdateTerm';
import { GetPrefabricatedObjectsType } from '../../../services/graphql.api.service/CONSTANTS/Queries/GetPrefabObjects';
import { GetPrefabObjectsStatusesType } from '../../../services/graphql.api.service/CONSTANTS/Queries/GetPrefabObjectsStatuses';
import { QueryAcceptanceObjectsType } from '../../../services/graphql.api.service/CONSTANTS/Queries/QueryAcceptanceObjects';
import { CreateStatusType } from '../../../services/graphql.api.service/CONSTANTS/Mutations/CreateStatus';

namespace WorkProgress {
	export namespace General {
		export namespace Redux {
			export interface IStore {}
			export interface IActions {
				SetInitial: () => {
					type: typeof WorkProgress.General.Redux.Types.SET_INITIAL;
				};
			}
			export type Actions = ReturnTypeFromInterface<WorkProgress.General.Redux.IActions>;
			export enum Types {
				SET_INITIAL = 'work_progress__SET_INITIAL',
			}
		}
	}
	export namespace Monolithic {
		export namespace Delays {
			export namespace Redux {
				export interface IStore {
					delay_causes: null | WorkProgress.Monolithic.Delays.Payload.DelaysTreeOutput[];
					delay_causes_all: null | {
						[key: string]: GetAllDelacCausesType.AcceptanceDelayCause;
					};
					delay_causes_loading: boolean;
				}
				export interface IActions {
					SetInitial: () => {
						type: typeof WorkProgress.Monolithic.Delays.Redux.Types.SET_INITIAL;
					};
					CreateNew: (data: WorkProgress.Monolithic.Delays.Payload.CreateNew_Payload[]) => {
						type: typeof WorkProgress.Monolithic.Delays.Redux.Types.DELAYS_CREATE_NEW;
						payload: typeof data;
					};
					InitCreateNew: (data: WorkProgress.Monolithic.Delays.Payload.InitCreateNew_Payload) => {
						type: typeof WorkProgress.Monolithic.Delays.Redux.Types.DELAYS_CREATE_NEW_INIT;
						payload: typeof data;
					};
					FetchStart: () => {
						type: typeof WorkProgress.Monolithic.Delays.Redux.Types.DELAYS_FETCH_CAUSES_START;
					};
					FetchEnd: (data: GetAllDelacCausesType.AcceptanceDelayCause[]) => {
						type: typeof WorkProgress.Monolithic.Delays.Redux.Types.DELAYS_FETCH_CAUSES_END;
						payload: typeof data;
					};
				}
				export type Actions = ReturnTypeFromInterface<WorkProgress.Monolithic.Delays.Redux.IActions>;
				export enum Types {
					SET_INITIAL = 'work_progress__monolithic__delays__SET_INITIAL',
					DELAYS_CREATE_NEW = 'work_progress__monolithic__delays__CREATE_NEW',
					DELAYS_CREATE_NEW_INIT = 'work_progress__monolithic__delays__CREATE_NEW_INIT',
					DELAYS_FETCH_CAUSES_START = 'work_progress__monolithic__delays__FETCH_CAUSES_START',
					DELAYS_FETCH_CAUSES_END = 'work_progress__monolithic__delays__FETCH_CAUSES_END',
					DELAYS_UPDATE_EXIST = 'work_progress__monolithic__delays__UPDATE_EXIST',
				}
			}
			export namespace Payload {
				export interface DelaysTreeOutput {
					id: string;
					label: string;
					children: DelaysTreeOutput[] | null;
				}
				export interface CreateNew_Payload {
					id: string;
				}
				export interface InitCreateNew_Payload {
					level_id: string;
					selected_cases: string[];
					commentary: string;
					date: string;
				}
				export interface DelayCauses_Store {
					id: string;
				}
			}
		}
		export namespace General {
			export namespace Payload {
				export type SetLevelOptions = { [key: string]: CMSLoginType.Payload.Level };
				export type SetCraneOptions = { [key: string]: CMSLoginType.Payload.Crane };
				export type ChangeLevel = CMSLoginType.Payload.Level['id'] | null;
				export type FetchRotationDaysEnd = GetProjectRotationDaysType.WarbudProjectRotationDay[];
			}
			export namespace Redux {
				export interface IStore {
					active: boolean;
					cranes: null | { [key: string]: CMSLoginType.Payload.Crane };
					cranes_loading: boolean;
					levels: null | { [key: string]: CMSLoginType.Payload.Level };
					active_level: null | string;
					levels_loading: boolean;
					date: string;
					rotation_day: number;
					validRotationDay: boolean;
					active_tab: Constants.MonolithicTabs;
					calendar_by_rotation_days: null | {
						[rotationDay: string]: GetProjectRotationDaysType.WarbudProjectRotationDay['id'];
					};
					calendar_by_dates: null | {
						[date: string]: GetProjectRotationDaysType.WarbudProjectRotationDay['id'];
					};
					calendar_all: null | { [key: string]: GetProjectRotationDaysType.WarbudProjectRotationDay };
					calendar_loading: boolean;
				}
				export interface IActions {
					ComponentStart: () => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.COMPONENT_STARTED;
					};
					ComponentEnd: () => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.COMPONENT_ENDED;
					};
					SetInitial: () => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.SET_INITIAL;
					};

					SetCraneOptions: (data: WorkProgress.Monolithic.General.Payload.SetCraneOptions) => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.SET_CRANE_OPTIONS;
						payload: typeof data;
					};
					SetLevelOptions: (data: WorkProgress.Monolithic.General.Payload.SetLevelOptions) => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.SET_LEVEL_OPTIONS;
						payload: typeof data;
					};
					ChangeLevel: (data: WorkProgress.Monolithic.General.Payload.ChangeLevel) => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.SET_LEVEL;
						payload: typeof data;
					};
					FetchRotationDaysStart: () => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.FETCH_CALENDAR_START;
					};
					FetchRotationDaysEnd: (data: WorkProgress.Monolithic.General.Payload.FetchRotationDaysEnd) => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.FETCH_CALENDAR_END;
						payload: typeof data;
					};
					IncrementDay: () => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.INCREMENT_DAY;
					};
					DecrementDay: () => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.DECREMENT_DAY;
					};
					SetRotationDay: (data: number) => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.SET_ROTATION_DAY;
						payload: typeof data;
					};
					TrySetRotationDay: (data: number) => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.TRY_SET_ROTATION_DAY;
						payload: typeof data;
					};
					SetDate: (data: string) => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.SET_DATE;
						payload: typeof data;
					};
					TrySetDate: (data: string) => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.TRY_SET_DATE;
						payload: typeof data;
					};
					SetActiveTab: (data: Constants.MonolithicTabs) => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.SET_ACTIVE_TAB;
						payload: typeof data;
					};
					IsValidDatesPair: (data: boolean) => {
						type: typeof WorkProgress.Monolithic.General.Redux.Types.IS_VALID_DATES_PAIR;
						payload: typeof data;
					};
				}
				export type Actions = ReturnTypeFromInterface<WorkProgress.Monolithic.General.Redux.IActions>;
				export enum Types {
					COMPONENT_STARTED = 'work_progress__monolithic__general__COMPONENT_STARTED',
					COMPONENT_ENDED = 'work_progress__monolithic__general__COMPONENT_ENDED',
					SET_INITIAL = 'work_progress__monolithic__general__SET_INITIAL',
					SET_ACTIVE_TAB = 'work_progress__monolithic__general__SET_ACTIVE_TAB',
					CHANGE_VISIBILITY_UNITED_JOBS = 'work_progress__monolithic__general__CHANGE_VISIBILITY_UNITED_JOBS',
					CHANGE_VISIBILITY_DIFFERENTIAL_JOBS = 'work_progress__monolithic__general__CHANGE_VISIBILITY_DIFFERENTIAL_JOBS',
					CHANGE_UPGRADING_BY_TYPE = 'work_progress__monolithic__general__CHANGE_UPGRADING_BY_TYPE',
					SET_ACCEPTANCE_TYPE = 'work_progress__monolithic__general__SET_ACCEPTANCE_TYPE',
					FETCH_CRANE_START = 'work_progress__monolithic__general__FETCH_CRANE_START',
					FETCH_CRANE_END = 'work_progress__monolithic__general__FETCH_CRANE_END',
					FETCH_CRANE_ERROR = 'work_progress__monolithic__general__FETCH_CRANE_ERROR',
					SET_CRANE_OPTIONS = 'work_progress__monolithic__general__SET_CRANE_OPTIONS',
					SET_LEVEL = 'work_progress__monolithic__general__SET_LEVEL',
					SET_LEVEL_OPTIONS = 'work_progress__monolithic__general__SET_LEVEL_OPTIONS',
					INCREMENT_DAY = 'work_progress__monolithic__general__INCREMENT_DAY',
					DECREMENT_DAY = 'work_progress__monolithic__general__DECREMENT_DAY',
					SET_DATE = 'work_progress__monolithic__general__SET_DATE',
					TRY_SET_DATE = 'work_progress__monolithic__general__TRY_SET_DATE',
					SET_ROTATION_DAY = 'work_progress__monolithic__general__SET_ROTATION_DAY',
					TRY_SET_ROTATION_DAY = 'work_progress__monolithic__general__TRY_SET_ROTATION_DAY',
					SET_INITIAL_ROTATION_DAY = 'work_progress__monolithic__general__SET_INITIAL_ROTATION_DAY',
					// SET_ACTUAL_TAB = 'work_progress__monolithic__general__SET_ACTUAL_TAB',
					FETCH_STATUSES_START = 'work_progress__monolithic__general__FETCH_STATUSES_START',
					FETCH_STATUSES_END = 'work_progress__monolithic__general__FETCH_STATUSES_END',
					FETCH_STATUSES_ERROR = 'work_progress__monolithic__general__FETCH_STATUSES_ERROR',
					FETCH_CALENDAR_START = 'work_progress__monolithic__general__FETCH_CALENDAR_START',
					FETCH_CALENDAR_END = 'work_progress__monolithic__general__FETCH_CALENDAR_END',
					// ACCEPTANCE_MONOLITHIC_INIT = 'ACCEPTANCE_MONOLITHIC_INIT',
					IS_VALID_DATES_PAIR = 'work_progress__monolithic__general__IS_VALID_DATES_PAIR',
				}
			}
		}
		export namespace Objects {
			export namespace Redux {
				export interface IStore {
					objects: null | WorkProgress.Monolithic.Objects.Payload.Objects_Store;
					objects_loading: boolean;
				}
				export interface IActions {
					FetchStart: () => {
						type: typeof WorkProgress.Monolithic.Objects.Redux.Types.OBJECTS_LOADING_START;
					};
					FetchEnd: (data: GetObjectsByLevelType.AcceptanceObject[]) => {
						type: typeof WorkProgress.Monolithic.Objects.Redux.Types.OBJECTS_LOADING_END;
						payload: typeof data;
					};
					SetInitial: () => {
						type: typeof WorkProgress.Monolithic.Objects.Redux.Types.OBJECTS_SET_INITIAL;
					};
					SetFetchedData: (data: WorkProgress.Monolithic.Objects.Payload.SetFetchedData_Payload) => {
						type: typeof WorkProgress.Monolithic.Objects.Redux.Types.OBJECTS_SET_DATA;
						payload: typeof data;
					};
				}
				export type Actions = ReturnTypeFromInterface<WorkProgress.Monolithic.Objects.Redux.IActions>;
				export enum Types {
					OBJECTS_LOADING_START = 'work_progress__monolithic__objects__LOADING_START',
					// OBJECTS_LOADING_ERROR = 'work_progress__monolithic__objects__LOADING_ERROR',
					OBJECTS_LOADING_END = 'work_progress__monolithic__objects__LOADING_END',
					OBJECTS_SET_DATA = 'work_progress__monolithic__objects__SET_DATA',
					OBJECTS_SET_INITIAL = 'work_progress__monolithic__objects__SET_INITIAL',
				}
			}
			export namespace Payload {
				export interface SetFetchedData_Payload {}
				export type Objects_Store = {
					[key: string]: GetObjectsByLevelType.AcceptanceObject;
				};
			}
			export namespace StoreStructure {}
		}
		export namespace Terms {
			export namespace Redux {
				export interface IStore {
					loading: boolean;
					termsAll: null | {
						[key: string]: WorkProgress.Monolithic.Terms.Payload.FetchEnd[0];
					};
					termsNorm: null | WorkProgress.Monolithic.Terms.StoreStructure.Terms;
				}
				export interface IActions {
					SetInitial: () => {
						type: typeof WorkProgress.Monolithic.Terms.Redux.Types.SET_INITIAL;
					};
					FetchStart: () => {
						type: typeof WorkProgress.Monolithic.Terms.Redux.Types.TERMS_FETCH_START;
					};
					FetchEnd: (data: WorkProgress.Monolithic.Terms.Payload.FetchEnd) => {
						type: typeof WorkProgress.Monolithic.Terms.Redux.Types.TERMS_FETCH_END;
						payload: typeof data;
					};
					SetTermsByGroupInit: (data: WorkProgress.Monolithic.Terms.Payload.SetTermsByGroupInit) => {
						type: typeof WorkProgress.Monolithic.Terms.Redux.Types.SET_BY_GROUP_INIT;
						payload: typeof data;
					};
					SetTermByGroup: (data: WorkProgress.Monolithic.Terms.Payload.SetTermByGroup) => {
						type: typeof WorkProgress.Monolithic.Terms.Redux.Types.SET_BY_GROUP;
						payload: typeof data;
					};
					UpdateTermsByGroupInit: (data: WorkProgress.Monolithic.Terms.Payload.UpdateTermsByGroupInit) => {
						type: typeof WorkProgress.Monolithic.Terms.Redux.Types.UPDATE_BY_GROUP_INIT;
						payload: typeof data;
					};
					UpdateTermsByGroup: (data: WorkProgress.Monolithic.Terms.Payload.UpdateTermsByGroup) => {
						type: typeof WorkProgress.Monolithic.Terms.Redux.Types.UPDATE_BY_GROUP;
						payload: typeof data;
					};
				}
				export type Actions = ReturnTypeFromInterface<WorkProgress.Monolithic.Terms.Redux.IActions>;
				export enum Types {
					SET_INITIAL = 'work_progress__monolithic__terms__SET_INITIAL',
					SET_BY_GROUP = 'work_progress__monolithic__terms__SET_BY_GROUP',
					SET_BY_GROUP_INIT = 'work_progress__monolithic__terms__SET_BY_GROUP_INIT',
					UPDATE_BY_GROUP = 'work_progress__monolithic__terms__UPDATE_BY_GROUP',
					UPDATE_BY_GROUP_INIT = 'work_progress__monolithic__terms__UPDATE_BY_GROUP_INIT',
					TERMS_FETCH_START = 'work_progress__monolithic__terms__FETCH_START',
					TERMS_FETCH_END = 'work_progress__monolithic__terms__FETCH_END',
				}
			}
			export namespace Payload {
				export interface DataFetchEnd {}
				export type FetchEnd = GetAllAcceptanceTermsType.AcceptanceTerm[];
				export interface SetTermsByGroupInit {
					term_id: string;
					REAL_START?: string;
					REAL_FINISH?: string;
					PLANNED_START_BP?: string;
					PLANNED_FINISH_BP?: string;
					PLANNED_START?: string;
					PLANNED_FINISH?: string;
				}

				export interface SetTermByGroup {}
				export interface UpdateTermsByGroupInit {
					crane: string;
					vertical: GetAllAcceptanceTermsType.Vertical;
					level: string;
					toUpdate: {
						[key in Constants.TermTypes]?: string;
					};
				}
				export type UpdateTermsByGroup = UpdateTermType.AcceptanceTerm;
			}
			export namespace StoreStructure {
				export type Terms = {
					byLevel: ByLevel;
				};
				export type ByLevel = {
					[key: string]: { byVertical: ByVertical };
				};
				export type ByVertical = {
					[key: string]: { byCrane: ByCrane };
				};
				export type ByCrane = {
					[key: string]: string;
				};
			}
		}
		export namespace Upgrading {
			export namespace Redux {
				export interface IStore {
					loading: boolean;
					fetchedByLevel: { true: string[]; false: string[] };
					byRevitId: null | WorkProgress.Monolithic.Upgrading.StoreStructure.ByRevitId;
					byRevitIdWithStatuses: null | WorkProgress.Monolithic.Upgrading.StoreStructure.ByRevitIdWithStatus;
					actualElements: WorkProgress.Monolithic.Upgrading.StoreStructure.ActualElements;
					selectedElements: WorkProgress.Monolithic.Upgrading.StoreStructure.SelectedElements;
					byLevel: null | WorkProgress.Monolithic.Upgrading.StoreStructure.ByLevel;
				}
				export interface IActions {
					SetInitial: () => {
						type: typeof WorkProgress.Monolithic.Upgrading.Redux.Types.SET_INITIAL;
					};
					SetActualElements: (
						actualElements: WorkProgress.Monolithic.Upgrading.Payload.SetActualElements,
						elementsWithStatuses?: WorkProgress.Monolithic.Upgrading.Payload.ElementsWithStatus,
					) => {
						type: typeof WorkProgress.Monolithic.Upgrading.Redux.Types.SET_ACTUAL_ELEMENTS;
						payload: {
							actualElements: typeof actualElements;
							elementsWithStatuses: typeof elementsWithStatuses;
						};
					};
					FetchStart: () => {
						type: typeof WorkProgress.Monolithic.Upgrading.Redux.Types.FETCH_START;
					};
					FetchEnd: (
						data: WorkProgress.Monolithic.Upgrading.Payload.FetchEnd,
						byLevel: string,
					) => {
						type: typeof WorkProgress.Monolithic.Upgrading.Redux.Types.FETCH_END;
						payload: {
							data: typeof data;
							byLevel: typeof byLevel;
						};
					};
					SelectElements: (data: WorkProgress.Monolithic.Upgrading.Payload.SelectElements) => {
						type: typeof WorkProgress.Monolithic.Upgrading.Redux.Types.SELECT_ELEMENTS;
						payload: typeof data;
					};
					HandleSelectElements: (data: GetObjectsByLevelType.AcceptanceObject['revit_id'][]) => {
						type: typeof WorkProgress.Monolithic.Upgrading.Redux.Types.HANDLE_SELECTED_ELEMENTS;
						payload: typeof data;
					};
					SetStatus: (
						data: WorkProgress.Monolithic.Upgrading.Payload.SetStatuses,
						revitID: GetObjectsByLevelType.AcceptanceObject['revit_id'],
					) => {
						type: typeof WorkProgress.Monolithic.Upgrading.Redux.Types.SET_STATUSES;
						payload: {
							status: typeof data;
							revitID: typeof revitID;
						};
					};
					SetStatusesStart: () => {
						type: typeof WorkProgress.Monolithic.Upgrading.Redux.Types.SET_STATUSES_START;
					};
					SetStatusesEnd: () => {
						type: typeof WorkProgress.Monolithic.Upgrading.Redux.Types.SET_STATUSES_END;
					};

					SetStatusesInit: (data: WorkProgress.Monolithic.Upgrading.Payload.SetStatusesInit) => {
						type: typeof WorkProgress.Monolithic.Upgrading.Redux.Types.SET_STATUSES_INITIALIZER;
						payload: typeof data;
					};
					CheckObjectsGroupTerms: (
						data: WorkProgress.Monolithic.Upgrading.Payload.CheckObjectsGroupTerms,
					) => {
						type: typeof WorkProgress.Monolithic.Upgrading.Redux.Types.CHECK_OBJECT_GROUP_TERMS;
						payload: typeof data;
					};
					HandleSetCurrentElement: () => {
						type: typeof WorkProgress.Monolithic.Upgrading.Redux.Types.HANDLE_SET_CURRENT_ELEMENTS;
					};
				}
				export type Actions = ReturnTypeFromInterface<WorkProgress.Monolithic.Upgrading.Redux.IActions>;
				export enum Types {
					HANDLE_SET_CURRENT_ELEMENTS = 'work_progress__monolithic__upgrading__HANDLE_SET_CURRENT_ELEMENTS',
					SET_INITIAL = 'work_progress__monolithic__upgrading__SET_INITIAL',
					FETCH_START = 'work_progress__monolithic__upgrading__FETCH_START',
					FETCH_END = 'work_progress__monolithic__upgrading__FETCH_END',
					SET_ACTUAL_ELEMENTS = 'work_progress__monolithic__upgrading__SET_ACTUAL_ELEMENTS',
					SELECT_ELEMENTS = 'work_progress__monolithic__upgrading__SELECT_ELEMENTS',
					HANDLE_SELECTED_ELEMENTS = 'work_progress__monolithic__upgrading__HANDLE_SELECTED_ELEMENTS',
					SET_STATUSES = 'work_progress__monolithic__upgrading__SET_STATUSES',
					SET_STATUSES_INITIALIZER = 'work_progress__monolithic__upgrading__SET_STATUSES_INITIALIZER',
					SET_STATUSES_START = 'work_progress__monolithic__upgrading__SET_STATUSES_START',
					SET_STATUSES_END = 'work_progress__monolithic__upgrading__SET_STATUSES_END',
					CHECK_OBJECT_GROUP_TERMS = 'work_progress__monolithic__upgrading__CHECK_OBJECT_GROUP_TERMS',
				}
			}
			export namespace Payload {
				export type SetActualElements = GetObjectsByLevelType.AcceptanceObject['revit_id'][];
				export type ElementsWithStatus = { [key: string]: Constants.WorkProgressElementStatus };
				export type FetchEnd = GetObjectsByLevelType.AcceptanceObject[];
				export type SelectElements =
					| GetObjectsByLevelType.AcceptanceObject['revit_id']
					| GetObjectsByLevelType.AcceptanceObject['revit_id'][];
				export type SetStatuses = GetObjectsByLevelType.Status;
				export interface SetStatusesInit {
					selectedElements: GetObjectsByLevelType.AcceptanceObject['revit_id'][];
					status: GetObjectsByLevelType.StatusEnum;
					date: string;
				}
				export type CheckObjectsGroupTerms = GetObjectsByLevelType.AcceptanceObject['revit_id'][];
			}
			export namespace StoreStructure {
				export type ByRevitId = {
					[key: string]: GetObjectsByLevelType.AcceptanceObject;
				};
				export type ByRevitIdWithStatus = {
					[key: string]: Constants.WorkProgressElementStatus;
				};
				export type ActualElements = GetObjectsByLevelType.AcceptanceObject['revit_id'][];
				export type SelectedElements = GetObjectsByLevelType.AcceptanceObject['revit_id'][];
				export type ByLevel = {
					[level_id: string]: { byVertical: ByVertical };
				};

				export type ByVertical = {
					[location in GetObjectsByLevelType.Vertical]: { byCrane: ByCrane };
				};

				export type ByCrane = {
					[crane_id: string]: GetObjectsByLevelType.AcceptanceObject['revit_id'][];
				};
			}
		}
	}
	export namespace Prefabricated {
		export namespace General {
			export namespace Redux {
				export interface IStore {
					isStatusOnModelVisible: boolean;
				}
				export interface IActions {
					ComponentStart: () => {
						type: typeof WorkProgress.Prefabricated.General.Redux.Types.COMPONENT_STARTED;
					};
					ComponentEnd: () => {
						type: typeof WorkProgress.Prefabricated.General.Redux.Types.COMPONENT_ENDED;
					};
					ChangeStatusOnModelVisibility: (value: boolean) => {
						type: typeof WorkProgress.Prefabricated.General.Redux.Types.CHANGE_STATUS_ON_MODEL_VISIBILITY;
						payload: typeof value;
					};
				}
				export type Actions = ReturnTypeFromInterface<WorkProgress.Prefabricated.General.Redux.IActions>;
				export enum Types {
					COMPONENT_STARTED = 'work_progress__prefabricated__general__COMPONENT_STARTED',
					COMPONENT_ENDED = 'work_progress__prefabricated__general__COMPONENT_ENDED',
					CHANGE_STATUS_ON_MODEL_VISIBILITY = 'work_progress__prefabricated__general__CHANGE_STATUS_ON_MODEL_VISIBILITY',
				}
			}
		}

		export namespace Objects {
			export namespace Redux {
				export interface IStore {
					selection: number[];
					focus: number[];
					objectsLoading: boolean;
					statusesLoading: boolean;
					byRevitID: null | {
						[key: string]: GetPrefabricatedObjectsType.AcceptanceObject;
					};
					statusesByRevitID: {
						[key: string]: string[];
					} | null;
					statuesLoadingByRevitID: {
						[key: string]: boolean;
					} | null;
					allStatuses: {
						[key: string]: GetPrefabObjectsStatusesType.AcceptanceObjectStatus;
					} | null;
				}
				export interface IActions {
					FetchObjectsStart: () => {
						type: typeof WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_OBJECTS_START;
					};
					FetchObjectsEnd: (data: GetPrefabricatedObjectsType.AcceptanceObject[]) => {
						type: typeof WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_OBJECTS_END;
						payload: typeof data;
					};
					FetchObjectsError: (error: string) => {
						type: typeof WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_OBJECTS_ERROR;
						payload: typeof error;
					};
					FetchStatusesStart: () => {
						type: typeof WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_STATUSES_START;
					};
					FetchStatusesEnd: (data: GetPrefabObjectsStatusesType.AcceptanceObjectStatus[]) => {
						type: typeof WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_STATUSES_END;
						payload: typeof data;
					};
					FetchStatusesError: (error: string) => {
						type: typeof WorkProgress.Prefabricated.Objects.Redux.Types.FETCH_STATUSES_ERROR;
						payload: typeof error;
					};
					HandleSetStatuses: (
						prefabStatusEnum: GetPrefabObjectsStatusesType.PrefabStatusEnum,
						date: string,
						objects: GetPrefabricatedObjectsType.AcceptanceObject[],
					) => {
						type: typeof WorkProgress.Prefabricated.Objects.Redux.Types.HANDLE_SET_STATUSES;
						payload: {
							status: typeof prefabStatusEnum;
							date: typeof date;
							objects: typeof objects;
						};
					};
					SetStatusesStart: (revitID: number) => {
						type: typeof WorkProgress.Prefabricated.Objects.Redux.Types.SET_STATUSES_START;
						payload: typeof revitID;
					};
					SetStatusesFinish: (
						revitID: number,
						data: GetPrefabObjectsStatusesType.AcceptanceObjectStatus,
					) => {
						type: typeof WorkProgress.Prefabricated.Objects.Redux.Types.SET_STATUSES_FINISH;
						payload: {
							revitID: typeof revitID;
							data: typeof data;
						};
					};

					SelectElements: (revitID: number | number[]) => {
						type: typeof WorkProgress.Prefabricated.Objects.Redux.Types.SELECT_ELEMENTS;
						payload: typeof revitID;
					};
					HandleSelectElements: (revitID: number[]) => {
						type: typeof WorkProgress.Prefabricated.Objects.Redux.Types.HANDLE_SELECT_ELEMENTS;
						payload: typeof revitID;
					};
				}
				export type Actions = ReturnTypeFromInterface<WorkProgress.Prefabricated.Objects.Redux.IActions>;
				export enum Types {
					FETCH_OBJECTS_START = 'work_progress__prefabricated__objects__FETCH_OBJECTS_START',
					FETCH_OBJECTS_END = 'work_progress__prefabricated__objects__FETCH_OBJECTS_END',
					FETCH_OBJECTS_ERROR = 'work_progress__prefabricated__objects__FETCH_OBJECTS_ERROR',
					FETCH_STATUSES_START = 'work_progress__prefabricated__objects__FETCH_STATUSES_START',
					FETCH_STATUSES_END = 'work_progress__prefabricated__objects__FETCH_STATUSES_END',
					FETCH_STATUSES_ERROR = 'work_progress__prefabricated__objects__FETCH_STATUSES_ERROR',
					HANDLE_SET_STATUSES = 'work_progress__prefabricated__objects__HANDLE_SET_STATUSES',
					SET_STATUSES_START = 'work_progress__prefabricated__objects__SET_STATUSES_START',
					SET_STATUSES_FINISH = 'work_progress__prefabricated__objects__SET_STATUSES_FINISH',
					SELECT_ELEMENTS = 'work_progress__prefabricated__objects__SELECT_ELEMENTS',
					HANDLE_SELECT_ELEMENTS = 'work_progress__prefabricated__objects__HANDLE_SELECT_ELEMENTS',
				}
			}
		}
	}
	export namespace GeneralConstruction {
		export namespace General {
			export namespace Redux {
				export interface IStore {
					Active: boolean;
					ShowStatusesOnModel:boolean
				}
				export interface IActions {
					ComponentStart: () => {
						type: typeof WorkProgress.GeneralConstruction.General.Redux.Types.COMPONENT_STARTED;
					};
					ComponentEnd: () => {
						type: typeof WorkProgress.GeneralConstruction.General.Redux.Types.COMPONENT_ENDED;
					};
					ToggleStatusOnModelVisibility: () => {
						type: typeof WorkProgress.GeneralConstruction.General.Redux.Types.TOGGLE_STATUS_ON_MODEL_VISIBILITY;
					};
				}
				export type Actions = ReturnTypeFromInterface<WorkProgress.GeneralConstruction.General.Redux.IActions>;
				export enum Types {
					COMPONENT_STARTED = 'work_progress__general_construction__general__COMPONENT_STARTED',
					COMPONENT_ENDED = 'work_progress__general_construction__general__COMPONENT_ENDED',
					TOGGLE_STATUS_ON_MODEL_VISIBILITY = 'work_progress__general_construction__general__TOGGLE_STATUS_ON_MODEL_VISIBILITY',
				}
			}
		}
		export namespace Objects {
			export namespace Payload {
				export type SortingOptionsType = {
					asc: boolean;
					key: keyof QueryAcceptanceObjectsType.DataType;
				} | null;
			}
			export namespace Redux {
				export interface IStore {
					Selection: number[];
					ObjectsLoading: boolean;
					ObjectsByID: null | {
						[key: string]: QueryAcceptanceObjectsType.AcceptanceObject;
					};
					ObjectStatusLoading: { [key: string]: boolean };
					ObjectStatusAll: null | { [key: string]: GetObjectsByLevelType.Status };
					Sorting: WorkProgress.GeneralConstruction.Objects.Payload.SortingOptionsType;
				}
				export interface IActions {
					FetchObjectsStart: () => {
						type: typeof WorkProgress.GeneralConstruction.Objects.Redux.Types.FETCH_OBJECTS_START;
					};
					FetchObjectsEnd: (data: QueryAcceptanceObjectsType.AcceptanceObject[]) => {
						type: typeof WorkProgress.GeneralConstruction.Objects.Redux.Types.FETCH_OBJECTS_END;
						payload: typeof data;
					};
					SelectElements: (revitID: number | number[]) => {
						type: typeof WorkProgress.GeneralConstruction.Objects.Redux.Types.SELECT_ELEMENTS;
						payload: typeof revitID;
					};
					HandleSelectElements: (revitID: number[]) => {
						type: typeof WorkProgress.GeneralConstruction.Objects.Redux.Types.HANDLE_SELECT_ELEMENTS;
						payload: typeof revitID;
					};
					SetSortingOptions: (data: keyof QueryAcceptanceObjectsType.DataType) => {
						type: typeof WorkProgress.GeneralConstruction.Objects.Redux.Types.SET_SORTING_OPTIONS;
						payload: typeof data;
					};
					HandleSetStatuses: (
						StatusEnum: GetObjectsByLevelType.StatusEnum,
						date: string,
						objects: Pick<QueryAcceptanceObjectsType.AcceptanceObject, 'id' | 'revit_id'>[],
					) => {
						type: typeof WorkProgress.GeneralConstruction.Objects.Redux.Types.HANDLE_SET_STATUSES;
						payload: {
							status: typeof StatusEnum;
							date: typeof date;
							objects: typeof objects;
						};
					};
					SetStatusesStart: (revitID: number) => {
						type: typeof WorkProgress.GeneralConstruction.Objects.Redux.Types.SET_STATUSES_START;
						payload: typeof revitID;
					};
					SetStatusesFinish: (
						revitID: number,
						data: CreateStatusType.Status,
					) => {
						type: typeof WorkProgress.GeneralConstruction.Objects.Redux.Types.SET_STATUSES_FINISH;
						payload: {
							revitID: typeof revitID;
							data: typeof data;
						};
					};
				}
				export type Actions = ReturnTypeFromInterface<WorkProgress.GeneralConstruction.Objects.Redux.IActions>;
				export enum Types {
					SET_SORTING_OPTIONS = 'work_progress__general_construction__objects__SET_SORTING_OPTIONS',
					FETCH_OBJECTS_START = 'work_progress__general_construction__objects__FETCH_OBJECTS_START',
					FETCH_OBJECTS_END = 'work_progress__general_construction__objects__FETCH_OBJECTS_END',
					SELECT_ELEMENTS = 'work_progress__general_construction__objects__SELECT_ELEMENTS',
					HANDLE_SELECT_ELEMENTS = 'work_progress__general_construction__objects__HANDLE_SELECT_ELEMENTS',
					HANDLE_SET_STATUSES = 'work_progress__general_construction__objects__HANDLE_SET_STATUSES',
					SET_STATUSES_START = 'work_progress__general_construction__objects__SET_STATUSES_START',
					SET_STATUSES_FINISH = 'work_progress__general_construction__objects__SET_STATUSES_FINISH',
				}
			}
		}
	}
}
export default WorkProgress;
