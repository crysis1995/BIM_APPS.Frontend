import { GetAllAcceptanceTermsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetAcceptanceTerms';
import { GetObjectsByLevelType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import { FinishUpdateIsNeeded, StartUpdateIsNeeded } from './DateClassifierClasses';
import { Constants } from '../../constants';
import { DatesToUpdate } from './index';

export function GetDatesToUpdate(
	term: GetAllAcceptanceTermsType.AcceptanceTerm,
	objects: GetObjectsByLevelType.AcceptanceObject[],
): DatesToUpdate {
	let start = new StartUpdateIsNeeded(objects.length, term);
	start.isNeedToUpdate();
	let finish = new FinishUpdateIsNeeded(objects.length, term);
	finish.isNeedToUpdate();
	objects.forEach((item) => {
		start.qualifiedStatus(item);
		finish.qualifiedStatus(item);
	});
	let Output: DatesToUpdate = {};
	if (start.isQualifiedToUpdate() && start.date) Output[Constants.TermTypes.REAL_START] = start.date;
	if (finish.isQualifiedToUpdate() && finish.date) Output[Constants.TermTypes.REAL_FINISH] = finish.date;

	return Output;
}