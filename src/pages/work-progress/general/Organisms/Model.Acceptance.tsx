import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { WorkProgress } from '../../../../state/WorkProgress';
import _ from 'lodash';
import { StatusEnum } from '../../../../generated/graphql';
import { StatusFormInput } from '../Atoms/Input.Status';
import { DayFormInput } from '../Atoms/Input.Date';

type ComponentProps = {
	setModalActive: (data: boolean) => void;
};

function ModelAcceptance(props: ComponentProps) {
	const selectedElements = useSelector(
		WorkProgress.Selectors.Elements.GetSelectedElements,
		_.isEqual,
	);
	const dispatch = useDispatch();

	const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
	const [status, setStatus] = useState<null | StatusEnum>(null);

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
			// dispatch(
			// 	GeneralConstructionObjectActions.HandleSetStatuses(
			// 		status,
			// 		date,
			// 		// @ts-ignore
			// 		objects.map(({ id, revit_id }) => ({ id, revit_id })),
			// 	),
			// );
			// dispatch(GeneralConstructionObjectActions.SelectElements([]));
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
							Wybrano {selectedElements.length} element
							{selectedElements.length === 0 || selectedElements.length >= 5
								? 'ów'
								: selectedElements.length > 1 && selectedElements.length < 5
								? 'y'
								: ''}
						</h5>
					</Col>
				</Row>
				<Row>
					<Col>
						{selectedElements.map(
							(o, index) => (
								<h6 key={index}>
									<span className={'mr-4'}>{o.revitId}</span>
									{/*<span className={'mr-4'}>{o.details}</span>*/}
								</h6>
							),
						)}
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
