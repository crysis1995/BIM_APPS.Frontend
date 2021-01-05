import { reducer as notificationsReducer } from 'reapop';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import Autodesk, { AutodeskLoginEpic } from '../components/AutodeskLogin/redux';
import CMSLogin from '../components/CMSLogin/redux/reducers';
import ForgeViewer from '../components/ForgeViewer/redux/reducers';
import Modal from '../components/Modal/redux/reducers';
import { OdbioryEpics, OdbioryReducer as Odbiory } from '../sites/work_progress/reducers';

const rootReducer = combineReducers({
	Notifications: notificationsReducer(),
	Autodesk,
	Odbiory,
	ForgeViewer,
	Modal,
	CMSLogin,
});
const rootEpic = combineEpics(OdbioryEpics, AutodeskLoginEpic);
export { rootReducer, rootEpic };
