import { OTHER_WORK_TYPE, WORKERS_LOG__WORKERS_TYPE } from '../services/graphql.api.service/CONSTANTS/GeneralTypes';
import { ELEMENT_DESCRIPTIONS, TOOLTIPS_MESSAGES } from '../config';
import { Constants } from '../sites/work_progress/redux/constants';
import { ClassifierGroupEnum, ObjectParams } from '../sites/work_progress/redux/utils/ObjectGroupClassifier';
import { GetObjectsByLevelType } from '../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';

export type TranslationsUnion =
	| WORKERS_LOG__WORKERS_TYPE
	| OTHER_WORK_TYPE
	| 'elements'
	| TOOLTIPS_MESSAGES
	| ELEMENT_DESCRIPTIONS
	| Constants.ClassificationDefinitions
	| Constants.MonolithicTabs
	| Constants.TermTypes
	| ObjectParams
	| ClassifierGroupEnum
	| Constants.WorkProgressElementStatus
	| GetObjectsByLevelType.StatusEnum;

export type ITranslation = {
	[key in TranslationsUnion]: string;
};
