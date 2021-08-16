import { AddToAll } from './utils/AddToAll';
import { AddToWorkEvidence } from './utils/AddToWorkEvidence';
import { AddToAllWorkersAndDates } from './utils/AddToAllWorkersAndDates';
import WorkersLog from '../../../types';

export const INITIAL_STATE: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Store = {
	all_by_days: null,
	all_by_workers: null,
	loading: false,
	all: null,
	summary: { by_dates: null, by_workers: null },
	work_evidence: null,
	blocked: null,
	editing: null,
};

function AddToSummary(
	state: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Store,
): WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Store {
	function CountSum(ids: string[]) {
		return ids.reduce(
			(previousValue, currentValue) =>
				previousValue + (state.all && state.all[currentValue] ? state.all[currentValue].worked_time : 0),
			0,
		);
	}
	return {
		...state,
		summary: {
			by_workers: Object.entries(
				state.all_by_workers || {},
			).reduce<WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.ISummaryByWorker>(
				(previousValue, [worker, ids]) => {
					previousValue[worker] = CountSum(ids);
					return previousValue;
				},
				{},
			),
			by_dates: Object.entries(
				state.all_by_days || {},
			).reduce<WorkersLog.WorkTimeEvidence.TimeEvidence.Payload.ISummaryByDate>((previousValue, [date, ids]) => {
				previousValue[date] = CountSum(ids);
				return previousValue;
			}, {}),
		},
	};
}

function OnEditingWorkedTimeSucceed(
	state: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Store,
	action: ReturnType<
		| WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions['fetchWorkerWorkEvidenceEnd']
		| WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions['editingWorkedTimeSucceed']
	>,
) {
	state = AddToAll(state, action);
	state = AddToWorkEvidence(state, action);
	state = AddToAllWorkersAndDates(state, action);
	state = AddToSummary(state);
	return { ...state };
}

function OnEndFetchWorkerTimeEvidence(
	state: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Store,
	action: ReturnType<
		| WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions['fetchWorkerWorkEvidenceEnd']
		| WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.IActions['editingWorkedTimeSucceed']
	>,
) {
	state = AddToAll(state, action);
	state = AddToWorkEvidence(state, action);
	state = AddToAllWorkersAndDates(state, action);
	state = AddToSummary(state);
	return { ...state };
}

function OnFetchWorkerTimeEvidenceFinishAll(state: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Store) {
	state = AddToSummary(state);
	return {
		...state,
		loading: false,
	};
}

function TimeEvidenceReducer(state = INITIAL_STATE, action: WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Actions) {
	switch (action.type) {
		case WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.SET_INITIAL:
			return { ...INITIAL_STATE };
		case WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.FETCH_WORKER_TIME_EVIDENCE_START:
			return { ...state, loading: true };
		case WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.FETCH_WORKER_TIME_EVIDENCE_FINISH_ALL:
			return OnFetchWorkerTimeEvidenceFinishAll(state);
		case WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.FETCH_WORKER_TIME_EVIDENCE_END:
			return OnEndFetchWorkerTimeEvidence(state, action);
		case WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_START:
			return { ...state, editing: action.payload.data };
		case WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_CANCEL:
			return { ...state, editing: null };
		case WorkersLog.WorkTimeEvidence.TimeEvidence.Redux.Types.EDITING_WORKED_TIME_SUCCEED:
			return OnEditingWorkedTimeSucceed(state, action);
		default:
			return { ...state };
	}
}

export default TimeEvidenceReducer;
