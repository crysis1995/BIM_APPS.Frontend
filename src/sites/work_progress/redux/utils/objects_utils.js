import { gql } from 'apollo-boost';

import { graphQLClient } from '../../../../services';
import { normalize } from '../../../../utils/normalize';

export const fetchALLAreaJobPerLevel = (job_id, level) => {
	return graphQLClient().query({
		query: gql`
			query fetchALLAreaJobPerLevel($l: String, $j: ID) {
				acceptanceObjectsConnection(
					where: { object_finish_type: { jobs_null: false, jobs: $j }, room: { department: { level: $l } } }
				) {
					aggregate {
						sum {
							area
						}
					}
				}
			}
		`,
		variables: { l: level, j: job_id },
		fetchPolicy: 'no-cache',
	});
};

export const fetchSummaryAreaJobPerLevel = (job_id, level) => {
	return graphQLClient().query({
		query: gql`
			query fetchSummaryAreaJobPerLevel($l: String, $j: ID) {
				acceptanceReferenceJobsConnection(
					where: { room: { department: { level: $l } }, job: $j, is_actual: true }
				) {
					aggregate {
						sum {
							current_value
						}
						count
					}
					values {
						room {
							revit_id
						}
						percentage_value
					}
				}
			}
		`,
		variables: { l: level, j: job_id },
		fetchPolicy: 'no-cache',
	});
};

// export const fetchReferenceJobToLevel = (level) => {
// 	return graphQLClient().query({
// 		query: gql`
// 			query fetchSummaryAreaJobPerLevel($l: String) {
// 				acceptanceReferenceJobsConnection(where: { room: { department: { level: $l } }, is_actual: true }) {
// 					aggregate {
// 						count
// 					}
// 					values {
// 						percentage_value
// 						job {
// 							id
// 						}
// 						value_calculated
// 						room {
// 							revit_id
// 						}
// 					}
// 				}
// 			}
// 		`,
// 		variables: { l: level },
// 		fetchPolicy: 'no-cache',
// 	});
// };
//
//
// /*
// *               to wszystko do zmiany
// *
// *               musze pobrac rooma i dla niego reszte bajerow a nie na odwrot
// *
// *
// * */
export const getFilteredObjects = (selected_room) => {
	return graphQLClient().query({
		query: gql`
			query getFilteredObjects($r: ID) {
				acceptanceObjects(where: { room: $r, object_finish_type: { jobs_null: false } }) {
					id
					area
					object_finish_type {
						name
						jobs {
							id
						}
					}
					room {
						revit_id
					}
					reference_jobs(where: { is_actual: true }) {
						id
						objects {
							id
						}
						room {
							revit_id
						}
						job {
							id
						}
						percentage_value
					}
				}
			}
		`,
		variables: { r: selected_room },
		fetchPolicy: 'no-cache',
	});
};

export const fetchObjectsByRoom = (room_id) => {
	return getFilteredObjects(room_id).then(({ data }) => normalize(data.acceptanceObjects));
};
