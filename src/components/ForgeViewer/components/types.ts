import ForgeViewer from '../types';
import { EApplications, EApplicationsWithModules } from '../../../sites/types';

export type Options = {
	strictVisibility: boolean;
	startupHideAll: boolean;
	setContextNull: boolean;
	isLevelNecessary:boolean
};

export interface ModuleMethods {
	OnSelect?: (data: number[]) => void;
	OnStart?: (model: ForgeViewer.Payload.View3D | undefined) => void;
}

export interface ModuleUtils {
	methods: ModuleMethods;
	options: Options;
}

export type Apps =
	| EApplications.MODEL_VIEWER
	| EApplicationsWithModules.WORKERS_LOG_LABOUR_INPUT
	| EApplicationsWithModules.WORK_PROGRESS_PREFABRICATED
	| EApplicationsWithModules.WORK_PROGRESS_MONOLITHIC
	| EApplicationsWithModules.CONSTRUCTION_MATERIALS_REINFORCEMENT;