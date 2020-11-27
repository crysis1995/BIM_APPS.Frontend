import { graphQLClient } from '../index';
import mutation from './CONSTANTS/mutation';
import query from './CONSTANTS/query';

export default class GraphQLAPIService {
	constructor(access_token, client = graphQLClient, query = query, mutation = mutation) {
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
		return this.queryClient(USER_DATA, { i: user_id });
	}

	ARCHITECTURAL = {
		getAllJobs: () => {
			const { GET_ALL_ACCEPTANCE_JOBS } = this.query;
			return this.queryClient(GET_ALL_ACCEPTANCE_JOBS);
		},
	};
}
