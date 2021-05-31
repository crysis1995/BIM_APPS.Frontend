import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import WorkersLogRedux from '../../../../redux';
import WorkersInCrew from './WorkersInCrew.Selector';
import Select from 'react-select';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import { CMSLoginType } from '../../../../../../components/CMSLogin/type';
import WorkersAction from '../../../../redux/work_time_evidence/worker/actions';

type ComponentProps = {
	show: boolean;
	setShow: (data: boolean) => void;
};
const mapStateToProps = (state: {
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
	CMSLogin: CMSLoginType.Redux.Store;
}) => ({
	workersInCrew: WorkersInCrew(state),
	access_token: state.CMSLogin.credentials?.access_token,
	crew_summary_id: state.WorkersLog.WorkTimeEvidence.Crews.summary?.id,
});
const mapDispatchToProps = {
	deleteWorker: WorkersAction.deleteWorker,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function DeleteWorkerModal(props: Props) {
	const [workerToDelete, setWorkerToDelete] = useState<{ label: string; value: string } | null>(null);
	const [canDelete, setCanDelete] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	useEffect(() => {
		async function CheckIfCanDelete() {
			if (workerToDelete && props.crew_summary_id) {
				const response = await new GraphQLAPIService(
					props.access_token,
				).WorkersLog.WorkTimeEvidence.Worker.AgregateTimeEvidence({
					worker_id: workerToDelete.value,
					crew_summary_id: props.crew_summary_id,
				});
				if (response.data) {
					const sum = response.data.workersLogWorkTimeEvidencesConnection.aggregate.sum.worked_time;
					if (sum === null || sum === 0) {
						setCanDelete(true);
						setErrorMessage('');
						return;
					}
				}
				setCanDelete(false);
				setErrorMessage('Nie można usunać tego pracownika!');
			}

			return;
		}

		CheckIfCanDelete();
	}, [workerToDelete]);

	const handleDeleteButton = () => {
		if (canDelete && workerToDelete) {
			props.setShow(false);
			props.deleteWorker(workerToDelete.value);
		}
	};
	const handleCloseButton = () => {
		props.setShow(false);
	};
	return (
		<Modal show={props.show} onHide={() => props.setShow(false)} backdrop="static" keyboard={false}>
			<Modal.Header>
				<Modal.Title>Usuwanie pracownika z brygady</Modal.Title>
			</Modal.Header>
			<Modal.Body className={'p-3'}>
				<Row>
					<Col xs={12}>
						<Form.Label>Wybierz pracownika do usunięcia</Form.Label>
						<Select
							onChange={(x) => setWorkerToDelete(x)}
							value={workerToDelete}
							options={props.workersInCrew}
							isClearable={true}
							isSearchable={true}
						/>
					</Col>
					{!!errorMessage && (
						<Col xs={12} className={'pt-3 pb-0'}>
							<Alert variant={'danger'} className={'text-center'}>
								{errorMessage}
							</Alert>
						</Col>
					)}
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={handleCloseButton}>
					Anuluj
				</Button>
				<Button variant="success" onClick={handleDeleteButton}>
					Usuń z listy
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteWorkerModal);
