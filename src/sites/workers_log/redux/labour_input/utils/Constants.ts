import { TabClassifier } from './CurrentElements.Filter/Types/TabClassifier.Interface';
import { GetObjectsByLevelType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';

export type WorkersLogLabourInputStatusLegendType = {
	[key in keyof TabClassifier]?: {
		[key in  GetObjectsByLevelType.StatusEnum]?: {
			color: string;
			alpha: number;
		};
	};
};

export const WorkersLogLabourInputColorMap: WorkersLogLabourInputStatusLegendType = {
	['default']: {
		[ GetObjectsByLevelType.StatusEnum.Finished]: { color: '#494949', alpha: 0.7 },
		[ GetObjectsByLevelType.StatusEnum.InProgress]: { color: '#009b03', alpha: 0.7 },
	},
};
