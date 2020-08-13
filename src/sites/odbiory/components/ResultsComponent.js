import React from "react";
import { connect } from "react-redux";
import { Row, Col, ListGroup } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Loader from "../../../components/Loader";
import ProgressBar from "../../../components/ProgressBar";

function ResultComponent({ Jobs, ForgeViewer }) {
	if (!Jobs.jobs_fetched || Jobs.jobs_loading) return <Loader height={"100%"} />;
	else if (!ForgeViewer.current_sheet)
		return (
			<div className="p-3 text-center">
				<p>Wybierz kondygnacje</p>
			</div>
		);
	else
		return (
			<Col className={"d-flex flex-column"} style={{ overflowY: "scroll" }}>
				<ListGroup variant="flush">
					{Object.keys(Jobs.jobs)
						.filter((job_key) => !Jobs.jobs[job_key].hidden)
						.map((job_key) => (
							<OverlayTrigger
								placement="top"
								overlay={
									<Tooltip id={`tooltip-top`}>{`${
										Jobs.jobs[job_key].results.percentage_value || 0
									}%`}</Tooltip>
								}
							>
								<ListGroup.Item action key={job_key} onClick={() => console.log(job_key)}>
									<div className="d-flex justify-content-between">
										<span>{Jobs.jobs[job_key].name}</span>
										<span>
											{Jobs.jobs[job_key].results.summary_current_value || 0} m<sup>2</sup> /{" "}
											{Jobs.jobs[job_key].results.summary_all_value || 0} m<sup>2</sup>
										</span>
									</div>
									<ProgressBar
										results_percentage_area={Jobs.jobs[job_key].results.percentage_value}
									/>
								</ListGroup.Item>
							</OverlayTrigger>
						))}
				</ListGroup>
			</Col>
		);
}
const mapStateToProps = ({ Odbiory, ForgeViewer }) => ({
	...Odbiory,
	ForgeViewer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResultComponent);
