import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AutodeskLogin from "../AutodeskLogin";

function Header() {
      return (
            <Navbar bg="light" expand="lg">
                  <NavLink to="/">
                        <Navbar.Brand>BIM APPS</Navbar.Brand>
                  </NavLink>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        {/*      <NavLink className="nav-link " to="/odbiory">*/}
                        {/*           Odbiory*/}
                        {/*      </NavLink>*/}
                        </Nav>

                        <Nav className="align-right">
                              <AutodeskLogin />
                        </Nav>
                  </Navbar.Collapse>
            </Navbar>
      );
}

export default Header;
