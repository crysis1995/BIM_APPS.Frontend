import React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Loader from "../components/Loader";

const Odbiory = React.lazy(() => import("../sites/odbiory/components"));
const Viewer = React.lazy(() => import("../components/ForgeViewer/components"));

function OdbioryLayout(props) {
    return (
        <React.Suspense fallback={<Loader />}>
            <Col
                xs={6}
                style={{
                    height: window.innerHeight - 56,
                }}
            >
                {props.isLogin && props.started ? (
                    <Viewer />
                ) : (
                    <div className="text-center mt-5">
                        <p>Aby włączyć viewer, zaloguj się do BIM360</p>
                    </div>
                )}
            </Col>
            <Col
                xs={6}
                style={{
                    height: window.innerHeight - 56,
                    maxHeight: window.innerHeight - 56,
                    overflowY: "hidden",
                }}
                className="p-4"
            >
                {props.isLogin ? <Odbiory {...props} /> : null}
            </Col>
        </React.Suspense>
    );
}

const mapStateToProps = ({ AutodeskLogin, Odbiory }) => ({
    isLogin: AutodeskLogin.isLogin,
    started: Odbiory.OdbioryComponent.started,
});

export default connect(mapStateToProps, null)(OdbioryLayout);