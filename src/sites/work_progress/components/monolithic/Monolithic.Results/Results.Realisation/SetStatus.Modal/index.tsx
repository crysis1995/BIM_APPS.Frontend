import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { RootState } from '../../../../../../../store';
import {
	FormatType,
	GetFormattedDate,
} from '../../../../../../workers_log/redux/work_time_evidence/general/utils/GetFormattedDate';
import WorkProgressMonolithicUpgradingActions from '../../../../../redux/monolithic/upgrading/actions';
import { ModalHeader } from './Component.ModalHeader';
import ComponentModalBody from './Component.ModalBody';
import { createSelector } from 'reselect';

const selectedElementsSelector = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.selectedElements,
	(selectedElements) => selectedElements,
);

const mapStateToProps = (state: RootState) => ({
	selectedElements: selectedElementsSelector(state),
});
const mapDispatchToProps = {
	SetStatusesInit: WorkProgressMonolithicUpgradingActions.SetStatusesInit,
};
type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & { show: boolean; setShow: (v: boolean) => void };

function SetStatusModal(props: Props) {
	const [status, setStatus] = useState<string | null>(null);
	const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

	const handleCloseModal = () => {
		props.setShow(false);
		setStatus(null);
		setDate(dayjs().format('YYYY-MM-DD'));
	};

	const handleSubmit = () => {
		if (status) {
			props.SetStatusesInit({
				selectedElements: props.selectedElements,
				status_id: status,
				date: GetFormattedDate(date, FormatType.Day),
			});
			props.setShow(false);
			setStatus(null);
			setDate(dayjs().format('YYYY-MM-DD'));
		}
	};

	return (
		<Modal show={props.show} onClose={handleCloseModal} backdrop={true} keyboard={false} centered>
			<Modal.Header>
				<Modal.Title>Awansowanie elementów</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ModalHeader length={props.selectedElements.length} />
				{props.selectedElements.length > 0 && (
					<ComponentModalBody status={status} setStatus={setStatus} date={date} setDate={setDate} />
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCloseModal}>
					Zamknij
				</Button>
				<Button variant="success" onClick={handleSubmit}>
					Zapisz
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(SetStatusModal);
