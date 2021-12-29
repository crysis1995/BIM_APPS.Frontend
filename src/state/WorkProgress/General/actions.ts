import { Modules } from '../constants';

export namespace GeneralActions {
	export interface IActions {
		ComponentStart: (input: ComponentStartInput) => {
			type: typeof Types.COMPONENT_STARTED;
			payload: ComponentStartPayload;
		};
		ComponentEnd: (input: ComponentEndInput) => {
			type: typeof Types.COMPONENT_ENDED;
			payload: ComponentEndPayload;
		};
		ToggleStatusOnModelVisibility: () => {
			type: typeof Types.TOGGLE_STATUS_ON_MODEL_VISIBILITY;
		};
	}
	export type ComponentStartInput = { app: Modules };
	export type ComponentEndInput = { app: Modules };
	export type ComponentStartPayload = { app: Modules };
	export type ComponentEndPayload = { app: Modules };
}
export enum Types {
	COMPONENT_STARTED = 'work_progress__general__COMPONENT_STARTED',
	COMPONENT_ENDED = 'work_progress__general__COMPONENT_ENDED',
	TOGGLE_STATUS_ON_MODEL_VISIBILITY = 'work_progress__general__TOGGLE_STATUS_ON_MODEL_VISIBILITY',
}

export const Actions: GeneralActions.IActions = {
	ComponentEnd: (input) => ({ type: Types.COMPONENT_ENDED, payload: input }),
	ComponentStart: (input) => ({ type: Types.COMPONENT_STARTED, payload: input }),
	ToggleStatusOnModelVisibility: () => ({ type: Types.TOGGLE_STATUS_ON_MODEL_VISIBILITY }),
};
