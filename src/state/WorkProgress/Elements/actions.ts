import { Element } from '../../../generated/graphql';
import { Modules } from '../constants';

export namespace ElementsActions {
	export interface IActions {
		FetchElementsStart: (input: FetchElementsStartInput) => {
			type: typeof Types.FETCH_ELEMENTS_START;
			payload: FetchElementsStartPayload;
		};
		FetchElementsEnd: (input: FetchElementsEndInput) => {
			type: typeof Types.FETCH_ELEMENTS_END;
			payload: FetchElementsEndPayload;
		};
		SelectElements: (input: SelectElementsInput) => {
			type: typeof Types.SELECT_ELEMENTS;
			payload: SelectElementsPayload;
		};
		HandleSelectElements: (input: HandleSelectElementsInput) => {
			type: typeof Types.HANDLE_SELECT_ELEMENTS;
			payload: HandleSelectElementsPayload;
		};
	}
	export type FetchElementsEndInput = { elements: Element[] };
	export type FetchElementsEndPayload = FetchElementsEndInput;
	export type FetchElementsStartInput = { app: Modules };
	export type FetchElementsStartPayload = FetchElementsStartInput;
	export type HandleSelectElementsInput = number[];
	export type HandleSelectElementsPayload = HandleSelectElementsInput;
	export type SelectElementsInput = { revitID: number | number[] };
	export type SelectElementsPayload = SelectElementsInput;
}
export enum Types {
	// SET_SORTING_OPTIONS = 'work_progress__elements__SET_SORTING_OPTIONS',
	FETCH_ELEMENTS_START = 'work_progress__elements__FETCH_ELEMENTS_START',
	FETCH_ELEMENTS_END = 'work_progress__elements__FETCH_ELEMENTS_END',
	SELECT_ELEMENTS = 'work_progress__elements__SELECT_ELEMENTS',
	HANDLE_SELECT_ELEMENTS = 'work_progress__elements__HANDLE_SELECT_ELEMENTS',
	HANDLE_SET_STATUSES = 'work_progress__elements__HANDLE_SET_STATUSES',
}
type IActions = ElementsActions.IActions;
export const Actions: IActions = {
	FetchElementsStart: (input) => ({ type: Types.FETCH_ELEMENTS_START, payload: input }),
	FetchElementsEnd: (input) => ({ type: Types.FETCH_ELEMENTS_END, payload: input }),
	SelectElements: (input) => ({ type: Types.SELECT_ELEMENTS, payload: input }),
	HandleSelectElements: (input) => ({ type: Types.HANDLE_SELECT_ELEMENTS, payload: input }),
	// SetSortingOptions: (data) => ({
	// 	type: WorkProgress.Elements.Redux.Types.SET_SORTING_OPTIONS,
	// 	payload: data,
	// }),
	// HandleSetStatuses: (status, date, objects) => ({
	// 	type: WorkProgress.Elements.Redux.Types.HANDLE_SET_STATUSES,
	// 	payload: { status, date, objects },
	// }),
	// SetStatusesStart: (revitID) => ({
	// 	type: WorkProgress.Elements.Redux.Types.SET_STATUSES_START,
	// 	payload: revitID,
	// }),
	// SetStatusesFinish: (revitID, data) => ({
	// 	type: WorkProgress.Elements.Redux.Types.SET_STATUSES_FINISH,
	// 	payload: { revitID, data },
	// }),
};
