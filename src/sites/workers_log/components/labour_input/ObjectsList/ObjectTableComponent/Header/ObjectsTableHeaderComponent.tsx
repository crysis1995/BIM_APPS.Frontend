import HeaderSelection from './headerSelection';
import React from 'react';

export function ObjectsTableHeaderComponent() {
	return (
		<thead>
			<tr>
				{/*<th>*/}
				{/*/!*	<HeaderSelection />*!/*/}
				{/*</th>*/}
				{/*<th>Element [Revit ID]</th>*/}
				{/*<th>Status</th>*/}
				{/*<th>Nakład pracy</th>*/}
				<th colSpan={3}>Pozycje</th>
				<th>Nakład pracy</th>
			</tr>
		</thead>
	);
}
