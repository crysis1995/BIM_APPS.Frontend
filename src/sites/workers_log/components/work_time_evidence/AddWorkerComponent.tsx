import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import GraphQLAPIService from '../../../../services/graphql.api.service';
import { CrewState } from '../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../redux/work_time_evidence/worker/types/state';
import { initialiseModal } from '../../../../components/Modal/redux/actions';
import { Button, Modal } from 'react-bootstrap';
import { WorkerPayload } from '../../redux/work_time_evidence/worker/types/payload';
import WorkersAction from '../../redux/work_time_evidence/worker/actions';
import { normalize } from '../../../../utils/normalize';

const mapStateToProps = (state: { WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState } } }) => ({
	// crews: state.WorkersLog.WorkTimeEvidence.Crews.all,
	// actual_crew: state.WorkersLog.WorkTimeEvidence.Crews.actual,
	// workers: state.WorkersLog.WorkTimeEvidence.Workers.all,
});
const mapDispatchToProps = {
	// initialiseModal,
	// chooseCrew: CrewActions.chooseCrew,
	addWorker: WorkersAction.addWorker,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function ModalComponent({
	show,
	setShow,
	worker,
	handleAddWorker,
	handleCancelAdd,
}: {
	show: boolean;
	setShow: (v: boolean) => void;
	worker: FetchWorkersPayload | undefined;
	handleAddWorker: () => void;
	handleCancelAdd: () => void;
}) {
	const handleAddButton = () => {
		setShow(false);
		handleAddWorker();
	};
	const handleCloseButton = () => {
		setShow(false);
		handleCancelAdd();
	};
	if (worker) {
		return (
			<>
				<Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false} centered>
					<Modal.Header>
						<Modal.Title>Dodawanie pracownika</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Czy na pewno chcesz dodać pracownika <strong>{worker.name || worker.warbud_id || worker.id}</strong>?
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseButton}>
							Anuluj
						</Button>
						<Button variant="primary" onClick={handleAddButton}>
							Dodaj
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	} else {
		return <></>;
	}
}
type FetchWorkersPayload = {
	id: string;
	warbud_id: string | null;
	is_house_worker: boolean;
	name: string | null;
};
function AddWorkerComponent(props: Props) {
	const [workersData, setWorkersData] = useState<{ [key: string]: FetchWorkersPayload } | null>(null);
	const [workers, setWorkers] = useState<{ value: string; label: string }[]>([]);
	const [selectedWorker, setSelectedWorker] = useState<{ value: string; label: string } | null>(null);
	const [modal, setModal] = useState<boolean>(false);
	useEffect(() => {
		async function getWorkers() {
			const api = new GraphQLAPIService();
			const fetchData: FetchWorkersPayload[] = await api.WorkersLog.WorkTimeEvidence.GetAllWorkers();
			setWorkersData(normalize(fetchData));
			setWorkers(
				fetchData.map((e) => ({ value: e.id, label: e.name ? e.name : e.warbud_id ? e.warbud_id : e.id })),
			);
		}
		getWorkers();
	}, []);

	const handleAddWorker = () => {
		if (selectedWorker && workersData) {
			//@ts-ignore
			props.addWorker(workersData[selectedWorker.value]);
		}
		setSelectedWorker(null);
	};
	const handleCancelAdd = () => {
		setSelectedWorker(null);
	};

	return (
		<tr>
			<td>
				<Select
					value={selectedWorker}
					isClearable
					onChange={(e) => {
						setSelectedWorker(e);
						if (e && e !== selectedWorker) setModal(true);
					}}
					isSearchable
					options={workers}
				/>
				{selectedWorker && (
					<ModalComponent
						show={modal}
						setShow={setModal}
						worker={workersData?.[selectedWorker.value]}
						handleAddWorker={handleAddWorker}
						handleCancelAdd={handleCancelAdd}
					/>
				)}
			</td>
		</tr>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkerComponent);
