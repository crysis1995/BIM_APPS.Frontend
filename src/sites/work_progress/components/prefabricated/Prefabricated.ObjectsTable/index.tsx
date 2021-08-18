import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './table.scss';
import ObjectsTableBody from './ObjectsTable.Body';
import ObjectsTableHeader from './ObjectsTable.Header';
import Loader from '../../../../../components/Loader';
import ObjectSelectors from '../../../redux/prefabricated/objects/selectors';

export const style = {
	input: { width: 50 },
	revitID: { width: 100 },
	dipCode: { width: 'auto' },
	projectNumber: { width: 'auto' },
	status: { width: 100 },
};

function PrefabricatedObjectsTable() {
	const dataLoading = useSelector(ObjectSelectors.Loading);
	if (dataLoading) return <Loader />;
	return (
		<Row>
			<Col xs={12}>
				<Table size={'sm'} className={'table-class'}>
					<ObjectsTableHeader />
					<ObjectsTableBody />
				</Table>
			</Col>
		</Row>
	);
}
export default React.memo(PrefabricatedObjectsTable);
