import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { FormatType, GetFormattedDate } from '../../../../redux/work_time_evidence/general/utils/GetFormattedDate';
import WorkersLogRedux from '../../../../redux';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import { CMSLoginType } from '../../../../../../components/CMSLogin/type';
import WorkersAction from '../../../../redux/work_time_evidence/worker/actions';

type ComponentProps = {
	show: boolean;
	setShow: (data: boolean) => void;
};
const mapStateToProps = (state: {
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
}) => ({
	access_token: state.CMSLogin.credentials?.access_token,
	date: state.WorkersLog.WorkTimeEvidence.General.calendar.view_range?.start,
	crew_id: state.WorkersLog.WorkTimeEvidence.Crews.actual,
	project_id: state.CMSLogin.actual_project?.id,
	user_id: state.CMSLogin.user?.id,
	actualCrewWorkers: state.WorkersLog.WorkTimeEvidence.Crews.summary?.workers,
	workersMap: state.WorkersLog.WorkTimeEvidence.Workers.warbud_workers_map,
	workersAll: state.WorkersLog.WorkTimeEvidence.Workers.all,
});
const mapDispatchToProps = {
	copyWorkersToCrew: WorkersAction.copyWorkersToCrew,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function CopyWorkersToCrewModal(props: Props) {
	const [copyFromDate, setCopyFromDate] = useState(
		GetFormattedDate(props.date ? dayjs(props.date) : dayjs(), FormatType.Month),
	);
	const [workersInFetchedCrew, setWorkersInFetchedCrew] = useState<string[]>([]);
	const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
	const ref = React.useRef<HTMLInputElement>(null);
	useEffect(() => {
		async function fetchUsers() {
			const { access_token, crew_id, project_id, user_id, actualCrewWorkers } = props;
			if (access_token && crew_id && project_id && user_id && actualCrewWorkers) {
				await new GraphQLAPIService(access_token).WorkersLog.WorkTimeEvidence.GetAllCrewSummaries({
					crew_id,
					project_id,
					end: GetFormattedDate(dayjs(copyFromDate).endOf('month'), FormatType.Day),
					start: GetFormattedDate(dayjs(copyFromDate).startOf('month'), FormatType.Day),
					user_id,
				})
					.then((e) => (e.workersLogCrewSummaries.length > 0 ? e.workersLogCrewSummaries[0] : null))
					.then((data) => {
						if (data)
							setWorkersInFetchedCrew(
								data.workers.map((x) => x.id).filter((worker) => !actualCrewWorkers.includes(worker)),
							);
						else setWorkersInFetchedCrew([]);
					})
					.catch((err) => setWorkersInFetchedCrew([]));
			}
		}

		fetchUsers();
		return () => {
			setWorkersInFetchedCrew([]);
			setSelectedWorkers([]);
		};
	}, [copyFromDate]);

	useEffect(() => {
		if (workersInFetchedCrew.length !== selectedWorkers.length && selectedWorkers.length > 0) {
			if (ref.current) ref.current.indeterminate = true;
		} else {
			if (ref.current) ref.current.indeterminate = false;
		}
	}, [workersInFetchedCrew, selectedWorkers]);

	const selectUnselectAll = () => {
		setSelectedWorkers((prevState) =>
			prevState.length === workersInFetchedCrew.length ? [] : workersInFetchedCrew,
		);
	};

	const selectItem = (worker_id: string) => {
		setSelectedWorkers((prevState) =>
			prevState.includes(worker_id) ? prevState.filter((x) => x !== worker_id) : [...prevState, worker_id],
		);
	};

	const handleCopyWorkersButton = () => {
		if (selectedWorkers.length > 0) {
			props.setShow(false);
			props.copyWorkersToCrew(selectedWorkers);
		}
	};
	const handleCloseButton = () => {
		props.setShow(false);
	};

	const GetWorkerName = (workerID: string) => {
		let name = '';
		if (props.workersAll && props.workersAll[workerID]) {
			const WorkerWarbudID = props.workersAll[workerID].warbud_id;
			if (WorkerWarbudID && props.workersMap) {
				name = props.workersMap[WorkerWarbudID].Nazwa;
			} else {
				name = props.workersAll[workerID].name || '';
			}
		}
		return name;
	};

	return (
		<Modal show={props.show} onHide={() => props.setShow(false)} backdrop="static" keyboard={false}>
			<Modal.Header>
				<Modal.Title>Kopiowanie pracowników brygady pomiędzy miesiącami</Modal.Title>
			</Modal.Header>
			<Modal.Body className={'p-3'}>
				<Row>
					<Col xs={12}>
						<h6>Wybierz miesiąc</h6>
						<input
							data-testid="data-input-1"
							type={'month'}
							className="form-control form-control-sm"
							onChange={(selectedDay) =>
								setCopyFromDate(
									GetFormattedDate(dayjs(selectedDay.currentTarget.value), FormatType.Month),
								)
							}
							value={copyFromDate}
						/>
					</Col>
					<Col xs={12} className={'pt-3'}>
						<h6>Wybierz pracowników do skopiowania</h6>
						<Table size={'sm'} bordered={false}>
							<thead>
								<tr>
									<th>
										<Form.Check
											onClick={selectUnselectAll}
											ref={ref}
											checked={
												workersInFetchedCrew.length === selectedWorkers.length &&
												selectedWorkers.length > 0
											}
											type={'checkbox'}
										/>
									</th>
									<th>Pracownik</th>
								</tr>
							</thead>
							<tbody>
								{workersInFetchedCrew.map((worker) => (
									<tr>
										<td>
											<Form.Check
												onClick={() => selectItem(worker)}
												checked={selectedWorkers.includes(worker)}
												type={'checkbox'}
											/>
										</td>
										<td>{GetWorkerName(worker)}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={handleCloseButton}>
					Anuluj
				</Button>
				<Button variant="success" onClick={handleCopyWorkersButton}>
					Dodaj
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(CopyWorkersToCrewModal);
