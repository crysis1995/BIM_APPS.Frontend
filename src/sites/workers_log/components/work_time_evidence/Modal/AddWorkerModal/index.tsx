import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { CombineWorkerIdWithName } from './AddWorkerComponent.Selector';
import WorkersAction from '../../../../redux/work_time_evidence/worker/actions';
import { connect } from 'react-redux';
import Select from 'react-select';
import { WORKERS_LOG__WORKERS_TYPE } from '../../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';
import LocaleNameEngine from '../../../../../../localisation/LocaleName.Core';
import { v4 } from 'uuid';
import WorkersLogRedux from '../../../../redux';

type ComponentProps = {
	show: boolean;
	setShow: (data: boolean) => void;
};
const mapStateToProps = (state: { WorkersLog: ReturnType<typeof WorkersLogRedux.reducer> }) => ({
	workersData: CombineWorkerIdWithName(state),
});
const mapDispatchToProps = {
	addWorker: WorkersAction.addWorker,
	createWorker: WorkersAction.createWorker,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function AddWorkerModal(props: Props) {
	const { show, setShow } = props;
	enum WorkerInput {
		ExistWorker = 'exist_worker',
		NewWorkerName = 'new_worker_name',
		NewWorkerType = 'new_worker_type',
	}
	const [worker, setWorker] = useState<{
		[WorkerInput.ExistWorker]: { value: string; label: string; id: string } | null;
		[WorkerInput.NewWorkerName]: string | null;
		[WorkerInput.NewWorkerType]: null | WORKERS_LOG__WORKERS_TYPE;
	}>({ [WorkerInput.ExistWorker]: null, [WorkerInput.NewWorkerName]: null, [WorkerInput.NewWorkerType]: null });
	const [workerInputDisabled, setWorkerInputDisabled] = useState<{
		[WorkerInput.ExistWorker]: boolean;
		[WorkerInput.NewWorkerName]: boolean;
		[WorkerInput.NewWorkerType]: boolean;
	}>({ [WorkerInput.ExistWorker]: false, [WorkerInput.NewWorkerName]: false, [WorkerInput.NewWorkerType]: false });

	useEffect(() => {
		if (
			worker[WorkerInput.ExistWorker] === null &&
			worker[WorkerInput.NewWorkerName] === null &&
			worker[WorkerInput.NewWorkerType] === null
		) {
			setWorkerInputDisabled({
				[WorkerInput.ExistWorker]: false,
				[WorkerInput.NewWorkerName]: false,
				[WorkerInput.NewWorkerType]: false,
			});
		} else if (worker[WorkerInput.NewWorkerName] === null && worker[WorkerInput.NewWorkerType] === null) {
			setWorkerInputDisabled({
				[WorkerInput.ExistWorker]: false,
				[WorkerInput.NewWorkerName]: true,
				[WorkerInput.NewWorkerType]: true,
			});
		} else if (worker[WorkerInput.ExistWorker] === null) {
			setWorkerInputDisabled({
				[WorkerInput.ExistWorker]: true,
				[WorkerInput.NewWorkerName]: false,
				[WorkerInput.NewWorkerType]: false,
			});
		}
	}, [worker[WorkerInput.ExistWorker], worker[WorkerInput.NewWorkerName], worker[WorkerInput.NewWorkerType]]);

	const changeWorkerInputExistWorker = (data: { value: string; label: string; id: string } | null) => {
		setWorker((prevState) => ({ ...prevState, [WorkerInput.ExistWorker]: data }));
	};
	const changeWorkerInputNewWorkerName = (data: string) => {
		setWorker((prevState) => ({ ...prevState, [WorkerInput.NewWorkerName]: data ? data : null }));
	};
	const changeWorkerInputNewWorkerType = (data: WORKERS_LOG__WORKERS_TYPE) => {
		setWorker((prevState) => ({ ...prevState, [WorkerInput.NewWorkerType]: data ? data : null }));
	};

	const handleAddButton = () => {
		if (AllowAddWorker()) {
			const existWorker = worker[WorkerInput.ExistWorker];
			const newWorkerName = worker[WorkerInput.NewWorkerName];
			const newWorkerType = worker[WorkerInput.NewWorkerType];
			if (existWorker !== null) {
				props.addWorker(existWorker.id);
			}
			else if (newWorkerName && newWorkerType) {
				props.createWorker({ name: newWorkerName, worker_type: newWorkerType });
			}
		}
		setShow(false);
	};
	const handleCloseButton = () => {
		setShow(false);
	};

	const AllowAddWorker = () => {
		if (worker[WorkerInput.ExistWorker] !== null) return true;

		if (
			worker[WorkerInput.NewWorkerType] !== null &&
			(worker[WorkerInput.NewWorkerName] !== '' || worker[WorkerInput.NewWorkerName] !== null)
		)
			return true;

		return false;
	};
	return (
		<Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
			<Modal.Header>
				<Modal.Title>Dodawanie pracownika do brygady</Modal.Title>
			</Modal.Header>
			<Modal.Body className={'p-3'}>
				<Row>
					<Col>
						<Form.Label>Wybierz pracownika z listy</Form.Label>
						<Select
							onChange={changeWorkerInputExistWorker}
							options={props.workersData}
							isDisabled={workerInputDisabled[WorkerInput.ExistWorker]}
							isClearable={true}
							isSearchable={true}
							placeholder={'Wybierz pracownika...'}
						/>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col xs={12}>
						<Form.Label>
							Lub utwórz za pomocą identyfikatora (Imię i Nazwisko | Pseudonim)
							<br />
							<small className={'text-muted'}>
								Tak utworzony pracownik nie podlega ewidencji finansowej
							</small>
						</Form.Label>
					</Col>
					<Col xs={6}>
						<Form.Control
							placeholder={'Wypełnij imie i nazwisko lub pseudonim'}
							value={worker[WorkerInput.NewWorkerName] || ''}
							onChange={(x) => changeWorkerInputNewWorkerName(x.target.value)}
							disabled={workerInputDisabled[WorkerInput.NewWorkerName]}
							size={'sm'}
							as={'input'}
						/>
					</Col>
					<Col xs={6}>
						<Form.Control
							size={'sm'}
							as={'select'}
							disabled={workerInputDisabled[WorkerInput.NewWorkerType]}
							onChange={(e) =>
								changeWorkerInputNewWorkerType(e.target.value as WORKERS_LOG__WORKERS_TYPE)
							}
							value={worker[WorkerInput.NewWorkerType] || ''}>
							<option value={''}>Wybierz typ pracownika</option>
							{Object.values(WORKERS_LOG__WORKERS_TYPE).map((x) => (
								<option key={v4()} value={x}>
									{LocaleNameEngine({ value: x })}
								</option>
							))}
						</Form.Control>
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={handleCloseButton}>
					Anuluj
				</Button>
				<Button variant="success" onClick={handleAddButton}>
					Dodaj
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkerModal);
