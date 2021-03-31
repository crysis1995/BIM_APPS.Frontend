import { IEvidencesByDate, IEvidencesByWorker, TimeEvidenceState } from "../types/state";
import { ITimeEvidence } from "../types/actions";
import { UpdateWorkerTimeSucceedResponse, WorkersLogWorkTimeEvidenceResponse } from "../types/payload";
import { TimeEvidence } from "../types/types";
import WorkersLogActions from "../../../types";

export function AddToAllWorkersAndDates(
    state: TimeEvidenceState,
    action:
        | ReturnType<ITimeEvidence["fetchWorkerWorkEvidenceEnd"]>
        | ReturnType<ITimeEvidence["editingWorkedTimeSucceed"]>
): TimeEvidenceState {
    function ExtractEvidencesByWorkers(
        state: TimeEvidenceState,
        action:
            | ReturnType<ITimeEvidence["fetchWorkerWorkEvidenceEnd"]>
            | ReturnType<ITimeEvidence["editingWorkedTimeSucceed"]>
    ) {
        let evidenceObjects: Array<WorkersLogWorkTimeEvidenceResponse | UpdateWorkerTimeSucceedResponse> = [];
        if (action.type === TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_END)
            evidenceObjects = action.payload.workTimeEvidences;
        else evidenceObjects = [action.payload.data];

        return evidenceObjects.reduce<IEvidencesByWorker>((previousValue, currentValue) => {
            if (previousValue[action.payload.worker_id]) {
                if (!previousValue[action.payload.worker_id].includes(currentValue.id.toString())) {
                    previousValue[action.payload.worker_id].push(currentValue.id.toString());
                }
            } else {
                previousValue[action.payload.worker_id] = [currentValue.id.toString()];
            }
            return previousValue;
        }, state.all_by_workers || {});
    }

    function ExtractEvidencesByDates(
        state: TimeEvidenceState,
        action:
            | ReturnType<ITimeEvidence["fetchWorkerWorkEvidenceEnd"]>
            | ReturnType<ITimeEvidence["editingWorkedTimeSucceed"]>
    ) {
        let evidenceObjects: Array<WorkersLogWorkTimeEvidenceResponse | UpdateWorkerTimeSucceedResponse> = [];
        if (action.type === TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_END)
            evidenceObjects = action.payload.workTimeEvidences;
        else evidenceObjects = [action.payload.data];

        return evidenceObjects.reduce<IEvidencesByDate>((prev, acc) => {
            if (acc.date in prev) {
                if (!prev[acc.date].includes(acc.id.toString())) prev[acc.date].push(acc.id.toString());
            } else {
                prev[acc.date] = [acc.id.toString()];
            }
            return prev;
        }, state.all_by_days || {});
    }

    if (
        action.type === WorkersLogActions.WorkTimeEvidence.TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_END ||
        action.type === WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_WORKED_TIME_SUCCEED
    ) {
        return {
            ...state,
            all_by_workers: ExtractEvidencesByWorkers(state, action),
            all_by_days: ExtractEvidencesByDates(state, action)
        };
    }
    return { ...state };
}