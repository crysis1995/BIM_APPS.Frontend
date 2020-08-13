import React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "../components/Loader";

const Odbiory = React.lazy(() => import("../sites/odbiory/components"));
const Viewer = React.lazy(() => import("../components/ForgeViewer/components"));

function OdbioryLayout(props) {
    if (!props.CMSLogin.is_login) return <Redirect to="/login" />;
    else
        return (
            <React.Suspense fallback={<Loader />}>
                <Col>
                    <div className="d-flex align-items-stretch" style={{ height: "100%" }}>
                        {props.isLogin && props.started ? (
                            <Viewer />
                        ) : (
                            <div className="position-center align-items-center mt-5">
                                <p>Aby włączyć viewer, zaloguj się do BIM360</p>
                            </div>
                        )}
                    </div>
                </Col>
                <Col>
                    <div className="d-flex align-items-stretch" style={{ height: "100%" }}>
                        {props.isLogin ? <Odbiory {...props} /> : null}
                    </div>
                </Col>
            </React.Suspense>
        );
}

const mapStateToProps = ({ Autodesk, Odbiory, CMSLogin }) => ({
    isLogin: Autodesk.isLogin,
    started: Odbiory.OdbioryComponent.started,
    CMSLogin,
});

export default connect(mapStateToProps, null)(OdbioryLayout);
