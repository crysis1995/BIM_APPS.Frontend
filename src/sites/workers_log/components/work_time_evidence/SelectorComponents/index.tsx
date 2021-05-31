import WorkerTypeSelector from './WorkerTypeSelector';
import CrewSelectorComponent from './CrewSelectorComponent';
import MonthsSelectorComponent from './MonthsSelectorComponent';
import React from 'react';

export default function SelectorComponents() {
	return (
		<>
			<WorkerTypeSelector />
			<CrewSelectorComponent />
			<MonthsSelectorComponent />
		</>
	);
}
