import { gql } from 'apollo-boost';
import { graphQLClient } from '../../../../services';

const QUERY_ROOM_COUNT = gql`
	query countRooms($l: String) {
		acceptanceRoomsConnection(where: { department: { level: $l } }) {
			aggregate {
				count
			}
		}
	}
`;

const QUERY_ROOMS = gql`
	query getAllRooms($s: Int, $l: String) {
		acceptanceRoomsConnection(where: { department: { level: $l } }, start: $s) {
			values {
				id
				revit_id
				name
				number
				department {
					id
					name
					editors {
						id
					}
				}
			}
		}
	}
`;

export const fetchRoomCount = (level) =>
	graphQLClient()
		.query({
			query: QUERY_ROOM_COUNT,
			variables: { l: level },
			fetchPolicy: 'no-cache',
		})
		.then((e) => e.data);

export const fetchRooms = (start, level) =>
	graphQLClient()
		.query({
			query: QUERY_ROOMS,
			variables: { s: start, l: level },
			fetchPolicy: 'no-cache',
		})
		.then((e) => e.data);

export const fetchAllRooms = (level, N = 100) =>
	fetchRoomCount(level)
		.then((response) => response.acceptanceRoomsConnection.aggregate.count)
		.then((count) =>
			Promise.all(
				[...Array(Math.ceil(count / N)).keys()].map((i) =>
					fetchRooms(i * N, level).then((response) => response.acceptanceRoomsConnection.values),
				),
			)
				.then((e) => e.flat(2))
				.then((response) => genRoomsAndDeps(response)),
		);

/**
 *
 * @param response {Array<Object>}
 */
export const genRoomsAndDeps = (response) => {
	if (Array.isArray(response)) {
		return response.reduce(
			(prev, curr) => {
				if (!prev.byDepartmentId.hasOwnProperty(curr.department.id)) {
					prev.byDepartmentId[curr.department.id] = { byRevitId: [], permissions: [], name: '' };
				}
				if (!prev.byId[curr.revit_id]) {
					prev.byId[curr.revit_id] = {
						id: curr.id,
						revit_id: curr.revit_id,
						name: curr.name,
						number: curr.number,
						department: curr.department.id,
						permissions: [],
					};
				}
				if (!prev.byDepartmentId[curr.department.id].byRevitId.includes(curr.revit_id)) {
					prev.byDepartmentId[curr.department.id].byRevitId.push(curr.revit_id);
					prev.byDepartmentId[curr.department.id].name = curr.department.name;
				}
				return prev;
			},
			{ byId: {}, byDepartmentId: {} },
		);
	} else {
		throw new Error('Object is not an array');
	}
};
