import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {
	message: string;
	children: JSX.Element;
	show: boolean;
};

export const TooltipComponent = (props: Props) =>
	props.show ? (
		<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{props.message}</Tooltip>}>
			{props.children}
		</OverlayTrigger>
	) : (
		props.children
	);
