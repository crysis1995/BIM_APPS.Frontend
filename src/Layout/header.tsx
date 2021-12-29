import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import AutodeskLoginComponent from '../components/AutodeskLogin';
import CMSLoginComponent from '../components/CMSLogin';
import classNames from 'classnames';
import { AppEnum } from '../generated/graphql';
import { CurrentProjectAppsSelector } from '../state/CMSLogin/selectors';
import AppRoutes from '../pages/appRoutes';
import { Constants } from '../state/WorkProgress/constants';

function Header() {
	const projectApps = useSelector(CurrentProjectAppsSelector);

	function isAllowedApp(app_type: AppEnum) {
		return !projectApps?.some((app) => app.appName === app_type);
	}

	return (
		<Navbar bg="light" expand="lg" className="flex-shrink-0">
			<NavLink to="/">
				<Navbar.Brand>WSPro v2</Navbar.Brand>
			</NavLink>
			<Navbar.Collapse>
				<Nav className="mr-auto">
					<NavLink
						to={`/${AppRoutes.ModelViewer}`}
						className={classNames('nav-link', {
							disabled: isAllowedApp(AppEnum.ModelViewer),
						})}>
						Przeglądarka Modelu
					</NavLink>
					<NavDropdown
						rootCloseEvent={'click'}
						title="Awansowanie robót"
						id={AppRoutes.WorkProgress}>
						<NavLink
							to={`/${AppRoutes.WorkProgress}/${Constants.AcceptanceType.MONOLITHIC}`}
							className={classNames('dropdown-item', {
								disabled: isAllowedApp(AppEnum.WorkProgressMonolithic),
							})}>
							Monolityczne
						</NavLink>
						<NavLink
							to={`/${AppRoutes.WorkProgress}/${Constants.AcceptanceType.PREFABRICATED}`}
							className={classNames('dropdown-item', {
								disabled: isAllowedApp(AppEnum.WorkProgressPrecast),
							})}>
							Prefabrykowane
						</NavLink>
						<NavLink
							to={`/${AppRoutes.WorkProgress}/${Constants.AcceptanceType.GENERAL_CONSTRUCTION}`}
							className={classNames('dropdown-item', {
								disabled: isAllowedApp(AppEnum.WorkProgressGeneral),
							})}>
							Ogólnobudowlane
						</NavLink>
					</NavDropdown>
					{/*<NavDropdown*/}
					{/*	rootCloseEvent={'click'}*/}
					{/*	title="Dzienniki brygadzistowskie"*/}
					{/*	id={EApplications.WORKERS_LOG}>*/}
					{/*	<NavLink*/}
					{/*		to={`/${EApplications.WORKERS_LOG}/${WORKERS_LOG.WORK_TIME_EVIDENCE}`}*/}
					{/*		className={classNames('dropdown-item', {*/}
					{/*			disabled: isAllowedApp(AppEnum.WorkersLogWorkTimeEvidence),*/}
					{/*		})}>*/}
					{/*		Ewidencja czasu pracy*/}
					{/*	</NavLink>*/}
					{/*	<NavLink*/}
					{/*		to={`/${EApplications.WORKERS_LOG}/${WORKERS_LOG.LABOUR_INPUT}`}*/}
					{/*		className={classNames('dropdown-item', {*/}
					{/*			disabled: isAllowedApp(AppEnum.WorkersLogLabourInput),*/}
					{/*		})}>*/}
					{/*		Nakłady pracy*/}
					{/*	</NavLink>*/}
					{/*</NavDropdown>*/}
					{/*<NavDropdown*/}
					{/*	rootCloseEvent={'click'}*/}
					{/*	title="Materiały budowlane"*/}
					{/*	id={EApplications.WORK_PROGRESS}>*/}
					{/*	<NavLink*/}
					{/*		to={`/${EApplications.CONSTRUCTION_MATERIALS}/${ConstructionMaterialTypes.REINFORCEMENT}`}*/}
					{/*		className={classNames('dropdown-item', {*/}
					{/*			disabled: isAllowedApp(*/}
					{/*				EApplicationsWithModules.CONSTRUCTION_MATERIALS_REINFORCEMENT,*/}
					{/*			),*/}
					{/*		})}>*/}
					{/*		Zbrojenie*/}
					{/*	</NavLink>*/}
					{/*</NavDropdown>*/}
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
