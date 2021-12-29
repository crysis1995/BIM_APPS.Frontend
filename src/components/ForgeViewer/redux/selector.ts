import { RootState } from '../../../state';

export function ModelSelector(state:RootState) {
	return state.CMSLogin.CurrentProject?.models;
}