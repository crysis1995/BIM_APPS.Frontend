import { CrewPayload } from '../../crew/types/payload';
import { WORKER_TYPES } from '../../../constants';

export interface WorkerPayload {
	id: string;
	name: string | null;
	crew: CrewPayload['id'] | null;
	// worker_type: WORKER_TYPES;
	is_house_worker: boolean;
	warbud_id: string | null;
}
