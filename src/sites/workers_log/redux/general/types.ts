import { ReturnTypeFromInterface } from '../../../../types/ReturnTypeFromInterface';
import { GetCrewsAndTheirCrewSummariesType } from '../../../../services/graphql.api.service/CONSTANTS/Queries/GetCrewsAndTheirCrewSummaries';

export namespace WorkersLogGeneral {
	export namespace Redux {
		export interface Store {
			initialized: boolean;
			last_initialized: Date;
			all_crews: { [key: string]: GetCrewsAndTheirCrewSummariesType.WorkersLogCrew } | null;
		}
		export interface IActions {
			workersLogInitialize: () => { type: WorkersLogGeneral.Redux.Types.WORKERS_LOG_INITIALIZE };
			FetchCrewsData: (
				data: GetCrewsAndTheirCrewSummariesType.Response,
			) => { type: WorkersLogGeneral.Redux.Types.WORKERS_LOG_FETCH_CREWS_DATA; payload: typeof data };
		}
		export type Actions = ReturnTypeFromInterface<WorkersLogGeneral.Redux.IActions>;
		export enum Types {
			WORKERS_LOG_INITIALIZE = 'workers_log__INITIALIZE',
			WORKERS_LOG_FETCH_CREWS_DATA = 'workers_log__FETCH_CREWS_DATA',
		}
	}
	export namespace Payload {}
}
