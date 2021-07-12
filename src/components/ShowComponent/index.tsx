import React from 'react';

type Props = {
	when: boolean;
};
const ShowComponent: React.FunctionComponent<Props> = (props) => {
	if (props.when) return <>{props.children}</>;
	return <></>;
};

export default ShowComponent;
