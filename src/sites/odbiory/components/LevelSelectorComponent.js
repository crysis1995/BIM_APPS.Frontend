import React from "react";
import { Form, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { v4 } from "uuid";
import { setCurrentLevel } from "../../../components/ForgeViewer/redux/actions";

function LevelSelectorComponent(props) {
    return (
        <Form.Row>
            <Col className="mb-3">
                <Form.Label>Kondygnacja</Form.Label>
                <Form.Control
                    onChange={(event) => {
                        props.setCurrentLevel(event.target.value);
                    }}
                    disabled={props.objects_jobs_loading}
                    as="select"
                    value={props.ForgeViewer.current_sheet}
                    custom
                >
                    <option value="">Wybierz...</option>
                    {props.ForgeViewer.sheets_loaded &&
                        props.ForgeViewer.sheets.map((e) => (
                            <option key={v4()} value={e.index}>
                                {e.name}
                            </option>
                        ))}
                </Form.Control>
            </Col>
        </Form.Row>
    );
}

const mapStateToProps = ({ Odbiory, ForgeViewer }) => ({
    ...Odbiory,
    ForgeViewer: ForgeViewer,
});

const mapDispatchToProps = {
    setCurrentLevel,
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelSelectorComponent);
