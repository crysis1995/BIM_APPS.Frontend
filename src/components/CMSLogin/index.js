import React from "react";
import { Button, Image, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from "./redux/actions";

function CMSLogin(props) {
    return props.CMSLogin.is_login ? (
        <NavDropdown title={<span>Witaj, {props.CMSLogin.user.username}</span>} id="nav-dropdown">
            <NavDropdown.Item onClick={props.userLogout}>Wyloguj</NavDropdown.Item>
        </NavDropdown>
    ) : (
        <Link to="/login">
            <Button variant="outline-primary" size="sm">
                Zaloguj się
            </Button>
        </Link>
    );
}

const mapStateToProps = ({ CMSLogin }) => ({
    CMSLogin,
});

const mapDispatchToProps = {
    userLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(CMSLogin);
