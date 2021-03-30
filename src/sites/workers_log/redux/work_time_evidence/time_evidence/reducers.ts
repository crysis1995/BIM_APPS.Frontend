import { ITimeEvidence, TimeEvidenceActionTypes } from './types/actions';
import { ISummaryByDate, ISummaryByWorker, TimeEvidenceState } from './types/state';
import WorkersLogActions from '../../types';
import { UpdateWorkerTimeSucceedResponse, WorkersLogWorkTimeEvidenceResponse } from './types/payload';
import { TimeEvidence } from './types/types';
import { AddToAll } from './utils/AddToAll';
import { AddToWorkEvidence } from './utils/AddToWorkEvidence';
import { AddToAllWorkersAndDates } from './utils/AddToAllWorkersAndDates';

const INITIAL_STATE: TimeEvidenceState = {
	all_by_days: null,
	all_by_workers: null,
	loading: false,
	all: null,
	summary: { by_dates: null, by_workers: null },
	work_evidence: null,
	blocked: null,
	editing: null,
};

function AddToSummary(state: TimeEvidenceState): TimeEvidenceState {
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
			by_workers: Object.entries(state.all_by_workers || {}).reduce<ISummaryByWorker>(
				(previousValue, [worker, ids]) => {
					previousValue[worker] = CountSum(ids);
					return previousValue;
				},
				{},
			),
			by_dates: Object.entries(state.all_by_days || {}).reduce<ISummaryByDate>((previousValue, [date, ids]) => {
				previousValue[date] = CountSum(ids);
				return previousValue;
			}, {}),
		},
	};
}

function OnEditingWorkedTimeSucceed(
	state: TimeEvidenceState,
	action: ReturnType<ITimeEvidence['fetchWorkerWorkEvidenceEnd'] | ITimeEvidence['editingWorkedTimeSucceed']>,
) {
	state = AddToAll(state, action);
	state = AddToWorkEvidence(state, action);
	state = AddToAllWorkersAndDates(state, action);
	state = AddToSummary(state);
	return { ...state };
}

function OnEndFetchWorkerTimeEvidence(
	state: TimeEvidenceState,
	action: ReturnType<ITimeEvidence['fetchWorkerWorkEvidenceEnd'] | ITimeEvidence['editingWorkedTimeSucceed']>,
) {
	state = AddToAll(state, action);
	state = AddToWorkEvidence(state, action);
	state = AddToAllWorkersAndDates(state, action);
	state = AddToSummary(state);
	return { ...state };
}

function OnFetchWorkerTimeEvidenceFinishAll(state: TimeEvidenceState) {
	state = AddToSummary(state);
	return {
		...state,
		loading: false,
	};
}

function TimeEvidenceReducer(state = INITIAL_STATE, action: TimeEvidenceActionTypes) {
	switch (action.type) {
		case WorkersLogActions.WorkTimeEvidence.TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_START:
			return { ...state, loading: true };
		case WorkersLogActions.WorkTimeEvidence.TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_FINISH_ALL:
			return OnFetchWorkerTimeEvidenceFinishAll(state);
		case WorkersLogActions.WorkTimeEvidence.TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_END:
			return OnEndFetchWorkerTimeEvidence(state, action);
		case WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_START:
			return { ...state, editing: action.payload.data };
		case WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_CANCEL:
			return { ...state, editing: null };
		case WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_WORKED_TIME_SUCCEED:
			return OnEditingWorkedTimeSucceed(state, action);
		default:
			return { ...state };
	}
}

export default TimeEvidenceReducer;
