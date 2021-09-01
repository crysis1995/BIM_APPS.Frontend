import { Button } from 'react-bootstrap';
import React from 'react';

type Props = { isActive: boolean; OnClick: () => void };

const defaultProps = {
	isActive: false,
	OnClick: () => {},
};

function ToggleStatusesOnModelButton(props: Props) {
	return (
		<Button active={props.isActive} onClick={() => props.OnClick()} size={'sm'} variant={'outline-primary'}>
			Pokaż statusy na modelu
		</Button>
	);
}
ToggleStatusesOnModelButton.defaultProps = defaultProps;

export default ToggleStatusesOnModelButton;
