import { graphQLClient } from '../index';
import MUTATION from './CONSTANTS/mutation';
import QUERY from './CONSTANTS/query';

export default class GraphQLAPIService {
	constructor(access_token, client = graphQLClient, query = QUERY, mutation = MUTATION) {
		this.client = client(access_token);
		this.query = query;
		this.mutation = mutation;
	}
	fetchPolicy = 'no-cache';

	login(identifier, password) {
		const { LOGIN } = this.mutation;
		return this.client.mutate({
			mutation: LOGIN,
			variables: { i: identifier, p: password },
			fetchPolicy: this.fetchPolicy,
		});
	}

	queryClient(query, variables, fetchPolicy = this.fetchPolicy) {
		return this.client.query({
			query,
			variables,
			fetchPolicy,
		});
	}
	mutateClient(mutation, variables, fetchPolicy = this.fetchPolicy) {
		return this.client.mutate({
			mutation,
			variables,
			fetchPolicy,
		});
	}

	/**
	 *  Funkcja resetująca hasło
	 * @param id {string}
	 * @param password {string}
	 * @return {Promise<FetchResult<any>>}
	 */
	resetPassword(id, password) {
		const { RESET_PASSWORD } = this.mutation;
		return this.mutateClient(RESET_PASSWORD, { p: password, u: id });
	}

	/**
	 *  Funkcja pobiera informacje o użytkowniku
	 * @param user_id {string}
	 * @return {Promise<ApolloQueryResult<any>>}
	 */
	userData(user_id) {
		const { USER_DATA } = this.query;
		return this.queryClient(USER_DATA, { i: user_id }).then(e => e.data.user)
	}
	/**
	 *  Funkcja pobiera informacje o projektach i rolach usera
	 * @param user_id {string}
	 * @return {Promise<ApolloQueryResult<any>>}
	 */
	getUserProjectRoles(user_id) {
		const { USER_PROJECTS } = this.query;
		return this.queryClient(USER_PROJECTS, { i: user_id }).then(e => e.data.warbudProjUserRoles)
	}

	ARCHITECTURAL = {
		getAllJobs: () => {
			const { GET_ALL_ACCEPTANCE_JOBS } = this.query;
			return this.queryClient(GET_ALL_ACCEPTANCE_JOBS);
		},
	};

	MONOLITHIC = {
		countObjects: (project_id) => {
			const { ACCEPTANCE_OBJECTS_COUNT } = this.query;
			return this.queryClient(ACCEPTANCE_OBJECTS_COUNT, { p: project_id }).then(
				(e) => e.data.acceptanceObjectsConnection.aggregate.totalCount,
			);
		},
		createStatus: (object_id, date, user_id, status_id) => {
			const { CREATE_STATUS } = this.mutation;
			return this.mutateClient(CREATE_STATUS, { o: object_id, d: date, u: user_id, s: status_id }).then(
				(e) => e.data.createAcceptanceObjectStatus.acceptanceObjectStatus.id,
			);
		},
		getStatuses: () => {
			const { GET_STATUSES } = this.query;
			return this.queryClient(GET_STATUSES).then((e) => e.data.acceptanceStatuses);
		},
		/**
		 *
		 * @param user {number}
		 * @param commentary {string}
		 * @param rotation_day_id {number}
		 * @param causes_array {[number]}
		 * @param level {number}
		 * @param crane {number}
		 * @return {Promise<FetchResult<any>>}
		 */
		createDelay: (user, commentary, rotation_day_id, causes_array, level, crane) => {
			const { CREATE_DELAY } = this.mutation;
			return this.mutateClient(CREATE_DELAY, {
				u: user,
				c: commentary,
				rd: rotation_day_id,
				cs: causes_array,
				l: level,
				cr: crane,
			});
		},
		/**
		 *
		 * @param term_id {number}
		 * @param REAL_START {Date}
		 * @param PLANNED_FINISH {Date}
		 * @param REAL_FINISH {Date}
		 * @param PLANNED_START {Date}
		 * @return {Promise<FetchResult<any>>}
		 */
		updateTerm: (term_id, { REAL_START, PLANNED_FINISH, REAL_FINISH, PLANNED_START }) => {
			const { UPDATE_TERM } = this.mutation;
			let variables = { i: term_id };
			if (REAL_START) variables.RS = REAL_START;
			if (PLANNED_FINISH) variables.PF = PLANNED_FINISH;
			if (REAL_FINISH) variables.RF = REAL_FINISH;
			if (PLANNED_START) variables.PS = PLANNED_START;
			return this.mutateClient(UPDATE_TERM, variables);
		},
	};
}

/**
 *
 * @param total{number}
 * @param N{number}
 */
function generateRanges(total, N = 100) {
	const ranges = Math.ceil(total / N);
	let arr = [];
	for (let i = 0; i < ranges; i++) {
		arr.push(i * N);
	}
	return arr;
}
