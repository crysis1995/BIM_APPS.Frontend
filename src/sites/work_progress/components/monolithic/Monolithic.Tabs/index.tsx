import React from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, OverlayTrigger, Tooltip } from 'react-bootstrap';
import classnames from 'classnames';
import LocaleNameComponent from '../../../../../localisation/LocaleNameComponent';
import { ELEMENT_DESCRIPTIONS, TOOLTIPS_MESSAGES } from '../../../../../config';
import { Constants } from '../../../redux/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { RootState } from '../../../../../store';
import GeneralActions from '../../../redux/monolithic/general/actions';

const mapStateToProps = (state: RootState) => ({ active_tab: state.WorkProgress.Monolithic.General.active_tab });
const mapDispatchToProps = {
	SetActiveTab: GeneralActions.SetActiveTab,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function MonolithicTabs(props: Props) {
	const variant = 'light';
	const delay = 500;
	const tooltipsShow = true;
	return (
		<div className="d-flex flex-row w-100 border-bottom border-top">
			<ButtonGroup className="mr-2" aria-label="First group">
				<OverlayTrigger
					popperConfig={{ enabled: tooltipsShow }}
					delay={delay}
					placement={'top'}
					overlay={
						<Tooltip id={'6248fa9b-67a6-4b79-94d4-4e486fa8939f'}>
							<LocaleNameComponent value={TOOLTIPS_MESSAGES.TooltipShowBasePlan} />
						</Tooltip>
					}>
					<Button
						className={classnames({ active: props.active_tab === Constants.MonolithicTabs.SCHEDULED })}
						variant={variant}
						onClick={() => props.SetActiveTab(Constants.MonolithicTabs.SCHEDULED)}>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							className="bi bi-bar-chart-steps mr-2"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0z" />
							<rect width="5" height="2" x="2" y="1" rx=".5" />
							<rect width="8" height="2" x="4" y="5" rx=".5" />
							<path d="M6 9.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z" />
						</svg>
						<LocaleNameComponent value={ELEMENT_DESCRIPTIONS.ButtonBasePlan} />
					</Button>
				</OverlayTrigger>

				<OverlayTrigger
					popperConfig={{ enabled: tooltipsShow }}
					delay={delay}
					placement={'top'}
					overlay={
						<Tooltip id={'8568e1ee-c79c-45c9-956e-a109d49df92c'}>
							<LocaleNameComponent value={TOOLTIPS_MESSAGES.TooltipShowActualPlan} />
						</Tooltip>
					}>
					<Button
						variant={variant}
						className={classnames({ active: props.active_tab === Constants.MonolithicTabs.CURRENT })}
						onClick={() => props.SetActiveTab(Constants.MonolithicTabs.CURRENT)}>
						<FontAwesomeIcon icon={faCogs} className={'mr-2'} />
						<LocaleNameComponent value={ELEMENT_DESCRIPTIONS.ButtonActualPlan} />
					</Button>
				</OverlayTrigger>
				<OverlayTrigger
					popperConfig={{ enabled: tooltipsShow }}
					delay={delay}
					placement={'top'}
					overlay={
						<Tooltip id={'7a336e75-57d1-4665-b989-90b4d76770bc'}>
							<LocaleNameComponent value={TOOLTIPS_MESSAGES.TooltipShowHistoricPlan} />
						</Tooltip>
					}>
					<Button
						variant={variant}
						className={classnames({ active: props.active_tab === Constants.MonolithicTabs.HISTORICAL })}
						onClick={() => props.SetActiveTab(Constants.MonolithicTabs.HISTORICAL)}>
						<FontAwesomeIcon icon={faCogs} className={'mr-2'} />
						<LocaleNameComponent value={ELEMENT_DESCRIPTIONS.ButtonHistoricPlan} />
					</Button>
				</OverlayTrigger>
				<OverlayTrigger
					popperConfig={{ enabled: tooltipsShow }}
					delay={delay}
					placement={'top'}
					overlay={
						<Tooltip id={'65ccb876-a6eb-4276-9292-0d37e6ee0514'}>
							<LocaleNameComponent value={TOOLTIPS_MESSAGES.TooltipShowTermsPlan} />
						</Tooltip>
					}>
					<Button
						variant={variant}
						className={classnames({ active: props.active_tab === Constants.MonolithicTabs.TERMS })}
						onClick={() => props.SetActiveTab(Constants.MonolithicTabs.TERMS)}>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							className="bi bi-calendar-date mr-2"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
							/>
							<path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
						</svg>
						<LocaleNameComponent value={ELEMENT_DESCRIPTIONS.ButtonTermPlan} />
					</Button>
				</OverlayTrigger>
				<OverlayTrigger
					popperConfig={{ enabled: tooltipsShow }}
					delay={delay}
					placement={'top'}
					overlay={
						<Tooltip id={'876ryh32t6du2i38tdygu238yf'}>
							<LocaleNameComponent value={TOOLTIPS_MESSAGES.TooltipShowDelay} />
						</Tooltip>
					}>
					<DropdownButton
						as={ButtonGroup}
						variant={variant}
						className={classnames({
							active:
								props.active_tab === Constants.MonolithicTabs.DELAY_LIST ||
								props.active_tab === Constants.MonolithicTabs.DELAY_CREATE,
						})}
						title={
							<>
								<FontAwesomeIcon className={'mr-2'} icon={faHourglassEnd} />
								<LocaleNameComponent value={ELEMENT_DESCRIPTIONS.ButtonDelay} />
							</>
						}
						id="bg-nested-dropdown">
						<Dropdown.Item
							active={props.active_tab === Constants.MonolithicTabs.DELAY_CREATE}
							onClick={() => props.SetActiveTab(Constants.MonolithicTabs.DELAY_CREATE)}>
							<LocaleNameComponent value={ELEMENT_DESCRIPTIONS.ButtonDelayCreator} />
						</Dropdown.Item>
						<Dropdown.Item
							active={props.active_tab === Constants.MonolithicTabs.DELAY_LIST}
							onClick={() => props.SetActiveTab(Constants.MonolithicTabs.DELAY_LIST)}>
							<LocaleNameComponent value={ELEMENT_DESCRIPTIONS.ButtonDelayList} />
						</Dropdown.Item>
					</DropdownButton>
				</OverlayTrigger>
			</ButtonGroup>
		</div>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(MonolithicTabs);
