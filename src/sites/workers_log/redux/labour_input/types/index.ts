import { WORKER_TYPES } from '../../constants';

export namespace LabourInput {
	export namespace Store {
		export interface IGeneral {
			Cranes: any;
			ActiveCrane: string | null;

			ActiveWorkType: WORKER_TYPES | null;
		}
	}
	export namespace Actions {
		export interface IGeneral {
			setCranes: (
				cranes: any,
			) => {
				type: typeof Types.EGeneral.SET_CRANES;
				payload: { cranes: typeof cranes };
			};
			chooseCrane: (
				crane: any,
			) => {
				type: typeof Types.EGeneral.CHOOSE_CRANE;
				payload: { crane: typeof crane };
			};
		}
	}
	export namespace Types {
		export enum EGeneral {
			SET_CRANES = 'workers_log__labour_input__SET_CRANES',
			CHOOSE_CRANE = 'workers_log__labour_input__CHOOSE_CRANE',
		}
	}
}
