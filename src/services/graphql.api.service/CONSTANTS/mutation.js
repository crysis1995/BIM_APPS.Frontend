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
	mutation createDelay($u: ID, $c: String, $dt: Date, $cs: [ID], $l: ID, $cr: ID) {
		createAcceptanceDelay(
			input: { data: { user: $u, commentary: $c, date: $dt, causes: $cs, level: $l, crane: $cr } }
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
	mutation CreateHouseCrew($name: String, $user: ID, $proj: ID, $work_type: ENUM_WORKERSLOGCREW_WORKERS_TYPE) {
		createWorkersLogCrew(
			input: {
				data: { name: $name, owner: $user, project: $proj, is_subcontractor: false, workers_type: $work_type }
			}
		) {
			workersLogCrew {
				id
			}
		}
	}
`;

const CREATE_WORK_TIME_EVIDENCE = gql`
    mutation CreateWorkTimeEvidence(
        $date: Date
        $workedFor: Int
        $engineer: ID
        $proj: ID
        $work: ID
    ) {
        createWorkersLogWorkTimeEvidence(
            input: {
                data: {
                    date: $date
                    worked_time: $workedFor
                    filling_engineer: $engineer
                    project: $proj
                    worker: $work
                }
            }
        ) {
            workersLogWorkTimeEvidence {
                id
                date
                worker {
                    id
                }
                worked_time
                project {
                    id
                }
            }
        }
    }

`;

const UPDATE_WORK_TIME_EVIDENCE = gql`
	mutation UpdateWorkTimeEvidence(
		$workTimeEvidence: ID!
		$date: Date
		$workedFor: Int
		$engineer: ID
		$proj: ID
		$work: ID
	) {
		updateWorkersLogWorkTimeEvidence(
			input: {
				where: { id: $workTimeEvidence }
				data: {
					date: $date
					worked_time: $workedFor
					filling_engineer: $engineer
					project: $proj
					worker: $work
				}
			}
		) {
			workersLogWorkTimeEvidence {
				id
			}
		}
	}
`;

const CREATE_CREW_SUMMARY = gql`
	mutation CreateCrewSummary($crw: ID, $start: Date, $end: Date, $own: ID, $work: [ID], $proj: ID) {
		createWorkersLogCrewSummary(
			input: {
				data: { crew: $crw, startDate: $start, endDate: $end, owner: $own, workers: $work, project: $proj }
			}
		) {
			workersLogCrewSummary {
				id
			}
		}
	}
`;

const UPDATE_CREW_SUMMARY = gql`
	mutation UpdateCrewSummary(
		$crewSummary: ID!
		$work: [ID]
	) {
		updateWorkersLogCrewSummary(
			input: {
				where: { id: $crewSummary }
#				data: { crew: $crw, startDate: $start, endDate: $end, owner: $own, workers: $work, project: $proj }
				data: {  workers: $work }
			}
		) {
			workersLogCrewSummary {
                id
                workers {
                    id
                }
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
	CREATE_WORK_TIME_EVIDENCE,
	UPDATE_WORK_TIME_EVIDENCE,
	CREATE_CREW_SUMMARY,
	UPDATE_CREW_SUMMARY,
};
