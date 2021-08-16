import React from 'react';

export function ObjectsTableHeaderComponent() {
	return (
		<thead>
			<tr>
				<th colSpan={3}>Pozycje</th>
				<th style={{ maxWidth: 100, width: 100 }}>Nakład pracy</th>
			</tr>
		</thead>
	);
}
