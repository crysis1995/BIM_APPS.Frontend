import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import AutodeskLoginComponent from '../components/AutodeskLogin';
import { EApplications, EApplicationsWithModules } from '../sites/types';
import { ACCEPTANCE_TYPE } from '../sites/work_progress/redux/types/constans';
import { WORKERS_LOG } from '../sites/workers_log/redux/constants';
import CMSLoginComponent from '../components/CMSLogin';
import { ConstructionMaterialTypes } from '../sites/construction_materials/types';
import classNames from 'classnames';
import { RootState } from '../store';
import { createSelector } from 'reselect';

const WarbudAppsSelector = (state: RootState) => state.CMSLogin.warbud_apps;
const ActualProjectSelector = (state: RootState) => state.CMSLogin?.actual_project?.id;

const CurrentProjectAppsSelector = createSelector(
	WarbudAppsSelector,
	ActualProjectSelector,
	(warbud_apps, actual_project) => {
		if (warbud_apps && actual_project) {
			return warbud_apps[actual_project];
		}
		return [];
	},
);

function Header() {
	const projectApps = useSelector(CurrentProjectAppsSelector);

	function isAllowedApp(app_type: EApplicationsWithModules | EApplications) {
		return !projectApps.includes(app_type);
	}

	return (
		<Navbar bg="light" expand="lg" className="flex-shrink-0">
			<NavLink to="/">
				<Navbar.Brand>WSPro v2</Navbar.Brand>
			</NavLink>
			<Navbar.Collapse>
				<Nav className="mr-auto">
					<NavLink
						to={`/${EApplications.MODEL_VIEWER}`}
						className={classNames('nav-link', {
							disabled: isAllowedApp(EApplications.MODEL_VIEWER),
						})}>
						Przeglądarka Modelu
					</NavLink>
					<NavDropdown rootCloseEvent={'click'} title="Awansowanie robót" id={EApplications.WORK_PROGRESS}>
						<NavLink
							to={`/${EApplications.WORK_PROGRESS}/${ACCEPTANCE_TYPE.MONOLITHIC}`}
							className={classNames('dropdown-item', {
								disabled: isAllowedApp(EApplicationsWithModules.WORK_PROGRESS_MONOLITHIC),
							})}>
							Monolityczne
						</NavLink>
						<NavLink
							to={`/${EApplications.WORK_PROGRESS}/${ACCEPTANCE_TYPE.PREFABRICATED}`}
							className={classNames('dropdown-item', {
								disabled: isAllowedApp(EApplicationsWithModules.WORK_PROGRESS_PREFABRICATED),
							})}>
							Prefabrykowane
						</NavLink>
						<NavLink
							to={`/${EApplications.WORK_PROGRESS}/${ACCEPTANCE_TYPE.GENERAL_CONSTRUCTION}`}
							className={classNames('dropdown-item', {
								disabled: isAllowedApp(EApplicationsWithModules.WORK_PROGRESS_GENERAL_CONSTRUCTION),
							})}>
							Ogólnobudowlane
						</NavLink>
					</NavDropdown>
					<NavDropdown
						rootCloseEvent={'click'}
						title="Dzienniki brygadzistowskie"
						id={EApplications.WORKERS_LOG}>
						<NavLink
							to={`/${EApplications.WORKERS_LOG}/${WORKERS_LOG.WORK_TIME_EVIDENCE}`}
							className={classNames('dropdown-item', {
								disabled: isAllowedApp(EApplicationsWithModules.WORKERS_LOG_WORK_TIME_EVIDENCE),
							})}>
							Ewidencja czasu pracy
						</NavLink>
						<NavLink
							to={`/${EApplications.WORKERS_LOG}/${WORKERS_LOG.LABOUR_INPUT}`}
							className={classNames('dropdown-item', {
								disabled: isAllowedApp(EApplicationsWithModules.WORKERS_LOG_LABOUR_INPUT),
							})}>
							Nakłady pracy
						</NavLink>
					</NavDropdown>
					<NavDropdown rootCloseEvent={'click'} title="Materiały budowlane" id={EApplications.WORK_PROGRESS}>
						<NavLink
							to={`/${EApplications.CONSTRUCTION_MATERIALS}/${ConstructionMaterialTypes.REINFORCEMENT}`}
							className={classNames('dropdown-item', {
								disabled: isAllowedApp(EApplicationsWithModules.CONSTRUCTION_MATERIALS_REINFORCEMENT),
							})}>
							Zbrojenie
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

export default Header;
