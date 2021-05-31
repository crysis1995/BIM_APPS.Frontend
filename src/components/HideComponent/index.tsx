import React from 'react';
type Props = {
	when: boolean;
};
const HideComponent: React.FunctionComponent<Props> = (props) => {
	if (!props.when) return <>{props.children}</>;
	return <React.Fragment  />;
};

export default HideComponent;
