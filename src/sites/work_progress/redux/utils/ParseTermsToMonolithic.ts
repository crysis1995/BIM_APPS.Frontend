import WorkProgress from '../../types';

export function ParseTermsToMonolithic(termsArray: WorkProgress.Monolithic.Terms.Payload.FetchEnd) {
	return termsArray.reduce<WorkProgress.Monolithic.Terms.StoreStructure.Terms>(
		(previousValue, currentValue) => {
			const level = currentValue.level?.id;
			const crane = currentValue.crane?.id;
			const vertical = currentValue.vertical;
			if (level && crane) {
				if (!previousValue.byLevel[level]) previousValue.byLevel[level] = { byVertical: {} };
				if (!previousValue.byLevel[level].byVertical[vertical])
					previousValue.byLevel[level].byVertical[vertical] = { byCrane: {} };
				previousValue.byLevel[level].byVertical[vertical].byCrane[crane] = currentValue.id;
			}

			return previousValue;
		},
		{ byLevel: {} },
	);
}
