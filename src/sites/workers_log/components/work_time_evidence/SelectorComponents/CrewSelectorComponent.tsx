import React from 'react';
import { connect } from 'react-redux';
import CrewActions from '../../../redux/work_time_evidence/crew/actions';
import { RootState } from '../../../../../store';
import { Col, Form } from 'react-bootstrap';
import { ButtonRefresh } from './Button.Refresh';
import GeneralActions from '../../../redux/work_time_evidence/general/actions';
import { Name } from '../Utils/Crew.Name';

const mapStateToProps = (state: RootState) => ({
	crews: state.WorkersLog.WorkTimeEvidence.Crews.all
		? Object.values(state.WorkersLog.WorkTimeEvidence.Crews.all)
		: [],
	actual_crew: state.WorkersLog.WorkTimeEvidence.Crews.actual,
});

const mapDispatchToProps = {
	chooseCrew: CrewActions.chooseCrew,
	fetchCrewStart: CrewActions.fetchCrewStart,
	selectWorkerType: GeneralActions.selectWorkerType,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function CrewSelectorComponent(props: Props) {
	function HandleSelectCrew(e: React.ChangeEvent<HTMLSelectElement>) {
		const id = e.target.value;
		props.chooseCrew(id);
		const workerType = props.crews.find((x) => x.id === id)?.workers_type;
		if (workerType) props.selectWorkerType(workerType);
	}

	return (
		<Col xs={'auto'}>
			<label>Wybierz brygadę/podwykonawcę</label>
			<Form.Row>
				<Col>
					<Form.Control onChange={HandleSelectCrew} value={props.actual_crew || ''} size={'sm'} as="select">
						<option value={''}>Wybierz...</option>
						{props.crews.map((e) => (
							<Name key={e.id} object={e} />
						))}
					</Form.Control>
				</Col>
				<Col xs="auto">
					<ButtonRefresh onClick={() => props.fetchCrewStart()} />
				</Col>
			</Form.Row>
		</Col>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(CrewSelectorComponent);
