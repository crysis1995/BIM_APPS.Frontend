import { RootState } from '../../../../../store';
import { TermGroup } from './Utils.ExtractGroupFromObjects';

export function GetObjectsIncludedInPassedGroup(state: RootState, group: TermGroup) {
	const { craneID, levelID, vertical } = group;
	const revitIDS =
		state.WorkProgress.Monolithic.Upgrading.byLevel?.[levelID]?.byVertical?.[vertical]?.byCrane?.[craneID];
	const byRevitID = state.WorkProgress.Monolithic.Upgrading.byRevitId;
	if (revitIDS && byRevitID) {
		return revitIDS.map((revitID) => byRevitID[revitID]);
	}
}