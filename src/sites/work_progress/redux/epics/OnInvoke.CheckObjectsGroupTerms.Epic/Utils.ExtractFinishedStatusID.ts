import { RootState } from '../../../../../store';
import { GetStatusesType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetStatuses';

export function ExtractFinishedStatusID(state: RootState) {
	const statuses = state.WorkProgress.Monolithic.General.statuses;
	if (statuses) {
		return Object.values(statuses).filter((x) => x.name === GetStatusesType.DBStatuses.Finished)[0].id;
	}
}