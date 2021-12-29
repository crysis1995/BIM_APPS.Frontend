import React from 'react';
import { Spinner } from 'react-bootstrap';

type Props = { loading: boolean };

const LoaderComponent: React.FunctionComponent<Props> = ({ loading, children }) => {
	if (loading) return (
		<div className="d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</div>
	);
	else return <>{children}</>;
};
export default LoaderComponent;
