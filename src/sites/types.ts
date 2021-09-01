export enum EApplications {
	WORKERS_LOG = 'workers_log',
	WORK_PROGRESS = 'work_progress',
	MODEL_VIEWER = 'model_viewer',
	CONSTRUCTION_MATERIALS = 'construction_materials',
}

export enum EApplicationsWithModules {
	WORK_PROGRESS_MONOLITHIC = 'work_progress.monolithic',
	WORK_PROGRESS_PREFABRICATED = 'work_progress.prefabricated',
	WORK_PROGRESS_GENERAL_CONSTRUCTION = 'work_progress.general_construction',
	WORKERS_LOG_WORK_TIME_EVIDENCE = 'workers_log.work_time_evidence',
	WORKERS_LOG_LABOUR_INPUT = 'workers_log.labour_input',
	CONSTRUCTION_MATERIALS_REINFORCEMENT = 'construction_materials.reinforcement',
}

export type ApplicationsTypes = EApplications | EApplicationsWithModules