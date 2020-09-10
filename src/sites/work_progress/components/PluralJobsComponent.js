import React from 'react';
import { Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

import { sumOfArray } from '../../../utils/sumOfArray';
import { changeJobPercentageValue } from '../redux/jobs/actions';
import PopoverTable from './PopoverTable';
import { getSplitedJobsByKey } from './TableComponentSelector';
import { RoundNumber } from '../../../utils/RoundNumber';

function PluralJobsComponent(props) {
	const { equal, different } = props.jobs;
	return (
		<>
			{props.showUnitedJobs && Object.entries(equal).length > 0 && (
				<>
					<tr className="table-secondary">
						<td colSpan="4">Roboty wspólne</td>
					</tr>
					{Object.entries(equal).map(([job_key, job]) => (
						<tr key={v4()}>
							<OverlayTrigger
								placement={'top'}
								overlay={
									<Popover style={{ maxWidth: 600 }} id={v4()}>
										<Popover.Content>
											<PopoverTable
												labels={['Pomieszczenie', 'Typ wykończenia']}
												content={Object.entries(
													job.upgrading.object_ids,
												).map(([revit_id, object_ids]) => [
													[props.rooms[revit_id].number],
													[
														...new Set(
															object_ids.map(
																(e) =>
																	props.objects[revit_id][e].object_finish_type.name,
															),
														),
														,
													],
												])}
											/>
										</Popover.Content>
									</Popover>
								}>
								<td>{job.name}</td>
							</OverlayTrigger>
							<OverlayTrigger
								placement={'top'}
								overlay={
									<Popover style={{ maxWidth: 600 }} id={v4()}>
										<Popover.Content>
											<PopoverTable
												labels={['Pomieszczenie', 'Wartości']}
												content={Object.entries(
													job.upgrading.particular_values,
												).map(([revit_id, values]) => [
													[props.rooms[revit_id].number],
													[values.join(' + ')],
												])}
											/>
										</Popover.Content>
									</Popover>
								}>
								<td className="">
									<span>
										{RoundNumber(sumOfArray(Object.values(job.upgrading.summary_value)))} m
										<sup>2</sup>
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
									value={Object.values(job.upgrading.percentage_value)[0]}
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
									{RoundNumber(sumOfArray(Object.values(job.upgrading.current_value)))} m<sup>2</sup>
								</span>
							</td>
						</tr>
					))}
				</>
			)}
			{props.showDifferentialJobs && Object.entries(different).length > 0 && (
				<>
					<tr className="table-secondary">
						<td colSpan="4">Różnice w robotach</td>
					</tr>
					{Object.entries(different).map(([job_key, job]) => (
						<tr key={v4()}>
							<OverlayTrigger
								placement={'top'}
								overlay={
									<Popover style={{ maxWidth: 600 }} id={v4()}>
										<Popover.Content>
											<PopoverTable
												labels={['Pomieszczenie', 'Typ wykończenia']}
												content={Object.entries(
													job.upgrading.object_ids,
												).map(([revit_id, object_ids]) => [
													[props.rooms[revit_id].number],
													[
														...new Set(
															object_ids.map(
																(e) =>
																	props.objects[revit_id][e].object_finish_type.name,
															),
														),
													],
												])}
											/>
										</Popover.Content>
									</Popover>
								}>
								<td>{job.name}</td>
							</OverlayTrigger>
							<OverlayTrigger
								placement={'top'}
								overlay={
									<Popover style={{ maxWidth: 600 }} id={v4()}>
										<Popover.Content>
											<PopoverTable
												labels={['Pomieszczenie', 'Wartości']}
												content={Object.entries(
													job.upgrading.particular_values,
												).map(([revit_id, values]) => [
													[props.rooms[revit_id].number],
													[values.join('+')],
												])}
											/>
										</Popover.Content>
									</Popover>
								}>
								<td className="">
									<span>
										{RoundNumber(sumOfArray(Object.values(job.upgrading.summary_value)))} m
										<sup>2</sup>
									</span>
								</td>
							</OverlayTrigger>
							<td>
								<Form.Control
									// onChange={(e) => {
									// 	props.changeJobPercentageValue(job_key, parseFloat(e.target.value));
									// }}
									disabled={props.objects_jobs_loading}
									size={'sm'}
									as="select"
									value={Object.values(job.upgrading.percentage_value)[0]}
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
									{RoundNumber(sumOfArray(Object.values(job.upgrading.current_value)))} m<sup>2</sup>
								</span>
							</td>
						</tr>
					))}
				</>
			)}
		</>
	);
}

const mapStateToProps = (state) => ({
	rooms: state.Odbiory.Rooms.rooms,
	showUnitedJobs: state.Odbiory.OdbioryComponent.awansowanie.showUnitedJobs,
	showDifferentialJobs: state.Odbiory.OdbioryComponent.awansowanie.showDifferentialJobs,
	jobs: getSplitedJobsByKey(state),
	objects: state.Odbiory.Objects.objects,
});

const mapDispatchToProps = {
	changeJobPercentageValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(PluralJobsComponent);
