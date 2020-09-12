import React from 'react';
import { Table } from 'react-bootstrap';
import { v4 } from 'uuid';


function PopoverTable({ labels = [], content = [[], []] }) {
	return (
		<Table style={{ wordWrap: 'normal' }} borderless size="sm">
			<thead>
				<tr>{labels.length && labels.map((lab) => <th key={v4()}>{lab}</th>)}</tr>
			</thead>
			<tbody>
				{content.length &&
					content
						.sort(([a_id], [b_id]) => {
							a_id[0].localeCompare(b_id[0]);
						})
						.map(([name, values]) =>
							values.map((e, idx) => (
								<tr key={v4()}>
									<td>{idx === 0 && name}</td>
									<td style={{ wordWrap: 'normal' }}>{e}</td>
								</tr>
							)),
						)}
			</tbody>
		</Table>
	);
}
export default PopoverTable;
