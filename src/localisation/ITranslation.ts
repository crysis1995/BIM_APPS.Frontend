import { OTHER_WORK_TYPE, WORKERS_LOG__WORKERS_TYPE } from '../services/graphql.api.service/CONSTANTS/GeneralTypes';

export type TranslationsUnion = WORKERS_LOG__WORKERS_TYPE | OTHER_WORK_TYPE | 'elements';
export type ITranslation = {
	[key in TranslationsUnion]: string;
};
