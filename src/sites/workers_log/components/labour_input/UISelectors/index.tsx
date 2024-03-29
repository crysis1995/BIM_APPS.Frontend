import React from 'react';
import DateSelectorComponent from './DateSelectorComponent';
import LevelSelectorComponent from './LevelSelectorComponent';
import CrewSelectorComponent from './CrewSelectorComponent';

function UISelectorsComponent() {
	return (
		<div className={'pb-3 border-bottom d-flex flex-row'}>
			<div className={'flex-fill pr-2'}>
				<LevelSelectorComponent />
			</div>
			<div className={'flex-fill pr-2'}>
				<DateSelectorComponent />
			</div>
			<div className={'flex-fill pr-2'}>
				<CrewSelectorComponent />
			</div>
		</div>
	);
}

export default UISelectorsComponent;
