import React from 'react';
import { Col, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import v4 from 'uuid/dist/esm-browser/v4';
import ProgressBar from '../../../../components/ProgressBar';
import { colorResultByRoom } from '../../redux/actions/results_actions';
import { getFilteredJobsResults } from './Results.Selector';

function ResultsListComponent({ jobs_data, colorResultByRoom }) {
	return (
		<Col className={'d-flex flex-column'} style={{ overflowY: 'scroll' }}>
			<ListGroup variant="flush">
				{jobs_data.map(
					({ job_key, percentage_value, summary_current_value, summary_all_value, isActive, name }) => (
						<OverlayTrigger
							key={v4()}
							placement="top"
							overlay={<Tooltip id={`tooltip-top`}>{`${percentage_value}%`}</Tooltip>}>
							<ListGroup.Item
								action
								active={isActive}
								key={job_key}
								onClick={() => colorResultByRoom(job_key)}>
								<div className="d-flex justify-content-between">
									<span>{name}</span>
									<span>
										{summary_current_value} m<sup>2</sup> / {summary_all_value} m<sup>2</sup>
									</span>
								</div>
								<ProgressBar results_percentage_area={percentage_value} />
							</ListGroup.Item>
						</OverlayTrigger>
					),
				)}
			</ListGroup>
		</Col>
	);
}
const mapStateToProps = (state) => ({
	jobs_data: getFilteredJobsResults(state),
});

const mapDispatchToProps = { colorResultByRoom };

export default connect(mapStateToProps, mapDispatchToProps)(ResultsListComponent);
