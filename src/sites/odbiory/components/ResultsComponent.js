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
            <Col className={"d-flex flex-column"} style={{ overflowY: "scroll" }}>
                <ListGroup variant="flush">
                    {Object.keys(Jobs.jobs).map((job_key) => (
                        <ListGroup.Item action key={job_key} onClick={() => console.log(job_key)}>
                            <div className="d-flex justify-content-between">
                                <span>{Jobs.jobs[job_key].name}</span>
                                <span>#suma metrów kwadratowych roboty na pietro</span>
                            </div>

                            <div class="progress" style={{ height: "5px" }}>
                                <div
                                    classNAme="progress-bar"
                                    role="progressbar"
                                    style={{ width: "25%" }}
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>
                        </ListGroup.Item>
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
