import { gql } from 'apollo-boost';

const USER_DATA = gql`
	query getUserData($i: ID!) {
		user(id: $i) {
			id
			username
			email
			project_roles {
				project_role {
					name
				}
				project {
					id
					name
					model_urn
				}
			}
		}
	}
`;
export const GET_ALL_ACCEPTANCE_JOBS = gql`
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

export default {
	USER_DATA,GET_ALL_ACCEPTANCE_JOBS
};
