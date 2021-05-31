import React from 'react';

export const ActualEventKeyAwareRowComponent: React.FunctionComponent<{
	eventKey: string;
	setActualAccordion: (value: ((prevState: string | null) => string | null) | string | null) => void;
}> = ({ children, eventKey, setActualAccordion }) => {
	const decoratedOnClick = () => setActualAccordion((prev) => (prev === eventKey ? null : eventKey));
	return <tr onClick={decoratedOnClick}>{children}</tr>;
};