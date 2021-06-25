import { Button, Col, Form } from 'react-bootstrap';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import CrewActions from '../../../redux/work_time_evidence/crew/actions';
import { filterCrewsByWorkerTypes } from '../Selectors/Crew.Selector';
import CrewCreatorModal from '../Modal/CrewCreator';
import { RootState } from '../../../../../store';

const mapStateToProps = (state: RootState) => ({
	crews: filterCrewsByWorkerTypes(state),
	actual_crew: state.WorkersLog.WorkTimeEvidence.Crews.actual,
});

const mapDispatchToProps = {
	chooseCrew: CrewActions.chooseCrew,
	fetchCrewStart: CrewActions.fetchCrewStart,
};

type CrewSelectorProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function CrewSelectorComponent(props: CrewSelectorProps) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Col xs={'auto'} className={'ml-3'}>
				<label>
					<span className="mr-3">Wybierz brygadę/podwykonawcę</span>
					<Button
						className={'p-0'}
						variant={'outline-link'}
						size={'sm'}
						id={'add_crew'}
						onClick={(e) => setShowModal(true)}>
						+
					</Button>
				</label>
				<Form.Row>
					<Col>
						<Form.Control onChange={(e) => props.chooseCrew(e.target.value)} size={'sm'} as="select">
							<option value={''}>Wybierz...</option>
							{props.crews.map((e) => (
								<option key={e.id} value={e.id}>
									{e.name}
								</option>
							))}
						</Form.Control>
					</Col>
					<Col xs="auto">
						<Button variant={'outline-primary'} size={'sm'} onClick={() => props.fetchCrewStart()}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="bi bi-arrow-clockwise"
								viewBox="0 0 16 16">
								<path
									fillRule="evenodd"
									d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
								/>
								<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
							</svg>
						</Button>
					</Col>
				</Form.Row>
			</Col>
			<CrewCreatorModal setShow={setShowModal} show={showModal} />
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(CrewSelectorComponent);
