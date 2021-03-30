import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import GraphQLAPIService from "../../../../../../services/graphql.api.service";
import { connect } from "react-redux";
import { PL_DICTIONARY, WORKER_TYPES } from "../../../../redux/constants";

type RootState = {
	CMSLogin: {
		user: { id: { id: string } };
		project: { id: string };
		credentials: {
			access_token: string;
		};
	};
};

const mapStateToProps = (state: RootState) => ({
	token: state.CMSLogin.credentials.access_token,
	user_id: state.CMSLogin.user.id.id,
	project_id: state.CMSLogin.project.id,
});
const mapDispatchToProps = {};

type CrewPayload = {
	id: string;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

type Inputs = { crewName: string; crewType: string };

function HouseCrewDBCreator(props: Props) {
	const [valid, setValid] = useState<boolean | null>(null);
	const { register, handleSubmit, errors, reset } = useForm<Inputs>();
	const onSubmit = async (data: Inputs) => {
		const api = new GraphQLAPIService();
		const crew = await api.WorkersLog.WorkTimeEvidence.CreateHouseCrew(
			props.project_id,
			props.user_id,
			data.crewName,
			data.crewType,
		);
		console.log(data);
		if (crew) {
			setValid(true);
			reset();
		} else {
			setValid(false);
		}
	};
	const WorkerTypeElem = Object.keys(WORKER_TYPES) as (keyof typeof WORKER_TYPES)[];
	const options = WorkerTypeElem.map((workerType) => ({
		id: WORKER_TYPES[workerType],
		name: PL_DICTIONARY[WORKER_TYPES[workerType]],
	}));
	console.log(errors?.crewType?.message);
	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group>
					<Form.Label>Wpisz nazwę brygady</Form.Label>
					<Form.Control
						size="sm"
						type="text"
						name="crewName"
						ref={register({
							validate: (data) => !!data || 'Wartość nie może być pusta!',
						})}
						isInvalid={!!errors.crewName}
						isValid={valid === null ? false : errors.crewName ? false : valid}
					/>
					<Form.Control.Feedback type={!errors.crewName ? 'valid' : 'invalid'}>
						{errors?.crewName?.message}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mt-1">
					<Form.Label>Wybierz rodzaj brygady</Form.Label>
					<Form.Row>
						<Col>
							<Form.Control
								data-testid={'Selector'}
								name="crewType"
								as="select"
								size={'sm'}
								isInvalid={!!errors.crewType}
								isValid={valid === null ? false : errors.crewType ? false : valid}
								ref={register({
									required: { value: true, message: 'Określ rodzaj brygady!' },
								})}>
								<option value="">Wybierz...</option>
								{options.map((e) => (
									<option data-testid="options" key={e.id} value={e.id}>
										{e.name}
									</option>
								))}
							</Form.Control>
							<Form.Control.Feedback type={!errors.crewType ? 'valid' : 'invalid'}>
								{errors?.crewType?.message}
							</Form.Control.Feedback>
						</Col>
						<Col xs="auto">
							<Button type="submit" className="float-right" size={'sm'}>
								Waliduj i zapisz
							</Button>
						</Col>
					</Form.Row>
				</Form.Group>
			</Form>
			{valid !== null && (
				<Row>
					<Col>
						<Alert variant={valid ? 'success' : 'danger'}>
							{valid ? 'Poprawnie utworzono brygadę!' : 'Coś poszło nie tak ;('}
						</Alert>
					</Col>
				</Row>
			)}
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseCrewDBCreator);
