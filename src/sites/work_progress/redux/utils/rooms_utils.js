import { gql } from 'apollo-boost';
import { graphQLClient } from '../../../../services';

const response = {
	objects: [
		{
			id: '27616',
			area: 22.98,
			object_finish_type: {
				name: 'Podłoga 12cm',
				jobs: [
					{
						id: '3',
					},
					{
						id: '10',
					},
					{
						id: '11',
					},
				],
			},
		},
		{
			id: '27617',
			area: 11.11,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm REI30',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
		},
		{
			id: '27618',
			area: 9.68,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
		},
		{
			id: '27619',
			area: 9.8,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
		},
		{
			id: '27620',
			area: 2.3,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
		},
		{
			id: '27621',
			area: 1.74,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
		},
		{
			id: '27622',
			area: 1.74,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
		},
		{
			id: '27623',
			area: 2.3,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
		},
		{
			id: '27624',
			area: 9.8,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
		},
		{
			id: '27625',
			area: 14.94,
			object_finish_type: {
				name: 'Ściana GK - ruszt 5cm - SANIT',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
		},
		{
			id: '27626',
			area: 1.15,
			object_finish_type: {
				name: 'WCZD_TYNK',
				jobs: [
					{
						id: '4',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
		},
		{
			id: '27627',
			area: 10.55,
			object_finish_type: {
				name: 'WCZD_TYNK',
				jobs: [
					{
						id: '4',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
		},
		{
			id: '27628',
			area: 1.15,
			object_finish_type: {
				name: 'WCZD_TYNK',
				jobs: [
					{
						id: '4',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
		},
		{
			id: '27629',
			area: 1.06,
			object_finish_type: {
				name: 'WCZD_TYNK',
				jobs: [
					{
						id: '4',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
		},
		{
			id: '27630',
			area: 26.38,
			object_finish_type: {
				name: 'Ściana GK - ruszt 5cm - SANIT',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
		},
		{
			id: '27631',
			area: 14.3,
			object_finish_type: {
				name: 'SP 5 - sufit pełny GK',
				jobs: [
					{
						id: '1',
					},
					{
						id: '8',
					},
					{
						id: '16',
					},
				],
			},
		},
		{
			id: '27632',
			area: 9.26,
			object_finish_type: {
				name: 'SP. 5b - RIGIPS - Casoprano Casorock - 60,0 cm x 60,0 cm',
				jobs: [
					{
						id: '1',
					},
					{
						id: '8',
					},
					{
						id: '16',
					},
				],
			},
		},
		{
			id: '27633',
			area: 5.05,
			object_finish_type: {
				name: 'SP. 12 - Pełny GK',
				jobs: [
					{
						id: '1',
					},
					{
						id: '8',
					},
				],
			},
		},
	],
	reference_jobs: [],
};

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

const QUERY_ROOMS_OBJECTS = gql`
	query queryRoomsObjects($r: ID!) {
		acceptanceRoom(id: $r) {
			objects {
				id
				area
				object_finish_type {
					name
					jobs {
						id
					}
				}
			}
			reference_jobs(where: { is_actual: true }) {
				id
				current_value
				percentage_value
				summary_value
				is_occure
				user {
					id
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

export const fetchRoomsObjects = (room_id) => new Promise((resolve) => resolve(response));
// graphQLClient()
// 	.query({
// 		query: QUERY_ROOMS_OBJECTS,
// 		variables: { r: room_id },
// 		fetchPolicy: 'no-cache',
// 	})
// 	.then((response) => response.data.acceptanceRoom);

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
