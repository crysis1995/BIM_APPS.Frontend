import { CrewPayload } from './payload';
import { WORKER_TYPES } from '../../../constants';

export interface CrewState {
	all: null | { [key: string]: CrewPayload };
	loading: boolean;
	actual: CrewPayload['id'] | null;
}
