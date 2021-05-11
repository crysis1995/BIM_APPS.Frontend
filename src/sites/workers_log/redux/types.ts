import { Crew } from './work_time_evidence/crew/types/types';
import { Workers } from './work_time_evidence/worker/types/types';
import { General } from './work_time_evidence/general/types/types';
import { TimeEvidence } from './work_time_evidence/time_evidence/types/types';

export default class WorkersLogActions {
	static WorkTimeEvidence = {
		Crew,
		Workers,
		TimeEvidence,
		General,
	};
}
