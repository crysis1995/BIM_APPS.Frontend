import React from 'react';
import { Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import UNITS from '../../../../components/Units';

import { RoundNumber } from '../../../../utils/RoundNumber';
import { sumOfArray } from '../../../../utils/sumOfArray';
import { upgradeJob } from '../../redux/actions/upgrading_actions';
import PopoverTable from './PopoverTable';
import { getSplitedJobsByKey } from './TableComponentSelector';

function PluralJobsComponent(props) {
	const { equal, different } = props.jobs_data;
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
													job.object_ids,
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
								<td>{props.jobs[job_key].name}</td>
							</OverlayTrigger>
							<OverlayTrigger
								placement={'top'}
								overlay={
									<Popover style={{ maxWidth: 600 }} id={v4()}>
										<Popover.Content>
											<PopoverTable
												labels={['Pomieszczenie', 'Wartości']}
												content={Object.entries(
													job.particular_values,
												).map(([revit_id, values]) => [
													[props.rooms[revit_id].number],
													[values.join(' + ')],
												])}
											/>
										</Popover.Content>
									</Popover>
								}>
								<td>
									<UNITS.M2>{sumOfArray(Object.values(job.summary_value))}</UNITS.M2>
								</td>
							</OverlayTrigger>
							<td>
								<Form.Control
									onChange={(e) => {
										props.upgradeJob(job_key, parseFloat(e.target.value));
									}}
									disabled={props.objects_jobs_loading}
									size={'sm'}
									as="select"
									value={Object.values(job.percentage_value)[0]}
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
								<UNITS.M2>{sumOfArray(Object.values(job.current_value))}</UNITS.M2>
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
													job.object_ids,
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
													job.particular_values,
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
										{RoundNumber(sumOfArray(Object.values(job.summary_value)))} m<sup>2</sup>
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
									value={Object.values(job.percentage_value)[0]}
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
									{RoundNumber(sumOfArray(Object.values(job.current_value)))} m<sup>2</sup>
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
	rooms: state.Odbiory.Rooms.byId,
	showUnitedJobs: state.Odbiory.OdbioryComponent.awansowanie.showUnitedJobs,
	showDifferentialJobs: state.Odbiory.OdbioryComponent.awansowanie.showDifferentialJobs,
	jobs_data: getSplitedJobsByKey(state),
	jobs: state.Odbiory.Jobs.jobs,
	objects: state.Odbiory.Objects.objects,
});

const mapDispatchToProps = {
	upgradeJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(PluralJobsComponent);
