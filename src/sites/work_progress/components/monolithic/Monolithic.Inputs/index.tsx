import React from 'react';
import LevelSelector from './LevelSelector.Component';
import DateComponent from './Date.Component';

function MonolithicInputs() {
	return (
		<div className="d-flex flex-row w-100 pb-2">
			<LevelSelector />
			<DateComponent />
		</div>
	);
}

export default MonolithicInputs;
