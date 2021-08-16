import ModelViewer from '../types';

const INITIAL_STATE: ModelViewer.General.Redux.Store = {
	active: false,
};

function ModelViewerReducer(state = INITIAL_STATE, action: ModelViewer.General.Redux.Actions) {
	switch (action.type) {
		case ModelViewer.General.Redux.Types.MODEL_VIEWER_INITIALIZE:
			return {
				...state,
				active: true,
			};
		case ModelViewer.General.Redux.Types.MODEL_VIEWER_CANCEL:
			return {
				...state,
				active: false,
			};
		default:
			return { ...state };
	}
}


export default ModelViewerReducer