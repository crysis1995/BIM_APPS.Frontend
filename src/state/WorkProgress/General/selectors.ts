import { RootState } from '../../_types/RootState';
import { Modules } from '../constants';

const GetActiveApp = (state: RootState) => state.WorkProgress.General.Active;
const IsAppActive = (state: RootState, app: Modules) => GetActiveApp(state) === app;
const IsShowStatusesOnModelActive = (state: RootState) =>
	state.WorkProgress.General.ShowStatusesOnModel;

export default {
	GetActiveApp,
	IsAppActive,
	IsShowStatusesOnModelActive,
};
