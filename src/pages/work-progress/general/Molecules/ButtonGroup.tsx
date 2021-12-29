import AcceptanceButton from '../Atoms/Button.Acceptance';
import React from 'react';
import ToggleStatusesOnModelButton from '../Atoms/Button.ToggleStatusesOnModel';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../state';
import { ToggleStatusesOnModelButton_IsActiveSelector } from '../Utils/ToggleStatusesOnModelButton_IsActiveSelector';
import { ToggleStatusesOnModelButton_IsDisabledSelector } from '../Utils/ToggleStatusesOnModelButton_IsDisabledSelector';
import { WorkProgress } from '../../../../state/WorkProgress';

type ComponentProps = {
	OnClickAcceptanceButton: () => void;
};

function ButtonGroup(props: ComponentProps) {
	const ToggleStatusesOnModelButton_IsActive = useSelector(
		ToggleStatusesOnModelButton_IsActiveSelector,
	);
	const ToggleStatusesOnModelButton_IsDisabled = useSelector(
		ToggleStatusesOnModelButton_IsDisabledSelector,
	);
	const AcceptanceButton_IsDisabledAcceptanceButton = useSelector((state: RootState) => false);
	const dispatch = useDispatch();
	function ClickStatusesOnModelButton() {
		dispatch(WorkProgress.Actions.General.ToggleStatusOnModelVisibility());
	}
	return (
		<>
			<ToggleStatusesOnModelButton
				isDisabled={ToggleStatusesOnModelButton_IsDisabled}
				isActive={ToggleStatusesOnModelButton_IsActive}
				OnClick={ClickStatusesOnModelButton}
			/>
			<AcceptanceButton
				className={'float-right'}
				isDisabled={AcceptanceButton_IsDisabledAcceptanceButton}
				HandleClickAcceptanceButton={props.OnClickAcceptanceButton}
			/>
		</>
	);
}
export default ButtonGroup;
