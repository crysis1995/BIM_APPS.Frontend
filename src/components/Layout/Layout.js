import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Loader from "../../components/Loader";
import ModalComponent from "../Modal/component";
import { connect } from "react-redux";
// todo zrobić sidebar

//components
const Header = React.lazy(() => import("./Header"));
const ProjectList = React.lazy(() => import("../ProjectList"));
const OdbioryComponent = React.lazy(() => import("../odbiory/components"));
const Viewer = React.lazy(() => import("../ForgeViewer/components"));

function Layout(props) {
    return (
        <>
            <React.Suspense fallback={<Loader />}>
                <Header {...props} />
            </React.Suspense>
            <Container fluid={"true"}>
                <React.Suspense fallback={<Loader />}>
                    <Switch>
                        {/*<Route exact={true} path="/">*/}
                        {/*    <Row noGutters>*/}
                        {/*        <Col xs={2}>*/}
                        {/*            <ProjectList />*/}
                        {/*        </Col>*/}
                        {/*        <Col xs={6}>*/}
                        {/*            <div>Forge Viewer</div>*/}
                        {/*        </Col>*/}
                        {/*        <Col xs={4} />*/}
                        {/*    </Row>*/}
                        {/*</Route>*/}
                        <Route exact={true} path="/">
                            <Row noGutters>
                                <Col
                                    xs={6}
                                    style={{
                                        height: window.innerHeight - 56,
                                    }}
                                >
                                    {props.isLogin && props.started ? (
                                        <Viewer />
                                    ) : (
                                        <Row noGutters>
                                            <Col className="text-center p-5">
                                                <p>
                                                    Aby włączyć viewer, zaloguj
                                                    się do BIM360
                                                </p>
                                            </Col>
                                        </Row>
                                    )}
                                </Col>
                                <Col
                                    xs={6}
                                    style={{
                                        height: window.innerHeight - 56,
                                        maxHeight: window.innerHeight - 56,
                                        overflowY: "scroll",
                                    }}
                                    className="p-4"
                                >
                                    {props.isLogin ? (
                                        <OdbioryComponent />
                                    ) : null}
                                </Col>
                            </Row>
                        </Route>
                    </Switch>
                </React.Suspense>
            </Container>
            <ModalComponent />
        </>
    );
}
const mapStateToProps = ({ AutodeskLogin, RoomsReducer }) => ({
    ...AutodeskLogin,
    ...RoomsReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, null)(Layout);
