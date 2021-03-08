export enum WORKERS_LOG {
	WORK_TIME_EVIDENCE = 'work_time_evidence',
	LABOUR_INPUT = 'labour_input',
}

export enum WORKER_TYPES {
	STEEL_FIXER = 'steel_fixer',
	CARPENTER = 'carpenter',
	GENERAL_CONSTRUCTION = 'general_construction',
}

export const PL_DICTIONARY = {
	[WORKER_TYPES.STEEL_FIXER]: 'Zbrojarze',
	[WORKER_TYPES.CARPENTER]: 'Cieśle',
	[WORKER_TYPES.GENERAL_CONSTRUCTION]: 'Pracownicy ogólnobudowlani',
};
