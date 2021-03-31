// import { WorkersLogWorkTimeEvidenceResponse } from "../../time_evidence/types/payload";

// export function GetDailyEvidences(workTimeEvidences: WorkersLogWorkTimeEvidenceResponse[]) {
// 	if (workTimeEvidences.length >= 1) {
// 		return workTimeEvidences.reduce<DailyEvidence>((previousValue, currentValue) => {
// 			previousValue[currentValue.date] = currentValue;
// 			return previousValue;
// 		}, {});
// 	} else return null;
// }

export {};
