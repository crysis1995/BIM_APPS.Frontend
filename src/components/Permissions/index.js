import React from 'react';
import { Alert } from 'react-bootstrap';

export default function ({
	condition = false,
	children,
	Wrapper = React.Fragment,
	className = '',
	show_alert = true,
	message = 'Wygląda na to że nie masz dostępu ;(',
	variant = 'dark',
}) {
	if (condition) return children;
	else {
		if (show_alert)
			return (
				<Wrapper className={className} sm={'auto'}>
					<Alert variant={variant}>{message}</Alert>
				</Wrapper>
			);
		else return <></>;
	}
}
