import React from 'react';
import { Button, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { RootState } from '../../../../../../store';
import ObjectsTable from '../Components/ObjectsTable';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function ResultsHistorical(props: Props) {
	const variant = 'light';
	return (
		<>
			<Col xs={12} className={'d-flex justify-content-between'}>
				<OverlayTrigger
					placement={'top'}
					overlay={
						<Tooltip id={'ec6ab52c-5137-4592-b3b8-0a5ab26811e6'}>
							Pokaż okno ustawiania widoczności parametrów
						</Tooltip>
					}>
					<Button variant={variant}>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							className="bi bi-check2-square"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"
							/>
							<path
								fillRule="evenodd"
								d="M1.5 13A1.5 1.5 0 0 0 3 14.5h10a1.5 1.5 0 0 0 1.5-1.5V8a.5.5 0 0 0-1 0v5a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 0 0-1H3A1.5 1.5 0 0 0 1.5 3v10z"
							/>
						</svg>
					</Button>
				</OverlayTrigger>
				<OverlayTrigger
					placement={'top'}
					overlay={<Tooltip id={'b385d853-13b0-407a-b5b1-b163a66a87f7'}>Wyczyść zaznaczenie</Tooltip>}>
					<Button className={'mr-auto'} variant={variant} onClick={() => {}}>
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
			</Col>
			<Col xs={12} className="h-100" style={{ overflowY: 'auto', maxHeight: 500 }}>
				<ObjectsTable allowSelection={false} showStatuses={false} />
			</Col>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsHistorical);
