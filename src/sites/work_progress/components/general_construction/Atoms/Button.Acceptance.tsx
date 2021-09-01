import { Button } from 'react-bootstrap';
import React from 'react';

type Props = {
	isDisabled: boolean;
	HandleClickAcceptanceButton: () => void;
	className: string;
};

const defaultProps = {
	isDisabled: false,
	HandleClickAcceptanceButton: () => {},
};

function AcceptanceButton(props: Props) {
	return (
		<Button
			onClick={props.HandleClickAcceptanceButton}
			disabled={props.isDisabled}
			className={props.className}
			size={'sm'}
			variant={'success'}>
			Awansuj wybrane elementy
		</Button>
	);
}

AcceptanceButton.defaultProps = defaultProps;

export default AcceptanceButton;
