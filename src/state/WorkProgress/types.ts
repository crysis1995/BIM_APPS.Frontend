// export module WorkProgress {
// 	export interface IWorkProgress {
// 		General: any;
// 		Statuses: any;
// 		Elements: any;
// 	}
//
// 	export module General {
// 		export module Redux {
// 			export interface IStore {
// 				Active: Modules | null;
// 				ShowStatusesOnModel: boolean;
// 			}
// 			export interface IActions {
// 				ComponentStart: (input: IActionsInput['ComponentStartInput']) => {
// 					type: typeof Types.COMPONENT_STARTED;
// 					payload: IActionsPayload['ComponentStartPayload'];
// 				};
// 				ComponentEnd: (input: IActionsInput['ComponentEndInput']) => {
// 					type: typeof Types.COMPONENT_ENDED;
// 					payload: IActionsPayload['ComponentEndPayload'];
// 				};
// 				ToggleStatusOnModelVisibility: () => {
// 					type: typeof Types.TOGGLE_STATUS_ON_MODEL_VISIBILITY;
// 				};
// 			}
// 			export type Actions = ReturnTypeFromInterface<IActions>;
// 			export enum Types {
// 				COMPONENT_STARTED = 'work_progress__general__COMPONENT_STARTED',
// 				COMPONENT_ENDED = 'work_progress__general__COMPONENT_ENDED',
// 				TOGGLE_STATUS_ON_MODEL_VISIBILITY = 'work_progress__general__TOGGLE_STATUS_ON_MODEL_VISIBILITY',
// 			}
// 			export interface IActionsInput {
// 				ComponentStartInput: { app: Modules };
// 				ComponentEndInput: { app: Modules };
// 			}
// 			export interface IActionsPayload {
// 				ComponentStartPayload: { app: Modules };
// 				ComponentEndPayload: { app: Modules };
// 			}
// 		}
// 	}
// 	export module Statuses {
// 		export module Redux {
// 			export interface IStore {
// 				ElementsStatusLoading: { [key: string]: boolean };
// 				ElementsStatusByIdAll: null | { [key: number]: ElementStatus };
// 				ElementsStatusByRevitIdAll: null | { [key: number]: ElementStatus };
// 				// Sorting: WorkProgress.GeneralConstruction.Objects.Payload.SortingOptionsType;
// 			}
// 			export interface IActions {
// 				// SetSortingOptions: (data: keyof QueryAcceptanceObjectsType.DataType) => {
// 				// 	type: typeof Types.SET_SORTING_OPTIONS;
// 				// 	payload: typeof data;
// 				// };
// 				HandleSetStatuses: (
// 					StatusEnum: StatusEnum,
// 					date: string,
// 					objects: Pick<Element, 'id' | 'revitId'>[],
// 				) => {
// 					type: typeof Types.HANDLE_SET_STATUSES;
// 					payload: {
// 						status: typeof StatusEnum;
// 						date: typeof date;
// 						objects: typeof objects;
// 					};
// 				};
// 				SetStatusesStart: (revitID: number) => {
// 					type: typeof Types.SET_STATUSES_START;
// 					payload: typeof revitID;
// 				};
// 				SetStatusesFinish: (
// 					revitID: number,
// 					data: StatusEnum,
// 				) => {
// 					type: typeof Types.SET_STATUSES_FINISH;
// 					payload: {
// 						revitID: typeof revitID;
// 						data: typeof data;
// 					};
// 				};
// 			}
// 			export type Actions = ReturnTypeFromInterface<IActions>;
// 			export enum Types {
// 				HANDLE_SET_STATUSES = 'work_progress__statuses__HANDLE_SET_STATUSES',
// 				SET_STATUSES_START = 'work_progress__statuses__SET_STATUSES_START',
// 				SET_STATUSES_FINISH = 'work_progress__statuses__SET_STATUSES_FINISH',
// 			}
// 		}
// 	}
// 	export module Elements {
// 		export module Redux {
// 			export interface IStore {
// 				SelectionByRevitId: Element['revitId'][];
// 				ElementsLoading: boolean;
// 				ElementsByID: null | {
// 					[key: Element['id']]: Element;
// 				};
// 				ElementsByRevitId: null | {
// 					[key: Element['revitId']]: Element;
// 				};
// 			}
// 			export interface IActions {
// 				FetchElementsStart: (input: IActionsInput['FetchElementsStart']) => {
// 					type: typeof Types.FETCH_ELEMENTS_START;
// 					payload: IActionsPayload['FetchElementsStart'];
// 				};
// 				FetchElementsEnd: (input: IActionsInput['FetchElementsEnd']) => {
// 					type: typeof Types.FETCH_ELEMENTS_END;
// 					payload: IActionsPayload['FetchElementsEnd'];
// 				};
// 				SelectElements: (input: IActionsInput['SelectElements']) => {
// 					type: typeof Types.SELECT_ELEMENTS;
// 					payload: IActionsPayload['SelectElements'];
// 				};
// 				HandleSelectElements: (input: IActionsInput['HandleSelectElements']) => {
// 					type: typeof Types.HANDLE_SELECT_ELEMENTS;
// 					payload: IActionsPayload['HandleSelectElements'];
// 				};
// 			}
// 			export type Actions = ReturnTypeFromInterface<IActions>;
// 			export enum Types {
// 				// SET_SORTING_OPTIONS = 'work_progress__elements__SET_SORTING_OPTIONS',
// 				FETCH_ELEMENTS_START = 'work_progress__elements__FETCH_ELEMENTS_START',
// 				FETCH_ELEMENTS_END = 'work_progress__elements__FETCH_ELEMENTS_END',
// 				SELECT_ELEMENTS = 'work_progress__elements__SELECT_ELEMENTS',
// 				HANDLE_SELECT_ELEMENTS = 'work_progress__elements__HANDLE_SELECT_ELEMENTS',
// 				HANDLE_SET_STATUSES = 'work_progress__elements__HANDLE_SET_STATUSES',
// 			}
// 			export interface IActionsInput {
// 				FetchElementsStart: { app: Modules };
// 				FetchElementsEnd: { elements: Element[] };
// 				SelectElements: { revitID: number | number[] };
// 				HandleSelectElements: { revitID: number[] };
// 			}
// 			export interface IActionsPayload {
// 				FetchElementsStart: { app: Modules };
// 				FetchElementsEnd: { elements: Element[] };
// 				SelectElements: { revitID: number | number[] };
// 				HandleSelectElements: { revitID: number[] };
// 			}
// 		}
// 	}
// }
