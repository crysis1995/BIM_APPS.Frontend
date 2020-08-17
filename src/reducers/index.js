import { combineReducers } from 'redux';
import AutodeskBIM360 from '../components/AutodeskBIM360/redux';
import Autodesk from '../components/AutodeskLogin/redux';
import CMSLogin from '../components/CMSLogin/redux/reducers';
import ForgeViewer from '../components/ForgeViewer/redux/reducers';
import Modal from '../components/Modal/redux/reducers';
import Odbiory from '../sites/acceptance/reducers';

const rootReducer = combineReducers({
	Autodesk,
	AutodeskBIM360,
	Odbiory,
	ForgeViewer,
	Modal,
	CMSLogin,
});

export default rootReducer;
