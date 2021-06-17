import WorkProgress from '../../types';

const WorkProgressGeneralActions: WorkProgress.General.Redux.IActions = {
	SetInitial: () => ({ type: WorkProgress.General.Redux.Types.SET_INITIAL }),
};

export default WorkProgressGeneralActions;
