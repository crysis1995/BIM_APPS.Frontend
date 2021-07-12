import React from 'react';
import classNames from 'classnames';

const ActualEventKeyRowViewer: React.FunctionComponent<{ show: boolean }> = ({ children, show }) => {
	return <tr className={classNames({ collapse: true, show: show })}>{children}</tr>;
};
export default ActualEventKeyRowViewer;
