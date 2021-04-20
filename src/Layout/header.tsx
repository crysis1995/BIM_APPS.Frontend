import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import AutodeskLoginComponent from '../components/AutodeskLogin';
import { EApplications } from '../sites/types';
import { ACCEPTANCE_TYPE } from '../sites/work_progress/redux/types/constans';
import { WORKERS_LOG } from '../sites/workers_log/redux/constants';
import { CMSLogin } from '../components/CMSLogin/type';
import CMSLoginComponent from '../components/CMSLogin';

const mapStateToProps = (state: { CMSLogin: CMSLogin.Redux.Store }) => ({
	warbud_apps: state.CMSLogin.warbud_apps,
	project: state.CMSLogin?.actual_project?.id,
});

const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function Header(props: Props) {
	console.log(props)
	function isAllowedApp(app_type: string) {

		return !(
			props.project &&
			props.warbud_apps &&
			props.warbud_apps[props.project] &&
			Array.isArray(props.warbud_apps[props.project]) &&
			props.warbud_apps[props.project].includes(app_type)
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
						rootCloseEvent={'click'}
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
						rootCloseEvent={'click'}
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
					<AutodeskLoginComponent />
					<CMSLoginComponent />
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
