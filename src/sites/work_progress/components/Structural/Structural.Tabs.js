import * as classnames from 'classnames';
import React from 'react';
import { Button, ButtonGroup, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
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
							className="bi bi-calendar-date-fill"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fill-rule="evenodd"
								d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm.066-2.544c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2zm-2.957-2.89v5.332H5.77v-4.61h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z"
							/>
						</svg>
						{'   '}Plan Bazowy
					</Button>
				</OverlayTrigger>

				<OverlayTrigger placement={'top'} overlay={<Tooltip>Pokaż stan rzeczywisty</Tooltip>}>
					<Button
						variant={variant}
						className={classnames({ active: active_tab === MONOLITHIC.TABS.ACTUAL })}
						onClick={() => setActualTab(MONOLITHIC.TABS.ACTUAL)}>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							className="bi bi-clock-fill"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fill-rule="evenodd"
								d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
							/>
						</svg>
						{'   '}Realizacja
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
							className="bi bi-clock-fill"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fill-rule="evenodd"
								d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
							/>
						</svg>
						{'   '}Terminy
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
