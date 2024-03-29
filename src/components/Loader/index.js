import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader({ height = '100px' }) {
	return (
		<div className="d-flex align-items-center justify-content-center" style={{ height: height }}>
			<Spinner animation="border" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</div>
	);
}
export default Loader;
