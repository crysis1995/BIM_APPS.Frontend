import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ModelSetStatuses from '../Prefabricated.Modal/Model.SetStatuses';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import PrefabricatedGeneralActions from '../../../redux/prefabricated/general/actions';

function PrefabricatedActionButtons() {
	const dispatch = useDispatch();
	const StatusOnModelVisibility = useSelector(
		(state: RootState) => state.WorkProgress.Prefabricated.General.isStatusOnModelVisible,
	);
	const [showModal, setShowModal] = useState(false);

	const CanShowModal = useSelector(
		(state: RootState) => state.WorkProgress.Prefabricated.Objects.selection.length === 0,
	);

	function HandleClickAccepntance() {
		setShowModal(true);
	}

	return (
		<Row>
			<Col className={'pb-3'}>
				<Button
					active={StatusOnModelVisibility}
					onClick={() =>
						dispatch(PrefabricatedGeneralActions.ChangeStatusOnModelVisibility(!StatusOnModelVisibility))
					}
					size={'sm'}
					variant={'outline-primary'}>
					Pokaż statusy na modelu
				</Button>
				{/*<Button*/}
				{/*	// active={ShowStatusActive}*/}
				{/*	// onClick={() => setShowStatusActive((p) => !p)}*/}
				{/*	size={'sm'}*/}
				{/*	variant={'outline-primary'}>*/}
				{/*	Pokaż tylko zaznaczone*/}
				{/*</Button>*/}
				<Button
					onClick={HandleClickAccepntance}
					disabled={CanShowModal}
					className={'float-right'}
					size={'sm'}
					variant={'success'}>
					Awansuj wybrane elementy
				</Button>
			</Col>
			<ModelSetStatuses showModal={showModal} setShowModal={setShowModal} />
		</Row>
	);
}

export default PrefabricatedActionButtons;
