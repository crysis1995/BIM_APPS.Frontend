import React from "react";
import { connect } from "react-redux";
import { Row, Col, ListGroup, ProgressBar } from "react-bootstrap";
import Loader from "../../../components/Loader";

function ResultComponent({ Jobs, ForgeViewer }) {
    if (!Jobs.jobs_fetched) return <Loader />;
    else if (!ForgeViewer.current_sheet)
        return (
            <div className="p-3 text-center">
                <p>Wybierz kondygnacje</p>
            </div>
        );
    else
        return (
            <Row className="mt-3">
                <Col className={"d-flex flex-column"} style={{ overflowY: "scroll" }}>
                    <ListGroup variant="flush">
                        {Object.keys(Jobs.jobs).map((job_key) => (
                            <ListGroup.Item action key={job_key} onClick={() => console.log(job_key)}>
                                {Jobs.jobs[job_key].name}
                                <ProgressBar
                                    className="mt-3"
                                    now={Jobs.jobs[job_key].percentage || 0}
                                    label={`${Jobs.jobs[job_key].percentage || 0}%`}
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        );
}
const mapStateToProps = ({ Odbiory, ForgeViewer }) => ({
    ...Odbiory,
    ForgeViewer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResultComponent);
