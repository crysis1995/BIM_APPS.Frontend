import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { selectElement } from '../../../components/ForgeViewer/redux/actions';
import { componentStarted } from '../redux/odbiory/actions';
import { fetch_all_rooms, setSelectedRoom } from '../redux/rooms/actions';
import TableComponent from './TableComponent';


function OdbioryComponent(props) {
    return (
        <Col className={"d-flex flex-column"}>
            <Form.Row className="mt-3">
                <Col className="mt-auto">
                    <Form.Label>Numer pomieszczenia</Form.Label>
                    <Form.Control
                        onChange={(event) => {
                            props.selectElement(event.target.value);
                        }}
                        disabled={props.objects_jobs_loading || props.ForgeViewer.model_rooms_loading}
                        as="select"
                        value={props.Rooms.selected_room}
                        custom
                    >
                        <option value="">Wybierz...</option>
                        {Object.keys(props.Rooms.rooms).map((id) => (
                            <option key={v4()} value={id}>
                                {props.Rooms.rooms[id].number}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
                <Col className="mt-auto">
                    <Form.Label>Nazwa pomieszczenia</Form.Label>
                    <Form.Control
                        disabled={props.objects_jobs_loading || props.ForgeViewer.model_rooms_loading}
                        onChange={(event) => {
                            props.selectElement(event.target.value);
                        }}
                        as="select"
                        value={props.Rooms.selected_room}
                        custom
                    >
                        <option value="">Wybierz...</option>
                        {Object.keys(props.Rooms.rooms).map((id) => (
                            <option key={v4()} value={id}>
                                {props.Rooms.rooms[id].name}
                            </option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Row>
            {props.Jobs.jobs_fetched && props.Rooms.selected_room ? (
                <Col
                    className={"d-flex flex-column"}
                    style={{
                        overflowY: "scroll",
                    }}
                >
                    <TableComponent />
                </Col>
            ) : null}
        </Col>
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
