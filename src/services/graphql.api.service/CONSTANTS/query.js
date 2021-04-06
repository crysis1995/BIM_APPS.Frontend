import { gql } from 'apollo-boost';

const USER_PROJECTS = gql`
	query getWarbudUserProjects($i: ID!) {
		warbudProjUserRoles(where: { user: $i }) {
			project_role {
				id
				name
			}
			warbud_apps {
				name
			}
			project {
				id
				name
				webcon_code
				bim_models {
					model_urn
				}
				crane_ranges {
					crane {
						id
						name
					}
					levels {
						id
						name
					}
				}
			}
		}
	}
`;

const USER_DATA = gql`
	query getUserData($i: ID!) {
		user(id: $i) {
			id
			username
			email
		}
	}
`;

const GET_ALL_ACCEPTANCE_JOBS = gql`
	query getAllAcceptanceJobs {
		acceptanceJobs {
			id
			name
			unit
			selection_method
		}
	}
`;

const ACCEPTANCE_OBJECTS = gql`
	query getObjects($p: ID!, $st: Int) {
		acceptanceObjects(where: { project: $p }, start: $st) {
			area
			volume
			statuses(sort: "date:desc", limit: 1) {
				status {
					name
				}
				user {
					id
				}
			}
			crane {
				name
			}
			level {
				name
			}
			VCF_Realisation
			running_meter
			vertical
			revit_id
			id
			rotation_day {
				rotation_day
			}
		}
	}
`;

const ACCEPTANCE_OBJECTS_COUNT = gql`
	query countObjects($p: ID!) {
		acceptanceObjectsConnection(where: { project: $p }) {
			aggregate {
				totalCount
			}
		}
	}
`;

const WARBUD_CRANES = gql`
	query getProject($p: ID!) {
		warbudProject(id: $p) {
			cranes {
				id
				name
				levels {
					id
					name
				}
			}
		}
	}
`;

const GET_STATUSES = gql`
	query {
		acceptanceStatuses {
			id
			name
		}
	}
`;

const GET_DELAYS = gql`
	query getAllAcceptanceDalays($us: ID) {
		acceptanceDelays(where: { user: $us }) {
			id
			commentary
			level {
				name
			}
			crane {
				name
			}
			user {
                email
			}
			date
			created_at
			causes {
				id
			}
		}
	}
`;

const GET_ACCEPTANCE_TERMS = gql`
	query getAcceptanceTerms($p: ID!) {
		acceptanceTerms(where: { project: $p }) {
			id
			REAL_START
			PLANNED_FINISH
			REAL_FINISH
			PLANNED_START
			PLANNED_START_BP
			PLANNED_FINISH_BP
			vertical
			crane {
				name
			}
			level {
				name
			}
		}
	}
`;
const GET_DELAY_CAUSES = gql`
	query {
		acceptanceDelayCauses {
			id
			name
			parent {
				id
			}
			is_main
		}
	}
`;

const GET_ALL_CREWS = gql`
	query GetAllCrews($user: ID, $proj: ID) {
		workersLogCrews(where: { owner: $user, is_subcontractor: false, project: $proj }) {
			id
			name
			workers_type
		}
	}
`;

const GET_ALL_WORKERS = gql`
	query GetAllWorkers {
		workersLogWorkers {
			id
			warbud_id
			is_house_worker
			name
		}
	}
`;

const GET_WORK_TIME_EVIDENCE = gql`
	query GetWorkTimeEvidence($worker: ID, $start: Date, $end: Date) {
		workersLogWorkTimeEvidences(where: { worker: $worker, date_gte: $start, date_lte: $end }) {
			id
			date
			worked_time
			project {
				id
			}
		}
	}
`;

const GET_ALL_CREW_SUMMARIES = gql`
	query GetAllCrewSummaries($crw: ID, $start: Date, $end: Date, $own: ID, $proj: ID) {
		workersLogCrewSummaries(where: { crew: $crw, startDate: $start, endDate: $end, owner: $own, project: $proj }) {
			id
			workers {
				id
			}
		}
	}
`;

export default {
	USER_DATA,
	GET_ALL_ACCEPTANCE_JOBS,
	ACCEPTANCE_OBJECTS,
	ACCEPTANCE_OBJECTS_COUNT,
	WARBUD_CRANES,
	GET_STATUSES,
	GET_DELAYS,
	GET_ACCEPTANCE_TERMS,
	GET_DELAY_CAUSES,
	USER_PROJECTS,
	GET_ALL_CREWS,
	GET_ALL_WORKERS,
	GET_WORK_TIME_EVIDENCE,
	GET_ALL_CREW_SUMMARIES,
};
