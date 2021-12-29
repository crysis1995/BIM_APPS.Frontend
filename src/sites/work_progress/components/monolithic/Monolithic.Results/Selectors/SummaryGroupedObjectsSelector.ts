import { createSelector } from 'reselect';

import { Classifier, ClassifierGroupEnum, ObjectParams } from '../../../../redux/utils/ObjectGroupClassifier';
import { GetObjectsByLevelType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import { RootState } from '../../../../../../state';

export type ClassifiedObjects = {
	[key in ClassifierGroupEnum]?: GetObjectsByLevelType.AcceptanceObject[];
};

export type Output = {
	name: ClassifierGroupEnum;
	parameters: {
		[K in keyof typeof Classifier._classifier[ClassifierGroupEnum]['parameters']]: number;
	};
};

export const SummaryGroupedObjectsSelector = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.actualElements,
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.selectedElements,
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.byRevitId,
	(state: RootState, { isFiltered }: { isFiltered: boolean }) => isFiltered,
	(actualElements, selectedElements, byRevitId, isFiltered) => {
		if (!byRevitId) return [];
		let groupedObjects = selectedElements
			.filter((revitID) => (isFiltered ? actualElements.includes(revitID) : revitID))
			.reduce<ClassifiedObjects>((previousValue, revitID) => {
				const object = byRevitId[revitID];
				const classifiedGroup = Classifier.CheckValue(object.VCF_Realisation);
				if (classifiedGroup) {
					if (!previousValue[classifiedGroup.name]) {
						previousValue[classifiedGroup.name] = [];
					}
					previousValue[classifiedGroup.name]?.push(object);
				}
				return previousValue;
			}, {});

		return Object.keys(groupedObjects).map((key) => {
			const groupKey = key as ClassifierGroupEnum;
			const Output: Output = {
				name: groupKey,
				parameters: {},
			};
			const objects = groupedObjects[groupKey];
			if (objects) {
				const paramKeys = Object.keys(Classifier._classifier[groupKey].parameters);
				paramKeys.forEach((key) => {
					const paramKey = key as ObjectParams;
					const classifierMethod = Classifier._classifier[groupKey].parameters[paramKey];
					if (classifierMethod) {
						Output.parameters[paramKey] = classifierMethod(
							objects.map((item) => {
								if (item[paramKey]) return item[paramKey] || 0;
								else return 0;
							}),
						);
					}
				});
			}
			return Output;
		});
	},
);
