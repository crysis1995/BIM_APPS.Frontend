import { Button, Col, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { connect } from 'react-redux';

const mapStateToProps = (state: {
	CMSLogin: {
		user: { id: { id: string } };
		project: { id: string };
		credentials: {
			access_token: string;
		};
	};
}) => ({
	token: state.CMSLogin.credentials.access_token,
	user_id: state.CMSLogin.user.id.id,
	project_id: state.CMSLogin.project.id,
});
const mapDispatchToProps = {};

type CrewPayload = {
	id: string;
	name: string;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const CrewSelector = (props: Props) => {
	const [crews, setCrews] = useState<CrewPayload[]>([]);
	const [trigger, setTrigger] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			if (trigger) {
				const api = new GraphQLAPIService();
				setCrews(await api.WorkersLog.WorkTimeEvidence.GetAllCrews(props.project_id, props.user_id));
				setTrigger(false);
			}
		};
		fetchData();
	}, [trigger]);

	return (
		<Form.Group>
			<Form.Label>Wybierz brygadę...</Form.Label>
			<Form.Row>
				<Col>
					<Form.Control size={'sm'} as="select">
						<option>Wybierz...</option>
						{crews.map((e) => (
							<option key={e.id} value={e.id}>
								{e.name}
							</option>
						))}
					</Form.Control>
				</Col>
				<Col xs="auto">
					<Button size={'sm'} onClick={() => setTrigger(true)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-arrow-clockwise"
							viewBox="0 0 16 16">
							<path
								fill-rule="evenodd"
								d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
							/>
							<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
						</svg>
					</Button>
				</Col>
			</Form.Row>
		</Form.Group>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(CrewSelector);
