import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import AutodeskLogin from '../components/AutodeskLogin';
import CMSLogin from '../components/CMSLogin';


function Header() {
    return (
        <Navbar bg="light" expand="lg" className="flex-shrink-0">
            <NavLink to="/">
                <Navbar.Brand>BIM APPS</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink className="nav-link " to="/acceptance">
                        Awansowanie robót
                    </NavLink>
                </Nav>

                <Nav className="align-right">
                    <AutodeskLogin />
                    <CMSLogin />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
