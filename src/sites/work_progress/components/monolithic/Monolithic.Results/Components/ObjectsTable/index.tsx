import React from 'react';
import { connect } from 'react-redux';

import { Table } from 'react-bootstrap';
import { ObjectsTableHeader } from './Header';
import ObjectsTableBody from './Body';
import ObjectsTableFooter from './Footer';
import LoaderComponent from '../../../../../../../components/Loader/LoaderComponent';
import { RootState } from '../../../../../../../state';

type ComponentProps = {
	allowSelection: boolean;
	showStatuses: boolean;
};
const mapStateToProps = (state: RootState) => ({
	data_loading: state.WorkProgress.Monolithic.Upgrading.loading,
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function ObjectsTable(props: Props) {
	// if (props.data_loading) return ;
	// else
	return (
		<LoaderComponent loading={props.data_loading}>
			<Table size={'sm'}>
				<ObjectsTableHeader allowSelection={props.allowSelection} showStatuses={props.showStatuses} />
				<ObjectsTableBody allowSelection={props.allowSelection} showStatuses={props.showStatuses} />
				<ObjectsTableFooter allowSelection={props.allowSelection} showStatuses={props.showStatuses} />
			</Table>
		</LoaderComponent>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectsTable);
