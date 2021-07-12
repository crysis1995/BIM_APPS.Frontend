import CrewSelectorComponent from './CrewSelectorComponent';
import MonthsSelectorComponent from './MonthsSelectorComponent';
import React from 'react';
import ComponentAddDeleteCrew from './Component.AddDeleteCrew';

export default function SelectorComponents() {
	return (
		<>
			<CrewSelectorComponent />
			<ComponentAddDeleteCrew />
			<MonthsSelectorComponent />
		</>
	);
}
