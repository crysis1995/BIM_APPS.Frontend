import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import ErrorBoundary from '../../../../components/ErrorBoundary';
import Loader from '../../../../components/Loader';
import UNITS from '../../../../components/Units';
import { selectRoom } from '../../redux/actions/rooms_actions';
import { UPGRADING_BY } from '../../redux/types/constans';
import TableComponent from './TableComponent';
import UpgradingByDepartment from './UpgradingByDepartment';
import UpgradingByRooms from './UpgradingByRooms';
import UpgradingType from './UpgradingType';

function OdbioryComponent(props) {
	return (
		<ErrorBoundary>
			<Col
				className={'d-flex flex-column'}
				style={{
					paddingLeft: 0,
					paddingRight: 0,
				}}>
				<UpgradingType />
				{props.upgrading_by === UPGRADING_BY.ROOMS && <UpgradingByRooms />}
				{props.upgrading_by === UPGRADING_BY.DEPARTMENT && <UpgradingByDepartment />}
				{props.jobs_fetched && props.selected_rooms_length > 0 ? (
					<Col
						className="d-flex flex-column"
						style={{
							paddingLeft: 0,
							paddingRight: 0,
							overflowY: 'scroll',
						}}>
						{props.jobs_loading || props.objects_loading ? (
							<div className="pt-5">
								<Loader height={'100%'} />
							</div>
						) : (
							<TableComponent />
						)}
					</Col>
				) : null}
			</Col>
		</ErrorBoundary>
	);
}
const mapStateToProps = (state) => ({
	upgrading_by: state.Odbiory.OdbioryComponent.awansowanie.by,
	jobs_loading: state.Odbiory.Jobs.jobs_loading,
	objects_loading: state.Odbiory.Objects.objects_loading,
	jobs_fetched: state.Odbiory.Jobs.jobs_fetched,
	selected_rooms_length: state.Odbiory.Rooms.selected_rooms.length,
});

const mapDispatchToProps = {
	selectRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(OdbioryComponent);
