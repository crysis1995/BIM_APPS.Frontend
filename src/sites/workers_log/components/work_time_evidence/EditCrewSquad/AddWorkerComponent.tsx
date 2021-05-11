import React, { useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { CrewState } from '../../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../../redux/work_time_evidence/worker/types/state';
import WorkersAction from '../../../redux/work_time_evidence/worker/actions';
import { CombineWorkerIdWithName } from '../Selectors/AddWorkerComponent.Selector';
import ModalComponent from '../Modal/AddWorkerApproval';
import { Button, Form } from 'react-bootstrap';

const mapStateToProps = (state: { WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState } } }) => ({
	workersData: CombineWorkerIdWithName(state),
	workers: state.WorkersLog.WorkTimeEvidence.Workers.all,
	warbud_workers_map: state.WorkersLog.WorkTimeEvidence.Workers.warbud_workers_map,
});
const mapDispatchToProps = {
	addWorker: WorkersAction.addWorker,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function AddWorkerComponent(props: Props) {
	const [selectedWorker, setSelectedWorker] = useState<{ value: string; label: string; id: string } | null>(null);
	const [modal, showModal] = useState<boolean>(false);

	const handleAddWorker = () => {
		if (selectedWorker && props.workers && selectedWorker.id) {
			props.addWorker(props.workers[selectedWorker.id]);
		}
		setSelectedWorker(null);
	};
	const handleCancelAdd = () => {
		setSelectedWorker(null);
	};
	return (
		<>
			<Button variant={'light'} className={'mr-3'} size={'sm'}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className="bi bi-person-plus-fill"
					viewBox="0 0 16 16">
					<path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
					<path
						fill-rule="evenodd"
						d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
					/>
				</svg>
				<span className="ml-2"> Dodaj pracownika/ów</span>
			</Button>
			{/*<Select*/}
			{/*	value={selectedWorker}*/}
			{/*	isClearable*/}
			{/*	onChange={(e) => {*/}
			{/*		setSelectedWorker(e);*/}
			{/*		if (e && e !== selectedWorker) showModal(true);*/}
			{/*	}}*/}
			{/*	isSearchable*/}
			{/*	options={props.workersData}*/}
			{/*/>*/}
			{/*{selectedWorker && (*/}
			{/*	<ModalComponent*/}
			{/*		show={modal}*/}
			{/*		setShow={showModal}*/}
			{/*		worker={props.warbud_workers_map?.[selectedWorker.value]}*/}
			{/*		handleAddWorker={handleAddWorker}*/}
			{/*		handleCancelAdd={handleCancelAdd}*/}
			{/*	/>*/}
			{/*)}*/}
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkerComponent);
