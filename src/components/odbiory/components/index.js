import React from "react";
import { connect } from "react-redux";
import { Col, Form, Row, Button } from "react-bootstrap";
import {
    fetch_all_rooms,
    setSelectedRoom,
    saveData,
    cleanChanges,
    componentStarted,
} from "../redux/actions";
import { selectElement } from "../../ForgeViewer/redux/actions";
import { v4 } from "uuid";
import TableComponent from "./TableComponent";

class odbiory extends React.Component {
    componentDidMount() {
        const { fetch_all_rooms, componentStarted } = this.props;
        componentStarted();
        fetch_all_rooms();
    }

    render() {
        return (
            <div>
                <Form.Row>
                    <Col className="mt-auto">
                        <Form.Label>Pomieszczenie - numer</Form.Label>
                        <Form.Control
                            onChange={(event) => {
                                // this.props.setSelectedRoom(event.target.value);
                                this.props.selectElement(event.target.value);
                            }}
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
                            onChange={(event) => {
                                // this.props.setSelectedRoom(event.target.value);
                                this.props.selectElement(event.target.value);
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
                    <Col className="mt-auto">
                        <Button
                            className="btn-block"
                            variant="secondary"
                            onClick={(e) => this.props.cleanChanges()}
                        >
                            Wyczyść zmiany
                        </Button>
                        <Button
                            className="btn-block"
                            variant="primary"
                            onClick={(e) => this.props.saveData()}
                        >
                            Zapisz zmiany
                        </Button>
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

const mapStateToProps = ({ RoomsReducer }) => ({
    ...RoomsReducer,
});

const mapDispatchToProps = {
    fetch_all_rooms,
    setSelectedRoom,
    selectElement,
    saveData,
    cleanChanges,
    componentStarted,
};

export default connect(mapStateToProps, mapDispatchToProps)(odbiory);
