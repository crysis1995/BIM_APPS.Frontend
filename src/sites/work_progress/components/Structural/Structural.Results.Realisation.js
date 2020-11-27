import React from 'react';
import { Button, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { initialiseModal } from '../../../../components/Modal/redux/actions';
import { handleSelectedElements } from '../../redux/actions/upgrading_actions';
import SetStatus from './Structural.Results.Modal.SetStatus';
import ShowParameters from './Structural.Results.Modal.ShowParameters';
import ResultTable from './Structural.Results.Table';

function Realisation({ initialiseModal, handleSelectedElements }) {
	const variant = 'light';
	return (
		<>
			<Col xs={12} className={'d-flex justify-content-between'}>
				<OverlayTrigger
					placement={'top'}
					overlay={<Tooltip>Pokaż okno ustawiania widoczności parametrów</Tooltip>}>
					<Button
						variant={variant}
						onClick={() => initialiseModal('Widoczność parametrów', <ShowParameters />)}>
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
					</Button>
				</OverlayTrigger>
				<OverlayTrigger placement={'top'} overlay={<Tooltip>Wyczyść zaznaczenie</Tooltip>}>
					<Button className={'mr-auto'} variant={variant} onClick={() => handleSelectedElements()}>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							className="bi bi-folder-x"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M9.828 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91H9v1H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0 0 13.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293z"
							/>
							<path
								fillRule="evenodd"
								d="M11.146 10.146a.5.5 0 0 1 .708 0L13 11.293l1.146-1.147a.5.5 0 0 1 .708.708L13.707 12l1.147 1.146a.5.5 0 0 1-.708.708L13 12.707l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 12l-1.147-1.146a.5.5 0 0 1 0-.708z"
							/>
						</svg>
					</Button>
				</OverlayTrigger>

				<Button
					className={'float-right'}
					variant={'success'}
					onClick={() => initialiseModal('Awansowanie', <SetStatus />)}>
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
			<Col xs={12} className="h-100" style={{ overflowY: 'auto', maxHeight: 500 }}>
				<ResultTable />
			</Col>
		</>
	);
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
	initialiseModal,
	handleSelectedElements,
};

export default connect(mapStateToProps, mapDispatchToProps)(Realisation);
