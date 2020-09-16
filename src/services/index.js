import ApolloClient from 'apollo-boost';

import { config } from '../config';

const graphQLClient = (access_token) => {
	var headers = {};
	if (access_token) {
		headers = { Authorization: `Bearer ${access_token}` };
	}
	return new ApolloClient({
		uri: config.bim_apps_api.graphql,
		onError: (error) => console.log(error),
		headers,
		// fetchOptions: {
		// 	mode: 'no-cors',
		// },
		// request: (operation) => {
		// 	if (access_token) {
		// 		operation.setContext({
		// 			headers: {
		// 				Authorization: `Bearer ${access_token}`,
		// 			},

		// 		});
		// 	}
		// },
	});
};

export { graphQLClient };
