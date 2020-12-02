import { gql } from 'apollo-boost';

const USER_PROJECTS = gql`
	query getWarbudUserProjects($i: ID!) {
		warbudProjUserRoles(where: { user: $i }) {
			project_role {
				id
				name
			}
			project {
				id
				name
				cranes {
					id
				}
				levels {
					id
				}
				bim_models {
					model_urn
				}
			}
#			levels {
#				id
#			}
#			cranes {
#				id
#			}
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
			# type{
			#   name
			# }
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

export default {
	USER_DATA,
	GET_ALL_ACCEPTANCE_JOBS,
	ACCEPTANCE_OBJECTS,
	ACCEPTANCE_OBJECTS_COUNT,
	WARBUD_CRANES,
	GET_STATUSES,
	GET_ACCEPTANCE_TERMS,
	GET_DELAY_CAUSES,
	USER_PROJECTS,
};
