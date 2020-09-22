import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { config } from '../config';


const graphQLClient = (access_token) => {
	var headers = {};
	if (access_token) {
		headers = { Authorization: `Bearer ${access_token}` };
	}
	return new ApolloClient({
		link: new createHttpLink({
			uri: config.bim_apps_api.graphql,
		}),
		cache: new InMemoryCache(),
		onError: (error) => console.log(error),
		headers,
		fetchOptions: {
			mode: 'no-cors',
		},

	});
};

export { graphQLClient };
