import { faCogs, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as classnames from 'classnames';
import React from 'react';
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setActualTab } from '../../redux/actions/odbiory_actions';
import { MONOLITHIC } from '../../redux/types/constans';

function Tabs({ setActualTab, active_tab }) {
	const variant = 'light';
	return (
		<div className="d-flex flex-row w-100 border-bottom border-top">
			<ButtonGroup className="mr-2" aria-label="First group">
				<OverlayTrigger placement={'top'} overlay={<Tooltip>Pokaż plan bazowy</Tooltip>}>
					<Button
						className={classnames({ active: active_tab === MONOLITHIC.TABS.SCHEDULED })}
						variant={variant}
						onClick={() => setActualTab(MONOLITHIC.TABS.SCHEDULED)}>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							className="bi bi-bar-chart-steps"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0z" />
							<rect width="5" height="2" x="2" y="1" rx=".5" />
							<rect width="8" height="2" x="4" y="5" rx=".5" />
							<path d="M6 9.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z" />
						</svg>
						{'   '}Plan Bazowy
					</Button>
				</OverlayTrigger>

				<OverlayTrigger placement={'top'} overlay={<Tooltip>Pokaż stan rzeczywisty</Tooltip>}>
					<Button
						variant={variant}
						className={classnames({ active: active_tab === MONOLITHIC.TABS.ACTUAL })}
						onClick={() => setActualTab(MONOLITHIC.TABS.ACTUAL)}>
						<FontAwesomeIcon icon={faCogs} />
						{'   '}Realizacja
					</Button>
				</OverlayTrigger>
				<OverlayTrigger
					placement={'top'}
					overlay={<Tooltip>Pokaż dane dotyczące historię realizacji obiektu</Tooltip>}>
					<Button
						variant={variant}
						className={classnames({ active: active_tab === MONOLITHIC.TABS.HISTORICAL })}
						onClick={() => setActualTab(MONOLITHIC.TABS.HISTORICAL)}>
						<FontAwesomeIcon icon={faCogs} />
						{'   '}Historia
					</Button>
				</OverlayTrigger>
				<OverlayTrigger placement={'top'} overlay={<Tooltip>Pokaż terminy</Tooltip>}>
					<Button
						variant={variant}
						className={classnames({ active: active_tab === MONOLITHIC.TABS.TERMS })}
						onClick={() => setActualTab(MONOLITHIC.TABS.TERMS)}>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							className="bi bi-calendar-date"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
							/>
							<path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
						</svg>
						{'   '}Terminy
					</Button>
				</OverlayTrigger>
				<OverlayTrigger
					placement={'top'}
					overlay={<Tooltip>Pokaż widok raportowania powodów opóźnień</Tooltip>}>
					<Button
						variant={variant}
						className={classnames({ active: active_tab === MONOLITHIC.TABS.DELAY })}
						onClick={() => setActualTab(MONOLITHIC.TABS.DELAY)}>
						<FontAwesomeIcon icon={faHourglassEnd} />
						{'   '}Opóźnienia
					</Button>
				</OverlayTrigger>
				<OverlayTrigger placement={'top'} overlay={<Tooltip>Pokaż dziennik brygadzisty</Tooltip>}>
					<Button
						variant={variant}
						className={classnames({ active: active_tab === MONOLITHIC.TABS.LOG })}
						onClick={() => setActualTab(MONOLITHIC.TABS.LOG)}>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							className="bi bi-journal-text"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
							<path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
							<path
								fillRule="evenodd"
								d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
							/>
						</svg>
						{'   '}Dziennik
					</Button>
				</OverlayTrigger>
			</ButtonGroup>
		</div>
	);
}

const mapStateToProps = ({ Odbiory }) => ({
	active_tab: Odbiory.OdbioryComponent.MONOLITHIC.active_tab,
});

const mapDispatchToProps = {
	setActualTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
