import React from 'react';
import { Col, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import v4 from 'uuid/dist/esm-browser/v4';
import Loader from '../../../components/Loader';
import ProgressBar from '../../../components/ProgressBar';
import { colorResultByRoom } from '../redux/actions/results_actions';
import { getFilteredJobsResults } from './ResultsComponent.Selector';

function ResultComponent(props) {
	const { Jobs, jobs_data, ForgeViewer } = props;
	if (!Jobs.jobs_fetched || Jobs.jobs_loading) return <Loader height={'100%'} />;
	else if (!ForgeViewer.current_sheet)
		return (
			<div className="p-3 text-center">
				<p>Wybierz kondygnacje</p>
			</div>
		);
	else
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
									onClick={() => props.colorResultByRoom(job_key)}>
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
	ForgeViewer: state.ForgeViewer,
	Jobs: state.Odbiory.Jobs,
	jobs_data: getFilteredJobsResults(state),
});

const mapDispatchToProps = { colorResultByRoom };

export default connect(mapStateToProps, mapDispatchToProps)(ResultComponent);
