import React from "react";
import { selectElement } from "../../../components/ForgeViewer/redux/actions";
import { componentStarted } from "../redux/odbiory/actions";
import { fetch_all_rooms, setSelectedRoom } from "../redux/rooms/actions";
import { connect } from "react-redux";
import TableComponent from "./TableComponent";
import { Col, Form, Row } from "react-bootstrap";
import { v4 } from "uuid";

function OdbioryComponent(props) {
    return (
        <>
            <Form.Row className="mt-3">
                <Col className="mt-auto">
                    <Form.Label>Numer pomieszczenia</Form.Label>
                    <Form.Control
                        onChange={(event) => {
                            props.selectElement(event.target.value);
                        }}
                        disabled={props.objects_jobs_loading}
                        as="select"
                        value={props.Rooms.selected_room}
                        custom
                    >
                        <option value="">Wybierz...</option>
                        {props.Rooms.rooms.map((e) => (
                            <option key={v4()} value={e.id}>
                                {e.room_number}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
                <Col className="mt-auto">
                    <Form.Label>Nazwa pomieszczenia</Form.Label>
                    <Form.Control
                        disabled={props.objects_jobs_loading}
                        onChange={(event) => {
                            props.selectElement(event.target.value);
                        }}
                        as="select"
                        value={props.Rooms.selected_room}
                        custom
                    >
                        <option value="">Wybierz...</option>
                        {props.Rooms.rooms.map((e) => (
                            <option key={v4()} value={e.id}>
                                {e.room_name}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Row>
            {props.Jobs.jobs_fetched && props.Rooms.selected_room ? (
                <Row
                    className="pt-3"
                    style={{
                        height: window.innerHeight - 200,
                        maxHeight: window.innerHeight - 200,
                        overflowY: "scroll",
                    }}
                >
                    <Col>
                        <TableComponent />
                    </Col>
                </Row>
            ) : null}
        </>
    );
}
const mapStateToProps = ({ Odbiory, ForgeViewer }) => ({
    ...Odbiory,
    ForgeViewer: ForgeViewer,
});

const mapDispatchToProps = {
    selectElement,
    componentStarted,
    fetch_all_rooms,
    setSelectedRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(OdbioryComponent);
