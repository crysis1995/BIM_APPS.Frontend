import { Crew } from './work_time_evidence/crew/types/types';
import { Workers } from './work_time_evidence/worker/types/types';
import { General } from './work_time_evidence/general/types/types';
import { WorkersLogGeneral } from './general/types/types';

export default class WorkersLogActions {
	static WorkTimeEvidence = {
		Crew,
		Workers,
		General,
	};
	static General = WorkersLogGeneral;
}
