import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { v4 } from 'uuid';
import { Placement } from 'react-bootstrap/Overlay';

type Props = {
	message: string;
	children: JSX.Element;
	show: boolean;
	placement?: Placement;
};

export const TooltipComponent = (props: Props) => {
	const delay = 500;
	const tooltipsShow = true;
	return props.show ? (
		<OverlayTrigger
			popperConfig={{ enabled: tooltipsShow }}
			delay={delay}
			placement={props.placement || 'top'}
			overlay={<Tooltip id={v4()}>{props.message}</Tooltip>}>
			{props.children}
		</OverlayTrigger>
	) : (
		props.children
	);
};
