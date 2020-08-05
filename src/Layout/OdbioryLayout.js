import React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Loader from "../components/Loader";

const Odbiory = React.lazy(() => import("../sites/odbiory/components"));
const Viewer = React.lazy(() => import("../components/ForgeViewer/components"));

function OdbioryLayout(props) {
    return (
        <React.Suspense fallback={<Loader />}>
            <Col>
                <div className="d-flex align-items-stretch" style={{ height: "100%" }}>
                    {props.isLogin && props.started ? (
                        <Viewer />
                    ) : (
                        <div className="position-center mt-5">
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

const mapStateToProps = ({ AutodeskLogin, Odbiory }) => ({
    isLogin: AutodeskLogin.isLogin,
    started: Odbiory.OdbioryComponent.started,
});

export default connect(mapStateToProps, null)(OdbioryLayout);
