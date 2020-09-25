// import OdbioryEpics from '../sites/work_progress/epics';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import AutodeskBIM360 from '../components/AutodeskBIM360/redux';
import Autodesk from '../components/AutodeskLogin/redux';
import CMSLogin from '../components/CMSLogin/redux/reducers';
import ForgeViewer from '../components/ForgeViewer/redux/reducers';
import Modal from '../components/Modal/redux/reducers';
import { OdbioryReducer as Odbiory, OdbioryEpics } from '../sites/work_progress/reducers';

const rootReducer = combineReducers({
	Autodesk,
	AutodeskBIM360,
	Odbiory,
	ForgeViewer,
	Modal,
	CMSLogin,
});

const rootEpic = combineEpics(OdbioryEpics);

export { rootReducer, rootEpic };
