import { CrewPayload } from './payload';
import { WORKER_TYPES } from '../../../constants';

export interface CrewState {
	all: null | { [key: string]: CrewPayload };
	loading: boolean;
	actual: CrewPayload['id'] | null;
	// labour_input: {
	// 	[key: string]: {
	// 		[K in keyof typeof WORKER_TYPES]?: {
	// 			summary_worked_hours: number;
	// 		};
	// 	};
	// } | null;
}
