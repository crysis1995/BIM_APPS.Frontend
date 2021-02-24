import { CREW_TYPES } from '../../constants';

export interface Crew {
	id: string;
	name: string;
	isSubcontractor: boolean;
	crewType: CREW_TYPES;
	allWorkers: Worker['id'][];
}

export interface Worker {
	id: string;
	name: string;
	crew: Crew['id'];
	isHouseWorker: boolean;
	labourInput: {
		[key: string]: number;
	} | null;
}
