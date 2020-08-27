import { changeJobPercentageValue } from '../redux/jobs/actions';
import { getSingleSelectionFilteredJobs } from './TableComponentSelector';
import React from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

function SingularJobsComponent(props) {
	return Object.entries(props.filteredJobs).map(([job_key, job]) => (
		<tr key={v4()}>
			<OverlayTrigger
				placement={'top'}
				overlay={
					<Tooltip id={`tooltip-top`}>
						{[
							...new Set(
								job.upgrading.object_ids[props.selected_room].map(
									(object_id) => props.objects[object_id].object_finish_type.name,
								),
							),
						].map((e) => (
							<React.Fragment key={v4()}>
								<span>{e}</span>
								<br />
							</React.Fragment>
						))}
					</Tooltip>
				}>
				<td>{job.name}</td>
			</OverlayTrigger>
			<OverlayTrigger
				placement={'top'}
				overlay={
					<Tooltip id={`tooltip-top`}>
						{<span>{job.upgrading.particular_values[props.selected_room].join('+')}</span>}
					</Tooltip>
				}>
				<td>
					<span>
						{job.upgrading.summary_value[props.selected_room]} m<sup>2</sup>
					</span>
				</td>
			</OverlayTrigger>
			<td>
				<Form.Control
					onChange={(e) => {
						props.changeJobPercentageValue(job_key, parseFloat(e.target.value));
					}}
					disabled={props.objects_jobs_loading}
					size={'sm'}
					as="select"
					value={job.upgrading.percentage_value[props.selected_room]}
					custom>
					<option value="">Wybierz</option>
					<option value="0">0%</option>
					<option value="0.1">10%</option>
					<option value="0.2">20%</option>
					<option value="0.3">30%</option>
					<option value="0.4">40%</option>
					<option value="0.5">50%</option>
					<option value="0.6">60%</option>
					<option value="0.7">70%</option>
					<option value="0.8">80%</option>
					<option value="0.9">90%</option>
					<option value="1">100%</option>
				</Form.Control>
			</td>
			<td>
				<span>
					{job.upgrading.current_value[props.selected_room]} m<sup>2</sup>
				</span>
			</td>
		</tr>
	));
}

const mapStateToProps = (state) => ({
	filteredJobs: getSingleSelectionFilteredJobs(state),
	selected_room: state.Odbiory.Rooms.selected_rooms[0],
	objects_jobs_loading: state.Odbiory.Jobs.objects_jobs_loading,
	objects: state.Odbiory.Objects.objects[state.Odbiory.Rooms.selected_rooms[0]],
});

const mapDispatchToProps = {
	changeJobPercentageValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingularJobsComponent);
