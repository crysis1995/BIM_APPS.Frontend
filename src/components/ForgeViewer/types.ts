import { ReturnTypeFromInterface } from '../../types/ReturnTypeFromInterface';

namespace ForgeViewer {
	export namespace Redux {
		export interface IStore {
			is3DMode: boolean;
			sheets: { [key: string]: ForgeViewer.Payload.Sheet } | null;
			view3D: ForgeViewer.Payload.View3D | null;
			sheets_loaded: boolean;
			sheets_error: boolean;
			current_level: string | null;
			current_sheet: string | null;
			viewer_isInitialized: boolean;
			model_elements: null | { [key: string]: ForgeViewer.Payload.Element };
			model_elements_loading: boolean;
			panel_visible: ForgeViewer.Payload.PanelVisibilityEnum;
			selected_elements: ForgeViewer.Payload.Element['forgeId'][];
			colored_elements: { [key: string]: ForgeViewer.Payload.ColoredElement };
			disabled_elements: ForgeViewer.Payload.Element['forgeId'][];
			hidden_elements: ForgeViewer.Payload.Element['forgeId'][];
			visible_elements: ForgeViewer.Payload.Element['forgeId'][];
		}
		export interface IActions {
			SetInitial: () => {
				type: typeof ForgeViewer.Redux.Types.SET_INITIAL;
			};
			StartViewer: () => {
				type: typeof ForgeViewer.Redux.Types.START_VIEWER;
			};
			EndViewer: () => {
				type: typeof ForgeViewer.Redux.Types.END_VIEWER;
			};
			SetSheetsSuccess: (
				sheets: ForgeViewer.Payload.Sheets,
				view3D?: ForgeViewer.Payload.View3D,
			) => {
				type: typeof ForgeViewer.Redux.Types.SET_SHEETS_SUCCESS;
				payload: { sheets: typeof sheets; view3D: typeof view3D };
			};
			SetSheetsError: (error: string) => {
				type: typeof ForgeViewer.Redux.Types.SET_SHEETS_ERROR;
				payload: typeof error;
			};
			SetCurrentSheet: (sheet: ForgeViewer.Payload.Sheet['id']) => {
				type: typeof ForgeViewer.Redux.Types.SET_CURRENT_SHEET;
				payload: typeof sheet;
			};
			SetCurrentLevel: (levelName: string | undefined) => {
				type: typeof ForgeViewer.Redux.Types.SET_CURRENT_LEVEL;
				payload: typeof levelName;
			};
			SetViewerElements: (elements: ForgeViewer.Payload.Elements) => {
				type: typeof ForgeViewer.Redux.Types.SET_MODEL_ELEMENTS;
				payload: typeof elements;
			};
			ChangeForgePanelVisibility: (data: ForgeViewer.Payload.PanelVisibilityEnum) => {
				type: typeof ForgeViewer.Redux.Types.REACT_PANEL_CHANGE_VISIBILITY;
				payload: typeof data;
			};
			SetElements: (data: ForgeViewer.Payload.CurrentElementsFilterData) => {
				type: typeof ForgeViewer.Redux.Types.ELEMENTS_SET;
				payload: typeof data;
			};
			CleanElements: () => {
				type: typeof ForgeViewer.Redux.Types.ELEMENTS_CLEAN;
			};

			Activate3DView: () => {
				type: typeof ForgeViewer.Redux.Types.ACTIVATE_3D_VIEW;
			};
			Deactivate3DView: () => {
				type: typeof ForgeViewer.Redux.Types.DEACTIVATE_3D_VIEW;
			};
		}
		export type Actions = ReturnTypeFromInterface<ForgeViewer.Redux.IActions>;
		export enum Types {
			SET_INITIAL = 'forgeViewer__SET_INITIAL',
			START_VIEWER = 'forgeViewer__START_VIEWER',
			END_VIEWER = 'forgeViewer__END_VIEWER',
			SET_MODEL_ELEMENTS = 'forgeViewer__SET_MODEL_ELEMENTS',
			SET_SHEETS_SUCCESS = 'forgeViewer__SET_SHEETS_SUCCESS',
			SET_SHEETS_ERROR = 'forgeViewer__SET_SHEETS_ERROR',
			SET_CURRENT_SHEET = 'forgeViewer__SET_CURRENT_SHEET',
			REACT_PANEL_CHANGE_VISIBILITY = 'forgeViewer__REACT_PANEL_CHANGE_ACTIVITY',

			SET_CURRENT_LEVEL = 'forgeViewer__SET_CURRENT_LEVEL',

			ELEMENTS_SET = 'forge_viewer__ELEMENTS_SET',
			ELEMENTS_CLEAN = 'forge_viewer__ELEMENTS_CLEAN',

			ACTIVATE_3D_VIEW = 'forge_viewer__ACTIVATE_3D_VIEW',
			DEACTIVATE_3D_VIEW = 'forge_viewer__INACTIVATE_3D_VIEW',
		}
	}
	export namespace Payload {
		export interface AddElements extends ElementOperationsContainer {}
		export interface RemoveElements extends ElementOperationsContainer {}
		export type ForgeElement = ForgeViewer.Payload.Element['forgeId'];
		export type ColoredElement = {
			element: ForgeElement;
			color: Color;
		};
		export interface CurrentElementsFilterData {
			[ForgeViewer.Payload.ElementOperationTypesEnum.COLORED]?: {
				[key: string]: ForgeViewer.Payload.ColoredElement;
			};
			[ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED]?: number[];
			[ForgeViewer.Payload.ElementOperationTypesEnum.HIDDEN]?: number[];
			[ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE]?: number[];
			[ForgeViewer.Payload.ElementOperationTypesEnum.SELECTED]?: number[];
		}

		export type ElementOperationsContainer = {
			[key in ElementOperationTypesEnum]?: (string | number)[];
		};

		export enum ElementOperationTypesEnum {
			SELECTED = 'selected',
			COLORED = 'colored',
			DISABLED = 'disabled',
			HIDDEN = 'hidden',
			VISIBLE = 'visible',
		}

		export interface View3D {
			id: string;
			name: string;
		}

		export type Sheets = Sheet[];
		export type Sheet = {
			id: string;
			name: string;
		};

		export type Elements = Element[];
		export type Element = { rvtId: number | string; forgeId: number; levelName: string };

		export type Color = {
			r: number;
			g: number;
			b: number;
			a?: number;
		};

		export enum PanelVisibilityEnum {
			VISIBLE = 'visible',
			INVISIBLE = 'invisible',
		}
	}
}

export default ForgeViewer;
