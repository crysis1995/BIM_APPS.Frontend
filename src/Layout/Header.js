import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import AutodeskLogin from '../components/AutodeskLogin';
import CMSLogin from '../components/CMSLogin';
import { ACCEPTANCE_TYPE } from '../sites/work_progress/redux/types/constans';

function Header() {
	return (
		<Navbar bg="light" expand="lg" className="flex-shrink-0">
			<NavLink to="/">
				<Navbar.Brand>BIM APPS</Navbar.Brand>
			</NavLink>
			<Navbar.Collapse>
				<Nav className="mr-auto">
					<NavDropdown rootCloseEvent={'mouseover'} title="Awansowanie robót">
						<NavLink to={`/work_progress/${ACCEPTANCE_TYPE.MONOLITHIC}`} className="dropdown-item">
							Monolitycznych
						</NavLink>
						<NavLink to={`/work_progress/${ACCEPTANCE_TYPE.ARCHITECTURAL}`} className="dropdown-item">
							Wykończeniowych
						</NavLink>
						<NavLink to={`/work_progress/${ACCEPTANCE_TYPE.MEP}`} className="dropdown-item">
							Instalacyjnych
						</NavLink>
					</NavDropdown>

					<NavLink className="nav-link " to="/work_acceptance">
						Odbiory robót
					</NavLink>
					<NavLink className="nav-link " to="/schedule">
						Harmonogramy
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
