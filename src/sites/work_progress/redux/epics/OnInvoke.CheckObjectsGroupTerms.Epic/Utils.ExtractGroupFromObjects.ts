import WorkProgress from '../../../types';
import { RootState } from '../../../../../store';
import { GetAllAcceptanceTermsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetAcceptanceTerms';

export function ExtractGroupFromObjects(
	action: ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['CheckObjectsGroupTerms']>,
	state: RootState,
) {
	const revitIDS = action.payload;
	const allObjects = state.WorkProgress.Monolithic.Upgrading.byRevitId;
	if (!allObjects) return;
	return revitIDS.reduce<TermGroup[]>((previousValue, currentValue) => {
		const crane = allObjects[currentValue].crane;
		const level = allObjects[currentValue].level;
		if (crane && level) {
			if (
				!previousValue.find(
					(x) =>
						x.craneID === crane.id &&
						x.levelID === level.id &&
						x.vertical === allObjects[currentValue].vertical,
				)
			)
				previousValue.push({
					craneID: crane.id,
					levelID: level.id,
					vertical: allObjects[currentValue].vertical,
				});
		}
		return previousValue;
	}, []);
}

export type TermGroup = {
	craneID: string;
	levelID: string;
	vertical: GetAllAcceptanceTermsType.Vertical;
};
