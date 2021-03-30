import { CrewPayload, CrewSummary } from './payload';

export interface CrewState {
	all: null | { [key: string]: CrewPayload };
	loading: boolean;
	actual: CrewPayload['id'] | null;
	loading_summary: boolean;
	summary: null | CrewSummary;
}
