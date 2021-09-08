import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ObjectSelectors from '../../../redux/general_construction/objects/selectors';
import dayjs from 'dayjs';
import { GetObjectsByLevelType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import { DayFormInput } from '../Atoms/Input.Date';
import { StatusFormInput } from '../Atoms/Input.Status';
import GeneralConstructionObjectActions from '../../../redux/general_construction/objects/actions';

type ComponentProps = {
	setModalActive: (data: boolean) => void;
};

function ModelAcceptance(props: ComponentProps) {
	const objects = useSelector(ObjectSelectors.ObjectsSelected);
	const dispatch = useDispatch();

	const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
	const [status, setStatus] = useState<null | GetObjectsByLevelType.StatusEnum>(null);

	function SetInitial() {
		setStatus(null);
		setDate(dayjs().format('YYYY-MM-DD'));
	}

	function HandleHideModal() {
		props.setModalActive(false);
		SetInitial();
	}

	function HandleSubmit() {
		if (status) {
			props.setModalActive(false);
			dispatch(
				GeneralConstructionObjectActions.HandleSetStatuses(
					status,
					date,
					objects.map(({ id, revit_id }) => ({ id, revit_id })),
				),
			);
			dispatch(GeneralConstructionObjectActions.SelectElements([]));
			SetInitial();
		}
	}
	return (
		<Modal show={true} onClose={HandleHideModal} backdrop={true} keyboard={false} centered>
			<Modal.Header>
				<Modal.Title>Awansowanie elementów</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col>
						<h5>
							Wybrano {objects.length} element
							{objects.length === 0 || objects.length >= 5
								? 'ów'
								: objects.length > 1 && objects.length < 5
								? 'y'
								: ''}
						</h5>
					</Col>
				</Row>
				<Row>
					<Col>
						{objects.map((o, index) => (
							<h6 key={index}>
								<span className={'mr-4'}>{o.revit_id}</span>
								{/*<span className={'mr-4'}>{o.details}</span>*/}
							</h6>
						))}
					</Col>
				</Row>
				<hr />
				<Row>
					<Col xs={6}>
						<StatusFormInput status={status} setStatus={setStatus} />
					</Col>
					<Col xs={6}>
						<DayFormInput date={date} setDate={setDate} />
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Button variant={'secondary'} onClick={HandleHideModal}>
					Zamknij
				</Button>
				<Button variant={'success'} onClick={HandleSubmit}>
					Zapisz
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModelAcceptance;
