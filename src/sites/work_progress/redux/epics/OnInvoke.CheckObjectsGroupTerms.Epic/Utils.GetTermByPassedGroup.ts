

import { TermGroup } from './Utils.ExtractGroupFromObjects';
import { RootState } from '../../../../../state';

export function GetTermByPassedGroup(state: RootState, group: TermGroup) {
	const { craneID, levelID, vertical } = group;
	const termID =
		state.WorkProgress.Monolithic.Terms.termsNorm?.byLevel?.[levelID]?.byVertical?.[vertical]?.byCrane?.[craneID];
	if (termID) {
		return state.WorkProgress.Monolithic.Terms.termsAll?.[termID];
	}
}