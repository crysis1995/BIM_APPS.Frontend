import React, { useState } from 'react';
import { connect } from 'react-redux';
import AddWorkerModal from '../Modal/AddWorkerModal';
import { Button } from 'react-bootstrap';
import WorkersLogRedux from '../../../redux';

const mapStateToProps = (state: { WorkersLog: ReturnType<typeof WorkersLogRedux.reducer> }) => ({
	isLoadedWarbudWorkers:
		!!state.WorkersLog.WorkTimeEvidence.Workers.warbud_workers_map &&
		!!state.WorkersLog.WorkTimeEvidence.Workers.all,
	isWorkerType: !!state.WorkersLog.WorkTimeEvidence.General.worker_type,
	isCrew: !!state.WorkersLog.WorkTimeEvidence.Crews.actual,
	isCrewSummary: !!state.WorkersLog.WorkTimeEvidence.Crews.summary,
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function AddWorkerComponent(props: Props) {
	const [modal, showModal] = useState<boolean>(false);

	const openModal = () => {
		if (props.isLoadedWarbudWorkers) showModal(true);
	};
	const isDisabled = () => {
		return !props.isLoadedWarbudWorkers || !props.isWorkerType || !props.isCrew || !props.isCrewSummary;
	};
	return (
		<>
			<Button disabled={isDisabled()} variant={'light'} size={'sm'} onClick={() => openModal()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-person-plus-fill"
					viewBox="0 0 16 16">
					<path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
					<path
						fillRule="evenodd"
						d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
					/>
				</svg>
				<span className="ml-2"> Dodaj pracownika</span>
			</Button>
			{modal && <AddWorkerModal show={modal} setShow={showModal} />}
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkerComponent);
