import { Element, ElementStatus, StatusEnum } from '../../../generated/graphql';

export namespace ActionInterfaces {
	export type HandleSetStatusesInput = {
		statusEnum: StatusEnum;
		date: string;
		objects: Pick<Element, 'id' | 'revitId'>[];
	};
	export type SetStatusesStartInput = {
		revitID: number;
	};
	export type SetStatusesFinishInput = {
		revitID: number;
		data: StatusEnum;
	};
	export type FetchStatusesFinishInput = {
		statuses: ElementStatus[];
	};
	export type HandleSetStatusesPayload = HandleSetStatusesInput;
	export type SetStatusesStartPayload = SetStatusesStartInput;
	export type SetStatusesFinishPayload = SetStatusesFinishInput;
	export type FetchStatusesFinishPayload = FetchStatusesFinishInput;

	export interface IActions {
		FetchStatusesStart: () => {
			type: typeof Types.FETCH_STATUSES_START;
		};
		FetchStatusesFinish: (input: FetchStatusesFinishInput) => {
			type: typeof Types.FETCH_STATUSES_FINISH;
			payload: FetchStatusesFinishPayload;
		};
		HandleSetStatuses: (input: HandleSetStatusesInput) => {
			type: typeof Types.HANDLE_SET_STATUSES;
			payload: HandleSetStatusesPayload;
		};
		SetStatusesStart: (input: SetStatusesStartInput) => {
			type: typeof Types.SET_STATUSES_START;
			payload: SetStatusesStartPayload;
		};
		SetStatusesFinish: (input: SetStatusesFinishInput) => {
			type: typeof Types.SET_STATUSES_FINISH;
			payload: SetStatusesFinishPayload;
		};
	}
}
// export type Actions = ReturnTypeFromInterface<IActions>;
export enum Types {
	HANDLE_SET_STATUSES = 'work_progress__statuses__HANDLE_SET_STATUSES',
	SET_STATUSES_START = 'work_progress__statuses__SET_STATUSES_START',
	SET_STATUSES_FINISH = 'work_progress__statuses__SET_STATUSES_FINISH',
	FETCH_STATUSES_START = 'work_progress__statuses__FETCH_STATUSES_START',
	FETCH_STATUSES_FINISH = 'work_progress__statuses__FETCH_STATUSES_FINISH',
}

export const Actions: ActionInterfaces.IActions = {
	HandleSetStatuses: (input) => ({ type: Types.HANDLE_SET_STATUSES, payload: input }),
	SetStatusesFinish: (input) => ({ type: Types.SET_STATUSES_FINISH, payload: input }),
	SetStatusesStart: (input) => ({ type: Types.SET_STATUSES_START, payload: input }),
	FetchStatusesStart: () => ({ type: Types.FETCH_STATUSES_START }),
	FetchStatusesFinish: (input) => ({ type: Types.FETCH_STATUSES_FINISH, payload: input }),
};
