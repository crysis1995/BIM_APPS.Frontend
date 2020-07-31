import React from "react";
import { connect } from "react-redux";
import { Row, Col, ListGroup } from "react-bootstrap";
import Loader from "../../../components/Loader";

function ResultComponent({ Jobs }) {
    if (!Jobs.jobs_fetched) return <Loader />;
    else
        return (
            <Row className="mt-3">
                <Col>
                    <ListGroup>{Object.keys(Jobs.jobs).map((job_key) => Jobs.jobs[job_key])}</ListGroup>
                </Col>
            </Row>
        );
}
const mapStateToProps = ({ Odbiory, ForgeViewer }) => ({
    ...Odbiory,
    ForgeViewer: ForgeViewer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResultComponent);
