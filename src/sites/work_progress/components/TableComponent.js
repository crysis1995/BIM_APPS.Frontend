import classNames from 'classnames';
import React from 'react';
import { Form, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

import { changeVisibilityDifferentialJobs, changeVisibilityUnitedJobs } from '../redux/odbiory/actions';

import PluralJobsComponent from './PluralJobsComponent';
function TableComponent(props) {
	return (
		<>
			{props.selected_rooms.length > 1 && (
				<div className="mt-3">
					<Form.Check
						inline
						checked={props.showUnitedJobs}
						onClick={(e) => props.changeVisibilityUnitedJobs(e.target.checked)}
						label="Pokaż wspólne roboty"
						type="checkbox"
						id={`inline-radio-1`}
					/>
					<Form.Check
						inline
						checked={props.showDifferentialJobs}
						onClick={(e) => props.changeVisibilityDifferentialJobs(e.target.checked)}
						label="Pokaż różniące sie roboty"
						type="checkbox"
						id={`inline-radio-2`}
					/>
				</div>
			)}
			<Table className="mt-3" hover size="sm">
				<thead>
					<tr>
						<th>Nazwa roboty</th>
						<th>BIM ilość</th>
						<th>Zaawansowanie (%)</th>
						<th>Ilość wykonana</th>
					</tr>
				</thead>
				<tbody>
					{props.selected_rooms.length > 0 ? <PluralJobsComponent /> : <p>Wybierz pomieszczenie</p>}
				</tbody>
			</Table>
		</>
	);
}

const mapStateToProps = ({ Odbiory }) => ({
	selected_rooms: Odbiory.Rooms.selected_rooms,
	showUnitedJobs: Odbiory.OdbioryComponent.awansowanie.showUnitedJobs,
	showDifferentialJobs: Odbiory.OdbioryComponent.awansowanie.showDifferentialJobs,
	jobs_loading: Odbiory.Jobs.jobs_loading,
	objects_loading: Odbiory.Objects.objects_loading,
});

const mapDispatchToProps = {
	changeVisibilityDifferentialJobs,
	changeVisibilityUnitedJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
