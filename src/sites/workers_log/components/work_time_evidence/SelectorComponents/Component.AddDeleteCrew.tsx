import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import { ButtonAdd } from './Button.Add';
import { ButtonDelete } from './Button.Delete';
import CrewCreatorModal from '../Modal/CrewCreator';
import DeleteCrewModal from '../Modal/DeleteCrewModal';

export default function ComponentAddDeleteCrew() {
	const [showAddModal, setShowAddModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	return (
		<>
			<Col xs={'auto'} className={'ml-4'}>
				<ButtonAdd onClick={() => setShowAddModal(true)} message={'Dodaj brygadę'} />
				<ButtonDelete onClick={() => setShowDeleteModal(true)} message={'Usuń brygadę'} />
			</Col>
			<CrewCreatorModal setShow={setShowAddModal} show={showAddModal} />
			<DeleteCrewModal setShow={setShowDeleteModal} show={showDeleteModal} />
		</>
	);
}
