import { Mutation, Query } from '../../../generated/graphql';

export namespace CommentaryElementActions {
	export interface IActions {
		FetchCommentsStart: (input: FetchCommentsStartInput) => {
			type: Types.FETCH_COMMENTARY_START;
			payload: FetchCommentsStartPayload;
		};
		FetchCommentsFinish: (input: FetchCommentsFinishInput) => {
			type: Types.FETCH_COMMENTARY_FINISH;
			payload: FetchCommentsFinishPayload;
		};
		FetchAllCommentsStart: () => {
			type: Types.FETCH_ALL_COMMENTARY_START;
		};
		FetchAllCommentsFinish: (input: FetchAllCommentsFinishInput) => {
			type: Types.FETCH_ALL_COMMENTARY_FINISH;
			payload: FetchAllCommentsFinishPayload;
		};
		CreateCommentaryElementStart: (input: CreateCommentaryElementStartInput) => {
			type: Types.CREATE_COMMENTARY_ELEMENT_START;
			payload: CreateCommentaryElementStartPayload;
		};
		CreateCommentaryElementFinish: (input: CreateCommentaryElementFinishInput) => {
			type: Types.CREATE_COMMENTARY_ELEMENT_FINISH;
			payload: CreateCommentaryElementFinishPayload;
		};
		CreateCommentaryElementError: (input: CreateCommentaryElementStartInput) => {
			type: Types.CREATE_COMMENTARY_ELEMENT_ERROR;
			payload: CreateCommentaryElementStartPayload;
		};
	}
	export type FetchCommentsStartInput = { elementId: number };
	export type FetchCommentsStartPayload = FetchCommentsStartInput;
	export type FetchCommentsFinishInput = FetchCommentsStartInput & {
		commentaryElements: Query['commentaryElements'];
	};
	export type FetchCommentsFinishPayload = FetchCommentsFinishInput;
	export type FetchAllCommentsFinishInput = Query['commentaryElements'];
	export type FetchAllCommentsFinishPayload = Query['commentaryElements'];
	export type CreateCommentaryElementStartInput = FetchCommentsStartInput;
	export type CreateCommentaryElementStartPayload = CreateCommentaryElementStartInput;
	export type CreateCommentaryElementFinishInput = FetchCommentsStartInput & {
		commentaryElement: Mutation['createCommentaryElement'];
	};
	export type CreateCommentaryElementFinishPayload = CreateCommentaryElementFinishInput;
	export type CreateCommentaryElementErrorInput = CreateCommentaryElementStartInput;
	export type CreateCommentaryElementErrorPayload = CreateCommentaryElementErrorInput;
}

export enum Types {
	FETCH_COMMENTARY_START = 'work_progress__commentary_element__FETCH_COMMENTARY_START',
	FETCH_COMMENTARY_FINISH = 'work_progress__commentary_element__FETCH_COMMENTARY_FINISH',
	FETCH_ALL_COMMENTARY_START = 'work_progress__commentary_element__FETCH_ALL_COMMENTARY_START',
	FETCH_ALL_COMMENTARY_FINISH = 'work_progress__commentary_element__FETCH_ALL_COMMENTARY_FINISH',
	CREATE_COMMENTARY_ELEMENT_START = 'work_progress__commentary_element__CREATE_COMMENTARY_ELEMENT_START',
	CREATE_COMMENTARY_ELEMENT_ERROR = 'work_progress__commentary_element__CREATE_COMMENTARY_ELEMENT_ERROR',
	CREATE_COMMENTARY_ELEMENT_FINISH = 'work_progress__commentary_element__CREATE_COMMENTARY_ELEMENT_FINISH',
}

type IActions = CommentaryElementActions.IActions;
export const Actions: IActions = {
	FetchCommentsStart: (input) => ({ type: Types.FETCH_COMMENTARY_START, payload: input }),
	FetchCommentsFinish: (input) => ({ type: Types.FETCH_COMMENTARY_FINISH, payload: input }),
	FetchAllCommentsStart: () => ({ type: Types.FETCH_ALL_COMMENTARY_START }),
	FetchAllCommentsFinish: (input) => ({
		type: Types.FETCH_ALL_COMMENTARY_FINISH,
		payload: input,
	}),
	CreateCommentaryElementStart: (input) => ({
		type: Types.CREATE_COMMENTARY_ELEMENT_START,
		payload: input,
	}),
	CreateCommentaryElementFinish: (input) => ({
		type: Types.CREATE_COMMENTARY_ELEMENT_FINISH,
		payload: input,
	}),
	CreateCommentaryElementError: (input) => ({
		type: Types.CREATE_COMMENTARY_ELEMENT_ERROR,
		payload: input,
	}),
};
