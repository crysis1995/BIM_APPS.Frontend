import AcceptanceButton from '../Atoms/Button.Acceptance';
import React from 'react';
import ToggleStatusesOnModelButton from '../Atoms/Button.ToggleStatusesOnModel';
import { RootState } from '../../../../../store';
import { useSelector } from 'react-redux';

type ComponentProps = {
	ToggleStatusesOnModelButtonSelector: (state: RootState) => boolean;
	OnClickToggleStatusesOnModelButton: () => void;
	IsDisabledAcceptanceButtonSelector: (state: RootState) => boolean;
	OnClickAcceptanceButton: () => void;
};

function ButtonGroup(props: ComponentProps) {
	const isActiveToggleStatusesOnModelButton = useSelector(props.ToggleStatusesOnModelButtonSelector);
	const isDisabledAcceptanceButton = useSelector(props.IsDisabledAcceptanceButtonSelector);
	return (
		<>
			<ToggleStatusesOnModelButton
				isActive={isActiveToggleStatusesOnModelButton}
				OnClick={props.OnClickToggleStatusesOnModelButton}
			/>
			<AcceptanceButton
				className={'float-right'}
				isDisabled={isDisabledAcceptanceButton}
				HandleClickAcceptanceButton={props.OnClickAcceptanceButton}
			/>
		</>
	);
}
export default ButtonGroup;
