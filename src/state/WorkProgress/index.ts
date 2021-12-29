import { combineReducers } from 'redux';
import * as epics from './Epics';
import StatusesData, { type ActionInterfaces, type StoreInterfaces } from './Statuses';
import GeneralData, { type GeneralActions, type GeneralStore } from './General';
import ElementsData, { type ElementsActions, type ElementsStore } from './Elements';
import CommentaryElementData, {
	type CommentaryElementActions,
	type CommentaryElementStore,
} from './CommentaryElement';
import { ReturnTypeFromInterface } from '../../utils/types/ReturnTypeFromInterface';
import * as Constant from './constants';

export module WorkProgress {
	export module Statuses {
		const DATA = StatusesData;
		export type IActions = ActionInterfaces.IActions;
		export module IActionInput {
			export type HandleSetStatusesInput = ActionInterfaces.HandleSetStatusesInput;
			export type SetStatusesStartInput = ActionInterfaces.SetStatusesStartInput;
			export type SetStatusesFinishInput = ActionInterfaces.SetStatusesFinishInput;
			export type FetchStatusesFinishInput = ActionInterfaces.FetchStatusesFinishInput;
		}
		export module IActionPayload {
			export type HandleSetStatusesPayload = ActionInterfaces.HandleSetStatusesPayload;
			export type SetStatusesStartPayload = ActionInterfaces.SetStatusesStartPayload;
			export type SetStatusesFinishPayload = ActionInterfaces.SetStatusesFinishPayload;
			export type FetchStatusesFinishPayload = ActionInterfaces.FetchStatusesFinishPayload;
		}
		export type IStore = StoreInterfaces.IStore;
		export const Types = DATA.Types;
		export const Reducer = DATA.Reducer;
		export const Actions = DATA.Actions;
		export const ActionEpics = DATA.ActionEpics;
		// export const Selectors = StatusesData.Selectors
	}
	export module General {
		const DATA = GeneralData;
		export type IActions = GeneralActions.IActions;
		export module IActionInput {
			export type ComponentEndInput = GeneralActions.ComponentEndInput;
			export type ComponentStartInput = GeneralActions.ComponentStartInput;
		}
		export module IActionPayload {
			export type ComponentStartPayload = GeneralActions.ComponentStartPayload;
			export type ComponentEndPayload = GeneralActions.ComponentEndPayload;
		}
		export type IStore = GeneralStore.IStore;
		export const Types = DATA.Types;
		export const Reducer = DATA.Reducer;
		export const Actions = DATA.Actions;
		export const ActionEpics = DATA.ActionEpics;
		export const Selectors = DATA.Selectors;
	}
	export module Elements {
		const DATA = ElementsData;
		export type IActions = ElementsActions.IActions;
		export module IActionInput {
			export type FetchElementsEndInput = ElementsActions.FetchElementsEndInput;
			export type FetchElementsStartInput = ElementsActions.FetchElementsStartInput;
			export type HandleSelectElementsInput = ElementsActions.HandleSelectElementsInput;
			export type SelectElementsInput = ElementsActions.SelectElementsInput;
		}
		export module IActionPayload {
			export type FetchElementsEndPayload = ElementsActions.FetchElementsEndPayload;
			export type FetchElementsStartPayload = ElementsActions.FetchElementsStartPayload;
			export type HandleSelectElementsPayload = ElementsActions.HandleSelectElementsPayload;
			export type SelectElementsPayload = ElementsActions.SelectElementsPayload;
		}
		export type IStore = ElementsStore.IStore;
		export const Types = DATA.Types;
		export const Reducer = DATA.Reducer;
		export const Actions = DATA.Actions;
		export const ActionEpics = DATA.ActionEpics;
		export const Selectors = DATA.Selectors;
	}
	export module CommentaryElement {
		const DATA = CommentaryElementData;
		export type IActions = CommentaryElementActions.IActions;
		export module IActionInput {
			export type FetchCommentsStartInput = CommentaryElementActions.FetchCommentsStartInput;
			export type FetchCommentsFinishInput =
				CommentaryElementActions.FetchCommentsFinishInput;
			export type FetchAllCommentsFinishInput =
				CommentaryElementActions.FetchAllCommentsFinishInput;
		}
		export module IActionPayload {
			export type FetchCommentsStartPayload =
				CommentaryElementActions.FetchCommentsStartPayload;
			export type FetchCommentsFinishPayload =
				CommentaryElementActions.FetchCommentsFinishPayload;
			export type FetchAllCommentsFinishPayload =
				CommentaryElementActions.FetchAllCommentsFinishPayload;
		}
		export type IStore = CommentaryElementStore.IStore;
		export const Types = DATA.Types;
		export const Reducer = DATA.Reducer;
		export const Actions = DATA.Actions;
		export const ActionEpics = DATA.ActionEpics;
		export const Selectors = DATA.Selectors;
	}

	export module Constants {
		export type Modules = Constant.Modules;
	}

	export type ActionTypes =
		| ReturnTypeFromInterface<Statuses.IActions>
		| ReturnTypeFromInterface<Elements.IActions>
		| ReturnTypeFromInterface<General.IActions>
		| ReturnTypeFromInterface<CommentaryElement.IActions>;

	export type StateType = ReturnType<typeof Reducers>;

	export const Epics = epics.default;

	export const Actions = {
		Elements: Elements.Actions,
		General: General.Actions,
		Statuses: Statuses.Actions,
		CommentaryElement: CommentaryElement.Actions,
	};
	export const Reducers = combineReducers({
		Elements: Elements.Reducer,
		General: General.Reducer,
		Statuses: Statuses.Reducer,
		CommentaryElement: CommentaryElement.Reducer,
	});
	export const Selectors = {
		Elements: Elements.Selectors,
		General: General.Selectors,
		Statuses: undefined,
		CommentaryElement: CommentaryElement.Selectors,
	};
	export const Types = {
		Statuses: Statuses.Types,
		General: General.Types,
		Elements: Elements.Types,
		CommentaryElement: CommentaryElement.Types,
	};
}
