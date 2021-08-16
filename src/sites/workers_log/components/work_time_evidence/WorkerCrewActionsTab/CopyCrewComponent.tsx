import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import CopyWorkersToCrewModal from '../Modal/CopyWorkersToCrewModal';
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

function CopyCrewComponent(props: Props) {
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
					className="bi bi-people-fill"
					viewBox="0 0 16 16">
					<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
					<path
						fillRule="evenodd"
						d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
					/>
					<path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
				</svg>
				<span className="ml-2">Kopiuj skład brygady</span>
			</Button>
			{modal && <CopyWorkersToCrewModal show={modal} setShow={showModal} />}
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(CopyCrewComponent);
