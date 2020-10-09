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
		.then((response) => {
			console.log(response.acceptanceRoomsConnection.aggregate.count);
			return response.acceptanceRoomsConnection.aggregate.count;
		})
		.then((count) =>
			Promise.all(
				[...Array(Math.ceil(count / N)).keys()].map((i) =>
					fetchRooms(i * 100, level).then((response) => response.acceptanceRoomsConnection.values),
				),
			).then((e) => e.flat(2)),
		);
