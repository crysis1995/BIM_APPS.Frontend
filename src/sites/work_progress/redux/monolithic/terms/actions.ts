import WorkProgress from '../../../types';

const TermsActions: WorkProgress.Monolithic.Terms.Redux.IActions = {
	SetInitial: () => ({ type: WorkProgress.Monolithic.Terms.Redux.Types.SET_INITIAL }),
	FetchStart: () => ({ type: WorkProgress.Monolithic.Terms.Redux.Types.TERMS_FETCH_START }),
	FetchEnd: (data) => ({ type: WorkProgress.Monolithic.Terms.Redux.Types.TERMS_FETCH_END, payload: data }),
	SetTermByGroup: (data) => ({
		type: WorkProgress.Monolithic.Terms.Redux.Types.SET_BY_GROUP,
		payload: data,
	}),
	SetTermsByGroupInit: (data) => ({
		type: WorkProgress.Monolithic.Terms.Redux.Types.SET_BY_GROUP_INIT,
		payload: data,
	}),
	UpdateTermsByGroup: (data) => ({
		type: WorkProgress.Monolithic.Terms.Redux.Types.UPDATE_BY_GROUP,
		payload: data,
	}),
	UpdateTermsByGroupInit: (data) => ({
		type: WorkProgress.Monolithic.Terms.Redux.Types.UPDATE_BY_GROUP_INIT,
		payload: data,
	}),
};

export default TermsActions;
