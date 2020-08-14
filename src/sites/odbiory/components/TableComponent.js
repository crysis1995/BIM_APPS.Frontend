import React from 'react';
import { Form, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import Loader from '../../../components/Loader';
import { changeJobPercentageValue } from '../redux/jobs/actions';


function TableComponent(props) {
	if (props.Jobs.jobs_loading || props.Objects.objects_loading)
		return (
			<div className="pt-5">
				<Loader height={"100%"} />
			</div>
		);
	else {
		return (
			<Table className="mt-3" hover>
				<thead>
					<tr>
						<th>Nazwa roboty</th>
						<th>BIM ilość</th>
						<th>Stopień zaawansowania</th>
						<th>Ilość wykonana</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(props.Jobs.jobs)
						.filter((job_key) => props.Jobs.jobs[job_key].upgrading.object_ids.length > 0)
						.map((job_key) => (
							<tr key={v4()}>
								<OverlayTrigger
									placement={"top"}
									overlay={
										<Tooltip id={`tooltip-top`}>
											{[
												...new Set(
													props.Jobs.jobs[job_key].upgrading.object_ids.map(
														(object_id) =>
															props.Objects.objects[object_id].object_finish_type.name
													)
												),
											].map((e) => (
												<React.Fragment key={v4()}>
													<span>{e}</span>
													<br />
												</React.Fragment>
											))}
										</Tooltip>
									}
								>
									<td>{props.Jobs.jobs[job_key].name}</td>
								</OverlayTrigger>
								<OverlayTrigger
									placement={"top"}
									overlay={
										<Tooltip id={`tooltip-top`}>
											{
												<>
													<span>
														{props.Jobs.jobs[job_key].upgrading.particular_values.join("+")}
													</span>
												</>
											}
										</Tooltip>
									}
								>
									<td>
										<span>
											{props.Jobs.jobs[job_key].upgrading.summary_value} m<sup>2</sup>
										</span>
									</td>
								</OverlayTrigger>
								<td>
									<Form.Control
										onChange={(e) => {
											props.changeJobPercentageValue(job_key, parseFloat(e.target.value));
										}}
										disabled={props.Jobs.objects_jobs_loading}
										size={"sm"}
										as="select"
										value={props.Jobs.jobs[job_key].upgrading.percentage_value}
										custom
									>
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
										{props.Jobs.jobs[job_key].upgrading.current_value} m<sup>2</sup>
									</span>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		);
	}
}

const mapStateToProps = ({ Odbiory }) => ({
	...Odbiory,
});

const mapDispatchToProps = {
	changeJobPercentageValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
