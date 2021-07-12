import { Alert, Button, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { RootState } from '../../../../../../store';
import { Name } from '../../Utils/Crew.Name';
import { connect } from 'react-redux';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import CrewActions from '../../../../redux/work_time_evidence/crew/actions';
import { CountAllAndEmptyType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/CountAllAndEmpty';

const mapStateToProps = (state: RootState) => ({
	crews: state.WorkersLog.WorkTimeEvidence.Crews.all
		? Object.values(state.WorkersLog.WorkTimeEvidence.Crews.all)
		: [],
	access_token: state.CMSLogin.credentials?.access_token,
});
const mapDispatchToProps = {
	DeleteCrewInit: CrewActions.DeleteCrewInit,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function CrewSelect(props: Props) {
	const [selectedCrew, setSelectedCrew] = useState<string | null>(null);
	const [toDelete, setToDelete] = useState<null | CountAllAndEmptyType.Response['all']['values']>(null);
	const [canDelete, setCanDelete] = useState<boolean | null>(null);

	useEffect(() => {
		async function CanDeleteCrew() {
			setCanDelete(null);
			if (selectedCrew) {
				try {
					const data = await new GraphQLAPIService(
						props.access_token,
					).WorkersLog.WorkTimeEvidence.CrewSummaries.CountAllAndEmpty({ crew: selectedCrew });
					setCanDelete(data.all.aggregate.count === data.null.aggregate.count);
					if (data.all.aggregate.count === data.null.aggregate.count) {
						setToDelete(data.all.values);
					}
				} catch (e) {
					setCanDelete(null);
				}
			} else {
				setCanDelete(null);
			}
		}

		CanDeleteCrew();
	}, [selectedCrew]);

	function HandleClickDelete() {
		if (selectedCrew && toDelete) {
			props.DeleteCrewInit(selectedCrew, toDelete);
			setSelectedCrew(null);
			setCanDelete(null);
		}
	}

	return (
		<>
			<Form.Label>Wybierz brygadę do usunięcia.</Form.Label>
			<Form.Control
				size={'sm'}
				as={'select'}
				onChange={(x) => setSelectedCrew(x.target.value || null)}
				value={selectedCrew || ''}>
				<option value={''}>Wybierz...</option>
				{props.crews.map((e) => (
					<Name object={e} />
				))}
			</Form.Control>
			<hr />
			{canDelete !== null &&
				(canDelete ? (
					<Alert variant={'success'}>
						Możesz usunąć wybraną brygadę!
						<Button className={'float-right'} variant={'success'} size={'sm'} onClick={HandleClickDelete}>
							Usuń
						</Button>
					</Alert>
				) : (
					<Alert variant={'danger'}>Nie możesz usunąć wybranej brygady</Alert>
				))}
		</>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(CrewSelect);
