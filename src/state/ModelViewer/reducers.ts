import ModelViewer from './type';

const INITIAL_STATE: ModelViewer.General.Redux.Store = {
	Active: false,
};

function ModelViewerReducer(state = INITIAL_STATE, action: ModelViewer.General.Redux.Actions) {
	switch (action.type) {
		case ModelViewer.General.Redux.Types.MODEL_VIEWER_INITIALIZE:
			return {
				...state,
				Active: true,
			};
		case ModelViewer.General.Redux.Types.MODEL_VIEWER_CANCEL:
			return {
				...state,
				Active: false,
			};
		default:
			return { ...state };
	}
}


export default ModelViewerReducer