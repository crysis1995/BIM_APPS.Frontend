import React, { ChangeEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LabourInputGeneralActions from '../../../redux/labour_input/general/actions';
import { Form } from 'react-bootstrap';
import { v4 } from 'uuid';
import LocaleNameEngine from '../../../../../localisation/LocaleName.Core';
import { GetCrewsAndTheirCrewSummariesType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetCrewsAndTheirCrewSummaries';
import { RootState } from '../../../../../store';

const mapStateToProps = (state: RootState) => ({
	ActualCrew: state.WorkersLog.LabourInput.General.ActualCrew,
	AllCrews: state.WorkersLog.General.all_crews,
});

const mapDispatchToProps = {
	SelectCrew: LabourInputGeneralActions.SelectCrew,
	SelectWorkerType: LabourInputGeneralActions.SelectWorkerType,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function CrewTypeSelectorComponent(props: Props) {
	const [crews, setCrews] = useState<{ id: string; name: string }[]>([]);
	useEffect(() => {
		if (props.AllCrews) {
			const filteredCrews = Object.values(props.AllCrews).map((crew) => ({
				id: crew.id,
				name: ConcatCrewTypeAndName(crew),
			}));
			setCrews(filteredCrews);
		} else {
			setCrews([]);
		}
	}, [props.AllCrews]);

	function HandleChangeCrew(e: ChangeEvent<HTMLInputElement>) {
		const crewID = e.target.value;
		const crewType = props.AllCrews?.[crewID]?.workers_type;
		props.SelectCrew(e.target.value);
		props.SelectWorkerType(crewType || null);
	}

	return (
		<>
			<Form.Label>Brygada</Form.Label>
			<Form.Control as="select" value={props.ActualCrew || ''} onChange={HandleChangeCrew} size={'sm'}>
				<option key={v4()} value={''}>
					Wybierz brygadę...
				</option>
				{crews.map((crew) => (
					<option key={v4()} value={crew.id}>
						{crew.name}
					</option>
				))}
			</Form.Control>
		</>
	);
}

function ConcatCrewTypeAndName(crew: GetCrewsAndTheirCrewSummariesType.WorkersLogCrew) {
	return `${LocaleNameEngine({ value: crew.workers_type })} - ${crew.name}`;
}

export default connect(mapStateToProps, mapDispatchToProps)(CrewTypeSelectorComponent);
