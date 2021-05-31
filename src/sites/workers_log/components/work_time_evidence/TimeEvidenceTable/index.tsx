import { Row, Table } from 'react-bootstrap';
import HeadersComponent from './HeaderComponent';
import WorkersListComponents from './WorkersListComponents';
import React from 'react';

export default function TimeEvidenceTable() {
	return (
		<Row noGutters={true}>
			<Table size={'sm'} className={'work-time-evidence-table'} id={'printable-report-area'}>
				<HeadersComponent />
				<tbody>
					<WorkersListComponents />
				</tbody>
			</Table>
		</Row>
	);
}
