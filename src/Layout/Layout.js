import * as React from "react";
import { Container } from "react-bootstrap";
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
                <Header {...props} />
            </React.Suspense>
            <Container fluid={"true"}>
                <React.Suspense fallback={<Loader />}>
                    <Switch>
                        <Route exact={true} path="/login">
                            <Login />
                        </Route>
                        <Route exact={true} path="/">
                            <Link to={"/odbiory"}>asd</Link>
                        </Route>
                        <Route path="/odbiory" component={OdbioryLayout} />
                    </Switch>
                </React.Suspense>
            </Container>
            <ModalComponent />
        </>
    );
}

export default connect(null, null)(Layout);
