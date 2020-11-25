import React from 'react';
import { v4 } from 'uuid';
import { config } from '../../../../../config';

function Legend(props) {
	return Object.keys(config.ACCEPTANCE.MONOLITHIC.legend).map((key) => (
		<div
			key={v4()}
			className={'text-center text-dark'}
			style={{ backgroundColor: config.ACCEPTANCE.MONOLITHIC.legend[key].color }}>
			{config.ACCEPTANCE.MONOLITHIC.legend[key].option}
		</div>
	));
}

export default Legend;
