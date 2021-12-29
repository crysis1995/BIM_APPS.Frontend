import { createSelector } from 'reselect';

import { ObjectsSelector } from '../Body/objects.Selector';
import { RootState } from '../../../../../../../../state';

export const CountSum = createSelector(
	(state: RootState) => ObjectsSelector(state),
	(objects): SumOf => {
		return objects.reduce<SumOf>(
			(prev, acc) => {
				if (acc) {
					prev.entities++;
					prev.volume += acc.volume;
				}
				return prev;
			},
			{ volume: 0, entities: 0 },
		);
	},
);

export interface SumOf {
	volume: number;
	entities: number;
}
