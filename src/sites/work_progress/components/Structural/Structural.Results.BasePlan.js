import React from 'react';
import { Button, OverlayTrigger, Tooltip,Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { initialiseModal } from '../../../../components/Modal/redux/actions';
import ShowParameters from './Structural.Results.Modal.ShowParameters';
import ResultTable from './Structural.Results.Table';

function BasePlan({ initialiseModal }) {
	const variant = 'light';
	return (
		<>
			<Col xs={12} className={'d-flex justify-content-between'}>
				<OverlayTrigger
					placement={'top'}
					overlay={<Tooltip>Pokaż okno ustawiania widoczności parametrów</Tooltip>}>
					<Button
						variant={variant}
						onClick={() =>
							initialiseModal('Widoczność parametrów', <ShowParameters />, () =>
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
					</Button>
				</OverlayTrigger>
			</Col>
			<Col xs={12} className="h-100" style={{ overflowY: 'auto', maxHeight: '500px' }}>
				<ResultTable allowSelection={false} />
			</Col>
		</>
	);
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
	initialiseModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(BasePlan);
