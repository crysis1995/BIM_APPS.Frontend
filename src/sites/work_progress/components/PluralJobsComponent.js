import React from 'react';
import { connect } from 'react-redux';
import { getSplitedJobsByKey } from './TableComponentSelector';
import { v4 } from 'uuid';
import { OverlayTrigger, Tooltip, Form, Popover } from 'react-bootstrap';

import { sumOfArray } from '../../../utils/sumOfArray';

function PluralJobsComponent(props) {
	const { equal, different } = props.jobs;
	return (
		<>
			{props.showUnitedJobs && (
				<>
					<tr colSpan="4">Roboty wspólne</tr>
					{Object.entries(equal).map(([job_key, job]) => (
						<tr key={v4()}>
							<OverlayTrigger
								placement={'top'}
								overlay={
									<Popover id={v4()}>
										<Popover.Content>
											{Object.entries(job.upgrading.object_ids).map(([revit_id, object_ids]) => (
												<React.Fragment key={v4()}>
													<span>
														{`${props.rooms[revit_id].number} : ${[
															...new Set(
																object_ids.map(
																	(id) =>
																		props.objects[revit_id][id].object_finish_type
																			.name,
																),
															),
														].join(' ')}`}
													</span>
													<br />
												</React.Fragment>
											))}
										</Popover.Content>
									</Popover>
								}>
								<td>{job.name}</td>
							</OverlayTrigger>
							<OverlayTrigger
								placement={'top'}
								overlay={
									<Popover id={v4()}>
										<Popover.Content>
											{Object.entries(job.upgrading.particular_values).map(
												([revit_id, values]) => (
													<React.Fragment key={v4()}>
														<span>{`${props.rooms[revit_id].number} : ${values.join(
															'+',
														)}`}</span>
														<br />
													</React.Fragment>
												),
											)}
										</Popover.Content>
									</Popover>
								}>
								<td className="">
									<span>
										{sumOfArray(Object.values(job.upgrading.summary_value))} m<sup>2</sup>
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
									{sumOfArray(Object.values(job.upgrading.current_value))} m<sup>2</sup>
								</span>
							</td>
						</tr>
					))}
				</>
			)}
			{props.showDifferentialJobs && <tr colSpan="4">Roboty różniące się </tr>}
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PluralJobsComponent);
