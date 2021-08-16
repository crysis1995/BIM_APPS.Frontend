import ModelViewer from '../types';

const ModelViewerGeneralActions: ModelViewer.General.Redux.IActions = {
	Initialize: () => ({ type: ModelViewer.General.Redux.Types.MODEL_VIEWER_INITIALIZE }),
	Cancel: () => ({ type: ModelViewer.General.Redux.Types.MODEL_VIEWER_CANCEL }),
};

export default ModelViewerGeneralActions;