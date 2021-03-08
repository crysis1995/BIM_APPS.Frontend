import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import AutodeskLogin from '../components/AutodeskLogin';
import CMSLogin from '../components/CMSLogin';
import { EApplications } from '../sites/types';
import { ACCEPTANCE_TYPE } from '../sites/work_progress/redux/types/constans';
import { WORKERS_LOG } from '../sites/workers_log/redux/constants';

function Header({ warbud_apps, project }) {
	function isAllowedApp(app_type) {
		return !(
			project &&
			warbud_apps &&
			warbud_apps[project] &&
			Array.isArray(warbud_apps[project]) &&
			warbud_apps[project].includes(app_type)
		);
	}

	return (
		<Navbar bg="light" expand="lg" className="flex-shrink-0">
			<NavLink to="/">
				<Navbar.Brand>WSPro</Navbar.Brand>
			</NavLink>
			<Navbar.Collapse>
				<Nav className="mr-auto">
					<NavDropdown
						disabled={isAllowedApp(EApplications.WORK_PROGRESS)}
						rootCloseEvent={'mouseover'}
						title="Awansowanie robót"
						id={EApplications.WORK_PROGRESS}>
						<NavLink
							to={`/${EApplications.WORK_PROGRESS}/${ACCEPTANCE_TYPE.MONOLITHIC}`}
							className="dropdown-item">
							Monolitycznych
						</NavLink>
						{/*<NavLink to={`/work_progress/${ACCEPTANCE_TYPE.ARCHITECTURAL}`} className="dropdown-item">*/}
						{/*	Wykończeniowych*/}
						{/*</NavLink>*/}
						{/*<NavLink to={`/work_progress/${ACCEPTANCE_TYPE.MEP}`} className="dropdown-item">*/}
						{/*	Instalacyjnych*/}
						{/*</NavLink>*/}
					</NavDropdown>
					<NavDropdown
						disabled={isAllowedApp(EApplications.WORKERS_LOG)}
						rootCloseEvent={'mouseover'}
						title="Dzienniki brygadzistowskie"
						id={EApplications.WORKERS_LOG}>
						<NavLink
							to={`/${EApplications.WORKERS_LOG}/${WORKERS_LOG.WORK_TIME_EVIDENCE}`}
							className="dropdown-item">
							Ewidencja czasu pracy
						</NavLink>
						<NavLink
							to={`/${EApplications.WORKERS_LOG}/${WORKERS_LOG.LABOUR_INPUT}`}
							className="dropdown-item">
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

const mapStateToProps = ({ CMSLogin }) => ({
	warbud_apps: CMSLogin?.user?.warbud_apps,
	project: CMSLogin.project.id,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
