import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import AutodeskLogin from '../components/AutodeskLogin';
import CMSLogin from '../components/CMSLogin';
import { ACCEPTANCE_TYPE } from '../sites/work_progress/redux/types/constans';
import { WORKERS_LOG } from '../sites/workers_log/redux/constants';
function Header() {
	return (
		<Navbar bg="light" expand="lg" className="flex-shrink-0">
			<NavLink to="/">
				<Navbar.Brand>WSPro</Navbar.Brand>
			</NavLink>
			<Navbar.Collapse>
				<Nav className="mr-auto">
					<NavDropdown rootCloseEvent={'mouseover'} title="Awansowanie robót">
						<NavLink to={`/work_progress/${ACCEPTANCE_TYPE.MONOLITHIC}`} className="dropdown-item">
							Monolitycznych
						</NavLink>
						{/*<NavLink to={`/work_progress/${ACCEPTANCE_TYPE.ARCHITECTURAL}`} className="dropdown-item">*/}
						{/*	Wykończeniowych*/}
						{/*</NavLink>*/}
						{/*<NavLink to={`/work_progress/${ACCEPTANCE_TYPE.MEP}`} className="dropdown-item">*/}
						{/*	Instalacyjnych*/}
						{/*</NavLink>*/}
					</NavDropdown>
					<NavDropdown rootCloseEvent={'mouseover'} title="Dzienniki brygadzistowskie">
						<NavLink to={`/workers_log/${WORKERS_LOG.WORK_TIME_EVIDENCE}`} className="dropdown-item">
							Ewidencja czasu pracy
						</NavLink>
						<NavLink to={`/workers_log/${WORKERS_LOG.LABOUR_INPUT}`} className="dropdown-item">
							Nakłady pracy
						</NavLink>
					</NavDropdown>
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
