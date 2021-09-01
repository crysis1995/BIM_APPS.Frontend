import React from 'react';
import ButtonGroup from '../Molecules/ButtonGroup';
import { RootState } from '../../../../../store';
import { useDispatch } from 'react-redux';






function ButtonGroupWithActions() {
	const dispatch = useDispatch();
	return (
		<ButtonGroup
			ToggleStatusesOnModelButtonSelector={(state: RootState) => state.CMSLogin.is_login}
			OnClickToggleStatusesOnModelButton={() => {}}
			IsDisabledAcceptanceButtonSelector={(state: RootState) => state.CMSLogin.is_login}
			OnClickAcceptanceButton={() => {}}
		/>
	);
}

export default ButtonGroupWithActions;
