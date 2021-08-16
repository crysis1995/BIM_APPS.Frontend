import React from 'react';
import { Col, Table } from 'react-bootstrap';
import ComponentTermsTableHeader from './Component.TermsTable.Header';
import TermsTableBody from './Component.TermsTable.Body';

function ComponentTermsTable() {
	return (
		<Col xs={12} className="h-100">
			<Table size={'sm'}>
				<ComponentTermsTableHeader />
				<TermsTableBody />
			</Table>
		</Col>
	);
}
export default ComponentTermsTable;
