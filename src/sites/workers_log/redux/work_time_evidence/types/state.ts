import { CREW_TYPES } from '../../constants';
import { Crew } from './payload';

export interface WorkTimeEvidenceState {
	crews: null | { [key: string]: Crew };
	crews_loading: boolean;
	choose_crew: Crew['id'] | null;
	workers: null | { [key: string]: Worker };
	labour_input: {
		[key: string]: {
			[K in keyof typeof CREW_TYPES]?: {
				summary_worked_hours: number;
			};
		};
	} | null;
}
