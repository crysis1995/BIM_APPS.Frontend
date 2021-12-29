import { CommentaryElement } from '../../../generated/graphql';
import { ReturnTypeFromInterface } from '../../../utils/types/ReturnTypeFromInterface';
import { CommentaryElementActions, Types } from './actions';
import normalize from '../../../utils/Normalize';

export namespace CommentaryElementStore {
	export interface IStore {
		LoadingByElementId: { [key: number]: boolean };
		AllById: { [key: CommentaryElement['id']]: CommentaryElement };
		AllByElementId: {
			[key: CommentaryElement['elementId']]: CommentaryElement['id'][];
		};
	}
}
type IStore = CommentaryElementStore.IStore;
const INITIAL_STORE: IStore = {
	AllById: {},
	LoadingByElementId: {},
	AllByElementId: {},
};
type IActions = CommentaryElementActions.IActions;
export function Reducer(state = INITIAL_STORE, action: ReturnTypeFromInterface<IActions>) {
	switch (action.type) {
		case Types.FETCH_COMMENTARY_START:
			return StoreActions.LoadingByElementId.Set(state, action, true);
		case Types.FETCH_COMMENTARY_FINISH:
			state = StoreActions.AllById.Set(state, action);
			state = StoreActions.AllByElementId.Set(state, action);
			return StoreActions.LoadingByElementId.Set(state, action, false);
		case Types.CREATE_COMMENTARY_ELEMENT_START:
			return StoreActions.LoadingByElementId.Set(state, action, true);
		case Types.CREATE_COMMENTARY_ELEMENT_FINISH:
			state = StoreActions.AllById.AddCreated(state, action);
			state = StoreActions.AllByElementId.AddCreated(state, action);
			return StoreActions.LoadingByElementId.Set(state, action, false);
		case Types.CREATE_COMMENTARY_ELEMENT_ERROR:
			return StoreActions.LoadingByElementId.Set(state, action, false);
		default:
			return state;
	}
}
const StoreActions = {
	LoadingByElementId: {
		Set: (
			state: IStore,
			action: ReturnType<
				| IActions['FetchCommentsStart']
				| IActions['FetchCommentsFinish']
				| IActions['CreateCommentaryElementStart']
				| IActions['CreateCommentaryElementFinish']
				| IActions['CreateCommentaryElementError']
			>,
			value: boolean,
		): IStore => {
			return {
				...state,
				LoadingByElementId: {
					...state.LoadingByElementId,
					[action.payload.elementId]: value,
				},
			};
		},
	},
	AllById: {
		Set: (state: IStore, action: ReturnType<IActions['FetchCommentsFinish']>): IStore => {
			const normalized = normalize(action.payload.commentaryElements, 'id');
			return {
				...state,
				AllById: {
					...state.AllById,
					...normalized,
				},
			};
		},
		AddCreated: (
			state: IStore,
			action: ReturnType<IActions['CreateCommentaryElementFinish']>,
		): IStore => {
			const commentaryElement = action.payload.commentaryElement;
			if (!commentaryElement) {
				return state;
			}
			return {
				...state,
				AllById: {
					...state.AllById,
					[commentaryElement.id]: commentaryElement,
				},
			};
		},
	},
	AllByElementId: {
		Set: (state: IStore, action: ReturnType<IActions['FetchCommentsFinish']>): IStore => {
			return {
				...state,
				AllByElementId: {
					...state.AllByElementId,
					[action.payload.elementId]: [
						...new Set(action.payload.commentaryElements.map((e) => e.id)),
					],
				},
			};
		},
		AddCreated: (
			state: IStore,
			action: ReturnType<IActions['CreateCommentaryElementFinish']>,
		): IStore => {
			const commentaryElement = action.payload.commentaryElement;
			if (!commentaryElement) {
				return state;
			}
			const prev = state.AllByElementId[commentaryElement.elementId] || [];
			prev.push(commentaryElement.id);
			return {
				...state,
				AllByElementId: {
					...state.AllByElementId,
					[commentaryElement.elementId]: prev,
				},
			};
		},
	},
};
