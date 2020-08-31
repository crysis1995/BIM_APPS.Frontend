import React from 'react';
import JobsSummary from './JobsSummary';

function Tools(props) {
	return (
		<div className="mb-4">
			<div>Narzędzia aplikacji</div>
			<div className="pt-1">
				<JobsSummary />
			</div>
		</div>
	);
}

export default Tools;
