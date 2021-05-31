import React from 'react';
import classNames from 'classnames';

export const ActualEventKeyRowViewer: React.FunctionComponent<{ eventKey: string; actualAccordion: string | null }> = ({
	children,
	eventKey,
	actualAccordion,
}) => {
	return <tr className={classNames({ collapse: true, show: actualAccordion === eventKey })}>{children}</tr>;
};
