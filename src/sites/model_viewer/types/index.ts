import { ReturnTypeFromInterface } from '../../../types/ReturnTypeFromInterface';

namespace ModelViewer {
	export namespace General {
		export namespace Redux {
			export interface Store {
				active: boolean;
			}
			export interface IActions {
				Initialize: () => {
					type: Types.MODEL_VIEWER_INITIALIZE;
				};
				Cancel: () => {
					type: Types.MODEL_VIEWER_CANCEL;
				};
			}
			export type Actions = ReturnTypeFromInterface<IActions>;
			export enum Types {
				MODEL_VIEWER_INITIALIZE = 'model_viewer__INITIALIZE',
				MODEL_VIEWER_CANCEL = 'model_viewer__CANCEL',
			}
		}
	}
}

export default ModelViewer;
