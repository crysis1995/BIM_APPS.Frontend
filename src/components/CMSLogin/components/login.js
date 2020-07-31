import React from "react";
import { connect } from "react-redux";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function Login(props) {
    return (
        <Row noGutters>
            <Col xs={2}>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address / Login</Form.Label>
                        <Form.Control type="email" placeholder="Email / Login" />
                        {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control type="password" placeholder="Hasło" />
                        {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    );
}

const mapStateToProps = ({ Odbiory, ForgeViewer }) => ({
    ...Odbiory,
    ForgeViewer: ForgeViewer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
