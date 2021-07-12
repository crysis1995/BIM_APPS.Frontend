import React from 'react';
import { Table } from 'react-bootstrap';
import { ObjectsTableHeaderComponent } from './Header/ObjectsTableHeaderComponent';
import ObjectsTableBodyComponent from './Body';

function ObjectTableComponent() {
	return (
		<Table size={'sm'}>
			<ObjectsTableHeaderComponent />
			<ObjectsTableBodyComponent />
		</Table>
	);
}

export default ObjectTableComponent;
