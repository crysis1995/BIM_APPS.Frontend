import { createSelector } from 'reselect';

import { Constants } from '../../../../../../../../../work_progress/redux/constants';
import LocaleNameCore from '../../../../../../../../../../localisation/LocaleName.Core';
import { Lang } from '../../../../../../../../../../localisation/Lang';
import WorkersLog from '../../../../../../../../types';
import { RootState } from '../../../../../../../../../../state';

function ConcatStringArrayByMaxStringLength(strings: Array<string>): { long: string; short: string } {
	const MAX_TITLE_LENGTH = 50;
	let short = '';
	short = strings.join(', ');
	let long = short;
	if (short.length > MAX_TITLE_LENGTH) short = short.substring(0, MAX_TITLE_LENGTH - 3) + '...';
	return {
		long,
		short,
	};
}

export const objectGroupNameSelector = createSelector(
	(state: RootState) => state.WorkersLog.LabourInput.Objects.AllObjects,
	(
		state: RootState,
		componentProps: { groupedObject: WorkersLog.LabourInput.Payload.Objects.WorkTimeGroupedObjects },
	) => componentProps.groupedObject,
	(allObjects, groupedObjects) => {
		if (allObjects) {
			let uniqNames = new Set();
			groupedObjects.objects
				.filter(({ id }) => id in allObjects)
				.map(({ id }) => allObjects[id].VCF_Realisation)
				.filter((x) => x !== null)
				.forEach((name) => uniqNames.add(name));
			return ConcatStringArrayByMaxStringLength(
				[...uniqNames].map((name) => {
					let data = name as Constants.ClassificationDefinitions;
					return LocaleNameCore({ value: data, lang: Lang.PL });
				}),
			);
		}
	},
);
