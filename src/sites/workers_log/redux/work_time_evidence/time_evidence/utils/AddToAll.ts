import { TimeEvidenceState } from "../types/state";
import { ITimeEvidence } from "../types/actions";
import WorkersLogActions from "../../../types";
import { WorkersLogWorkTimeEvidenceResponse } from "../types/payload";

export function AddToAll(
    state: TimeEvidenceState,
    action: ReturnType<ITimeEvidence["fetchWorkerWorkEvidenceEnd"] | ITimeEvidence["editingWorkedTimeSucceed"]>
) {
    if (action.type === WorkersLogActions.WorkTimeEvidence.TimeEvidence.FETCH_WORKER_TIME_EVIDENCE_END) {
        return {
            ...state,
            all: {
                ...state.all,
                ...action.payload.workTimeEvidences.reduce<{ [id: string]: WorkersLogWorkTimeEvidenceResponse }>(
                    (previousValue, currentValue) => {
                        previousValue[currentValue.id] = currentValue;
                        return previousValue;
                    },
                    {}
                )
            }
        };
    } else if (action.type === WorkersLogActions.WorkTimeEvidence.TimeEvidence.EDITING_WORKED_TIME_SUCCEED) {
        return {
            ...state,
            all: { ...state.all, [action.payload.data.id]: action.payload.data }
        };
    }
    return { ...state };
}