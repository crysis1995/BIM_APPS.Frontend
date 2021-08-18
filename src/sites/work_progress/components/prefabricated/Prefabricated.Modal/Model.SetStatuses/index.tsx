import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from '../../../../../../store';
import dayjs from 'dayjs';
import { GetPrefabObjectsStatusesType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetPrefabObjectsStatuses';
import { v4 } from 'uuid';
import LocaleNameEngine from '../../../../../../localisation/LocaleName.Core';
import { Lang } from '../../../../../../localisation/Lang';
import {
	FormatType,
	GetFormattedDate,
} from '../../../../../workers_log/redux/work_time_evidence/general/utils/GetFormattedDate';
import PrefabricatedObjectsActions from '../../../../redux/prefabricated/objects/actions';
import PrefabricatedGeneralActions from '../../../../redux/prefabricated/general/actions';

const selectedObjectsSelector = createSelector(
	(state: RootState) => state.WorkProgress.Prefabricated.Objects.selection,
	(state: RootState) => state.WorkProgress.Prefabricated.Objects.byRevitID,
	(selection, byRevitID) => {
		if (byRevitID && selection.length > 0) {
			const selectedObjects = selection.map((revitID) => byRevitID[revitID]).filter((x) => !!x); // potrzeba odfiltrować, bo nie wszystkie elementy są w zestawieniu
			return selectedObjects;
		}
		return [];
	},
);

function ModelSetStatuses(props: { showModal: boolean; setShowModal: (data: boolean) => void }) {
	const objects = useSelector(selectedObjectsSelector);
	const dispatch = useDispatch();
	const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
	const [status, setStatus] = useState<null | GetPrefabObjectsStatusesType.PrefabStatusEnum>(null);

	function HandleCloseModal() {
		props.setShowModal(false);
	}

	function HandleSubmitModal() {
		props.setShowModal(false);
		if (status) {
			dispatch(PrefabricatedObjectsActions.HandleSetStatuses(status, date, objects));
			dispatch(PrefabricatedObjectsActions.SelectElements([]));
			setDate(dayjs().format('YYYY-MM-DD'));
			setStatus(null);
		}
	}

	return (
		<Modal show={props.showModal} onClose={HandleCloseModal} backdrop={true} keyboard={false} centered>
			<Modal.Header>
				<Modal.Title>Awansowanie elementów prefabrykowanych</Modal.Title>
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
						{objects.map((e, index) => (
							<h6 key={index}>
								<span className={'mr-4'}>{e.revit_id}</span>
								<span className={'mr-2'}>{e.DIPCode}</span>
								<span>{e.ProjectNumber}</span>
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
				<Button variant="secondary" onClick={HandleCloseModal}>
					Zamknij
				</Button>
				<Button variant="success" onClick={HandleSubmitModal}>
					Zapisz
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModelSetStatuses;

function StatusFormInput(props: {
	status: null | GetPrefabObjectsStatusesType.PrefabStatusEnum;
	setStatus: Dispatch<SetStateAction<null | GetPrefabObjectsStatusesType.PrefabStatusEnum>>;
}) {
	const options = Object.values(
		GetPrefabObjectsStatusesType.PrefabStatusEnum,
	) as GetPrefabObjectsStatusesType.PrefabStatusEnum[];
	return (
		<>
			<Form.Label>Ustaw status elementów</Form.Label>
			<Form.Control
				data-testid={'Selector'}
				onChange={(data) =>
					props.setStatus(
						data.target.value !== ''
							? (data.target.value as GetPrefabObjectsStatusesType.PrefabStatusEnum)
							: null,
					)
				}
				as="select"
				value={props.status || ''}
				size={'sm'}
				custom>
				<option value="">Wybierz...</option>
				{options.map((e) => (
					<option key={v4()} value={e}>
						{LocaleNameEngine({
							value: e as GetPrefabObjectsStatusesType.PrefabStatusEnum,
							lang: Lang.PL,
						})}
					</option>
				))}
			</Form.Control>
		</>
	);
}

function DayFormInput(props: { date: string; setDate: (date: string) => void }) {
	return (
		<>
			<Form.Label>Wykonano w dniu</Form.Label>
			<Form.Control
				size={'sm'}
				type={'date'}
				value={props.date}
				onChange={(e) => props.setDate(GetFormattedDate(e.target.value, FormatType.Day))}
			/>
		</>
	);
}
