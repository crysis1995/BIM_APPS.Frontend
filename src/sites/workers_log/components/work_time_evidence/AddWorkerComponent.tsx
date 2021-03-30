import React, { useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { CrewState } from '../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../redux/work_time_evidence/worker/types/state';
import WorkersAction from '../../redux/work_time_evidence/worker/actions';
import { CombineWorkerIdWithName } from './Selectors/AddWorkerComponent.Selector';
import ModalComponent from './Modal/AddWorkerApproval/';
import { Form } from 'react-bootstrap';

const mapStateToProps = (state: { WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState } } }) => ({
	workersData: CombineWorkerIdWithName(state),
	workers: state.WorkersLog.WorkTimeEvidence.Workers.all,
	warbud_workers_map: state.WorkersLog.WorkTimeEvidence.Workers.warbud_workers_map,
});
const mapDispatchToProps = {
	addWorker: WorkersAction.addWorker,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { show: boolean };

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
	if (props.show)
		return (
			<div style={{ zIndex: 1000 }}>
				<Select
					value={selectedWorker}
					isClearable
					onChange={(e) => {
						setSelectedWorker(e);
						if (e && e !== selectedWorker) showModal(true);
					}}
					isSearchable
					options={props.workersData}
				/>
				{selectedWorker && (
					<ModalComponent
						show={modal}
						setShow={showModal}
						worker={props.warbud_workers_map?.[selectedWorker.value]}
						handleAddWorker={handleAddWorker}
						handleCancelAdd={handleCancelAdd}
					/>
				)}
			</div>
		);
	return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkerComponent);
