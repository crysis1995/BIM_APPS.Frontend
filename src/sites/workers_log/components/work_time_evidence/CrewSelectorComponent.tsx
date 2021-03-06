import { Button, Col, Form } from 'react-bootstrap';
import { EApplications } from '../../../types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CrewState } from '../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../redux/work_time_evidence/worker/types/state';
import { initialiseModal } from '../../../../components/Modal/redux/actions';
import CrewActions from '../../redux/work_time_evidence/crew/actions';
import GraphQLAPIService from '../../../../services/graphql.api.service';
import { normalize } from '../../../../utils/normalize';
import { filterCrewsByWorkerTypes } from './Crew.Selector';
import { GeneralState } from '../../redux/work_time_evidence/general/types/state';

const mapStateToProps = (state: {
	CMSLogin: {
		user: { id: { id: string } };
		project: { id: string };
		credentials: {
			access_token: string;
		};
	};
	WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState; General: GeneralState } };
}) => ({
	crews: filterCrewsByWorkerTypes(state),
	actual_crew: state.WorkersLog.WorkTimeEvidence.Crews.actual,
	workers: state.WorkersLog.WorkTimeEvidence.Workers.all,
	project_id: state.CMSLogin.project.id,
	user_id: state.CMSLogin.user.id.id,
});
const mapDispatchToProps = {
	initialiseModal,
	chooseCrew: CrewActions.chooseCrew,
	fetchCrewStart: CrewActions.fetchCrewStart,
	fetchCrewEnd: CrewActions.fetchCrewEnd,
};

type CrewSelectorProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function CrewSelectorComponent(props: CrewSelectorProps) {
	const [trigger, setTrigger] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			if (trigger) {
				props.fetchCrewStart();
				const api = new GraphQLAPIService();
				props.fetchCrewEnd(
					normalize(await api.WorkersLog.WorkTimeEvidence.GetAllCrews(props.project_id, props.user_id)),
				);
				setTrigger(false);
			}
		};
		fetchData();
	}, [trigger]);
	return (
		<Col xs={'auto'} className={'ml-3'}>
			{/*<Form.Group>*/}
			<label>
				<span className="mr-3">Wybierz brygadę/podwykonawcę</span>
				<Button
					className={'p-0'}
					variant={'outline-link'}
					size={'sm'}
					id={'add_crew'}
					onClick={(e) =>
						props.initialiseModal(
							'Kreator składu osobowego brygady',
							'CrewCreator',
							() => {},
							EApplications.WORKERS_LOG,
						)
					}>
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
					<Button variant={'outline-primary'} size={'sm'} onClick={() => setTrigger(true)}>
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
			{/*</Form.Group>*/}
		</Col>
	);
}
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(CrewSelectorComponent);
