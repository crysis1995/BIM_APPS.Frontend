import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import Loader from "../components/Loader";
import ModalComponent from "../components/Modal/component";
import { connect } from "react-redux";

// todo zrobić sidebar

//components
const Header = React.lazy(() => import("./Header"));
const OdbioryLayout = React.lazy(() => import("./OdbioryLayout"));
const Login = React.lazy(() => import("../components/CMSLogin/components/login"));

function Layout(props) {
    return (
        <>
            <React.Suspense fallback={<Loader />}>
                <Container fluid style={{ minHeight: window.innerHeight, paddingLeft: 0, paddingRight: 0 }}>
                    <Header {...props} />
                    <Row noGutters style={{ minHeight: window.innerHeight - 56 }}>
                        <Switch>
                            <Route exact={true} path="/login">
                                <Login />
                            </Route>
                            <Route exact path="/">
                                <Col className="d-flex flex-column">
                                    <div className="d-flex align-items-stretch" style={{ height: "100%" }}>
                                        asdasddas
                                    </div>
                                </Col>
                                <Col>asdasddas</Col>
                                <Col>asdasddas</Col>
                                <Col>asdasddas</Col>
                            </Route>
                            <Route path="/odbiory" component={OdbioryLayout} />
                        </Switch>
                    </Row>
                </Container>
                <ModalComponent />
            </React.Suspense>
        </>
    );
}

export default connect(null, null)(Layout);
