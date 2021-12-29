

import { EMPTY, merge, of } from 'rxjs';
import GeneralActions from '../../monolithic/general/actions';
import { Constants } from '../../constants';
import { RootState } from '../../../../../state';

export function SetProjectUtilsEpic(state: RootState) {
	const actualProject = state.CMSLogin.actual_project;
	if (actualProject) {
		return merge(
			of(
				GeneralActions.SetLevelOptions(actualProject.levels_all),
				GeneralActions.SetCraneOptions(actualProject.cranes_all),
				GeneralActions.SetActiveTab(Constants.MonolithicTabs.SCHEDULED),
			),
		);
	}
	return EMPTY;
}
