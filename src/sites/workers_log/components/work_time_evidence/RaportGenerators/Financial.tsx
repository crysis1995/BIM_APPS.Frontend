import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import GeneralActions from '../../../redux/work_time_evidence/general/actions';
import WorkersLog from '../../../types';

const mapStateToProps = () => ({});
const mapDispatchToProps = {
	generateRaport: GeneralActions.generateRaportStart,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function Financial(props: Props) {
	const [isLoading, setIsLoading] = useState(false);
	const handleClick = () => {
		props.generateRaport(WorkersLog.WorkTimeEvidence.General.Payload.ERaportType.Financial);
	};

	return (
		<Button disabled={isLoading} onClick={handleClick} variant={'outline-dark'} className="float-right">
			{/*{isLoading && (*/}
			{/*	<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-1" />*/}
			{/*)}*/}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-bar-chart mr-1"
				viewBox="0 0 16 16">
				<path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
			</svg>
			Generuj raport księgowy
		</Button>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Financial);
