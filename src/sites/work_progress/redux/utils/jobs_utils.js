import { gql } from 'apollo-boost';
import { graphQLClient } from '../../../../services';

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

export const fetchAllJobsFromAPI = () => {
	return graphQLClient().query({
		query: GET_ALL_ACCEPTANCE_JOBS,
		fetchPolicy: 'no-cache',
	});
};

/**
 *
 * @param objects {Object}
 * @param param_name {string}
 * @param condition {Function}
 * @return {*}
 */
export const addParameterWithValue = (objects, param_name = '', condition) => {
	if (!param_name || !condition) return objects;
	let newObj = { ...objects };
	for (let key in newObj) {
		newObj[key] = { ...newObj[key], [param_name]: condition(newObj[key]) };
	}
	return newObj;
};

export const createReferenceJob = ({ room, job, percentage_value, current_value, object_type, user, objects }) => {
	return graphQLClient()
		.mutate({
			mutation: gql`
				mutation createAcceptanceReferenceJob(
					$r: ID
					$j: ID
					$vp: Float
					$vc: Float
					$ot: ID
					$o: [ID]
					$u: ID
				) {
					createAcceptanceReferenceJob(
						input: {
							data: {
								percentage_value: $vp
								current_value: $vc
								room: $r
								job: $j
								object_type: $ot
								user: $u
								objects: $o
							}
						}
					) {
						acceptanceReferenceJob {
							id
							room {
								revit_id
							}
						}
					}
				}
			`,
			variables: {
				r: room,
				j: job,
				vp: percentage_value,
				vc: current_value,
				ot: object_type,
				u: user,
				o: objects,
			},
			fetchPolicy: 'no-cache',
		})
		.then((value) => value.data)
		.then((v) => v.createAcceptanceReferenceJob);
};

export const updateObjectJob = (id) => {
	return graphQLClient().mutate({
		mutation: gql`
			mutation updateReferenceJob($i: ID!) {
				updateAcceptanceReferenceJob(input: { where: { id: $i }, data: { is_actual: false } }) {
					acceptanceReferenceJob {
						id
					}
				}
			}
		`,
		variables: {
			i: id,
		},
		fetchPolicy: 'no-cache',
	});
};
