import { gql } from 'apollo-boost';

const LOGIN = gql`
	mutation login($i: String!, $p: String!) {
		login(input: { identifier: $i, password: $p }) {
			jwt
			user {
				id
			}
		}
	}
`;

const RESET_PASSWORD = gql`
	mutation resetPassword($u: ID!, $p: String) {
		updateUser(input: { where: { id: $u }, data: { password: $p } }) {
			user {
				id
			}
		}
	}
`;

const CREATE_STATUS = gql`
	mutation setStatus($o: ID, $d: DateTime, $u: ID, $s: ID) {
		createAcceptanceObjectStatus(input: { data: { object: $o, date: $d, user: $u, status: $s } }) {
			acceptanceObjectStatus {
				id
			}
		}
	}
`;

const CREATE_DELAY = gql`
	mutation createDelay($u: ID, $c: String, $rd: ID, $cs: [ID], $l: ID, $cr: ID) {
		createAcceptanceDelay(
			input: { data: { user: $u, commentary: $c, rotation_day: $rd, causes: $cs, level: $l, crane: $cr } }
		) {
			acceptanceDelay {
				id
			}
		}
	}
`;
const UPDATE_TERM = gql`
	mutation updateTerms($i: ID!, $RS: DateTime, $PF: DateTime, $RF: DateTime, $PS: DateTime, $obj: [ID]) {
		updateAcceptanceTerm(
			input: {
				data: { REAL_START: $RS, PLANNED_FINISH: $PF, REAL_FINISH: $RF, PLANNED_START: $PS, objects: $obj }
				where: { id: $i }
			}
		) {
			acceptanceTerm {
				id
				objects {
					id
				}
				level {
					id
					name
				}
				crane {
					id
					name
				}
				vertical
				REAL_START
				PLANNED_FINISH
				REAL_FINISH
				PLANNED_START_BP
				PLANNED_FINISH_BP
				PLANNED_START
			}
		}
	}
`;

const CREATE_HOUSE_CREW = gql`
	mutation CreateHouseCrew($name: String, $user: ID, $proj: ID) {
		createWorkersLogCrew(input: { data: { name: $name, owner: $user, project: $proj, is_subcontractor: false } }) {
			workersLogCrew {
				id
			}
		}
	}
`;

export default {
	LOGIN,
	RESET_PASSWORD,
	CREATE_STATUS,
	CREATE_DELAY,
	UPDATE_TERM,
	CREATE_HOUSE_CREW,
};
