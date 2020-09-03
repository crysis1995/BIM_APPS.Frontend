import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import { config } from '../../../../../config';
import { handleGenerateRaport } from './utils';

function JobsSummary(props) {
	const [loading, setLoading] = useState(false);

	const handleDownload = (e) => {
		console.log(e);
	};

	return (
		<a onClick={(e) => handleDownload(e)} href={`${config.bim_apps_api.url}/raports-generator`} download>
			<Button variant="outline-secondary" size="sm">
				Wygeneruj zbiorczy raport
			</Button>
		</a>
	);
}

export default JobsSummary;
