import * as classnames from 'classnames';
import React, { useState } from 'react';
import { Button, ButtonGroup, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { initialiseModal } from '../../../../components/Modal/redux/actions';
import SetStatus from './Structural.Results.Modal.SetStatus';
import ShowParameters from './Structural.Results.Modal.ShowParameters';
import { objectSelector } from './Structural.Results.Selector';
import ResultTable from './Structural.Results.Table';

const RATIO = {
	SCHEDULED: 'SCHEDULED',
	ACTUAL: 'ACTUAL',
	TERMS: 'TERMS',
};

function StructuralResults(props) {
	const [active, setActive] = useState(RATIO.SCHEDULED);
	const [craneFieldShow, setFieldShow] = useState(false);
	const variant = 'light';
	return (
		<Row noGutters={true} className="px-3">
			<Col xs={12} className={'border-bottom border-top'}>
				<ButtonGroup className="mr-2" aria-label="First group">
					<OverlayTrigger placement={'top'} overlay={<Tooltip>Pokaż na rzucie stan planowany</Tooltip>}>
						<Button
							className={classnames({ active: active === RATIO.SCHEDULED })}
							variant={variant}
							onClick={() => setActive((active) => active !== RATIO.SCHEDULED && RATIO.SCHEDULED)}>
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
					<OverlayTrigger placement={'top'} overlay={<Tooltip>Pokaż na rzucie stan rzeczywisty</Tooltip>}>
						<Button
							variant={variant}
							className={classnames({ active: active === RATIO.ACTUAL })}
							onClick={() => setActive((active) => active !== RATIO.ACTUAL && RATIO.ACTUAL)}>
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
					<OverlayTrigger placement={'top'} overlay={<Tooltip>Pokaż na rzucie stan rzeczywisty</Tooltip>}>
						<Button
							variant={variant}
							className={classnames({ active: active === RATIO.TERMS })}
							onClick={() => setActive((active) => active !== RATIO.TERMS && RATIO.TERMS)}>
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
					<OverlayTrigger placement={'top'} overlay={<Tooltip>Pokaż zakres pracy wybranego żurawia</Tooltip>}>
						<Button
							className={classnames('ml-2', { active: craneFieldShow })}
							variant={variant}
							onClick={() => setFieldShow((craneFieldShow) => !craneFieldShow)}>
							<svg
								width="1em"
								height="1em"
								viewBox="0 0 16 16"
								className="bi bi-arrows-move"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fill-rule="evenodd"
									d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"
								/>
							</svg>
						</Button>
					</OverlayTrigger>
				</ButtonGroup>
			</Col>
			<Col xs={12} className={''}>
				<Button
					variant={variant}
					onClick={() =>
						props.initialiseModal('Widoczność parametrów', <ShowParameters />, () =>
							console.log('zamknięto parametry'),
						)
					}>
					<svg
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						className="bi bi-check2-square"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"
						/>
						<path
							fill-rule="evenodd"
							d="M1.5 13A1.5 1.5 0 0 0 3 14.5h10a1.5 1.5 0 0 0 1.5-1.5V8a.5.5 0 0 0-1 0v5a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 0 0-1H3A1.5 1.5 0 0 0 1.5 3v10z"
						/>
					</svg>
					{'  '}
					Parametry
				</Button>
				<Button
					className={'float-right'}
					variant={'success'}
					onClick={() =>
						props.initialiseModal('Awansowanie', <SetStatus />, () => console.log('zamknięto awansowanie'))
					}>
					<svg
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						className="bi bi-card-checklist"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
						/>
						<path
							fill-rule="evenodd"
							d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"
						/>
					</svg>
					{'  '}
					Awansuj wybrane
				</Button>
			</Col>

			<Col xs={12}>
				<ResultTable />
			</Col>
		</Row>
	);
}

const mapStateToProps = (state) => ({
	objects: objectSelector(state),
});

const mapDispatchToProps = {
	initialiseModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(StructuralResults);
