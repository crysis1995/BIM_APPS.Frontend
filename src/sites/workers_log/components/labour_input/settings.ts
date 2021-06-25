import { GetObjectsByLevelType } from '../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';

export const StatusesColor: { [key in GetObjectsByLevelType.StatusEnum]: string } = {
	[GetObjectsByLevelType.StatusEnum.InProgress]: '#387bff',
	[GetObjectsByLevelType.StatusEnum.Finished]: '#25ce00',
};
