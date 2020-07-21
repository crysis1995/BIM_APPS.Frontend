import React from "react";
import { connect } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import {
    fetch_all_rooms,
    setSelectedRoom,
    componentStarted,
} from "../redux/actions";
import { selectElement } from "../../ForgeViewer/redux/actions";
import { v4 } from "uuid";
import TableComponent from "./TableComponent";
import Loader from "../../Loader";

class odbiory extends React.Component {
    componentDidMount() {
        const { fetch_all_rooms, componentStarted } = this.props;
        componentStarted();
        fetch_all_rooms();
    }

    render() {
        if (this.props.rooms_loading) return <Loader />;
        else
            return (
                <div>
                    <Form.Row>
                        <Col className="mt-auto">
                            <Form.Label>Pomieszczenie - numer</Form.Label>
                            <Form.Control
                                onChange={(event) => {
                                    this.props.selectElement(
                                        event.target.value
                                    );
                                }}
                                disabled={this.props.objects_jobs_loading}
                                as="select"
                                value={this.props.selected_room}
                                custom
                            >
                                <option value="">Wybierz...</option>
                                {this.props.rooms.map((e) => (
                                    <option key={v4()} value={e.id}>
                                        {e.room_number}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                        <Col className="mt-auto">
                            <Form.Label>Pomieszczenie - nazwa</Form.Label>
                            <Form.Control
                                disabled={this.props.objects_jobs_loading}
                                onChange={(event) => {
                                    this.props.selectElement(
                                        event.target.value
                                    );
                                }}
                                as="select"
                                value={this.props.selected_room}
                                custom
                            >
                                <option value="">Wybierz...</option>
                                {this.props.rooms.map((e) => (
                                    <option key={v4()} value={e.id}>
                                        {e.room_name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Row>
                    {this.props.objects.length !== 0 ? (
                        <Row className="pt-3">
                            <Col>
                                <TableComponent />
                            </Col>
                        </Row>
                    ) : null}
                </div>
            );
    }
}

const mapStateToProps = ({ RoomsReducer, LoadingReducer }) => ({
    ...RoomsReducer,
    ...LoadingReducer,
});

const mapDispatchToProps = {
    fetch_all_rooms,
    setSelectedRoom,
    selectElement,
    componentStarted,
};

export default connect(mapStateToProps, mapDispatchToProps)(odbiory);
