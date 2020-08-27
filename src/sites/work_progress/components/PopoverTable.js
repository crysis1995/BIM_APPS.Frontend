import React from 'react';
import { Table, Popover } from 'react-bootstrap';
import { get } from 'lodash';
import { v4 } from 'uuid';

function PopoverTable({ labels = [], content = [[], []] }) {
	return (
		<Table borderless size="sm">
			{labels.map((lab, i) => (
				<th key={i}>{lab}</th>
			))}
			{content.map(([name, values]) =>
				values.map((e, idx) => (
					<tr>
						<td>{idx === 0 && name}</td>
						<td style={{ wordWrap: 'break-word' }}>{e}</td>
					</tr>
				)),
			)}
		</Table>
	);
}

export default PopoverTable;
