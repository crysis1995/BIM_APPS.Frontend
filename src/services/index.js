import ApolloClient from 'apollo-boost';

import { config } from '../config';

const graphQLClient = (access_token) => {
	return new ApolloClient({
		uri: config.bim_apps_api.graphql,
		onError: (error) => console.log(error),
		request: (operation) => {
			if (access_token) {
				operation.setContext({
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
					fetchOptions: {
						mode: 'no-cors',
					},
				});
			}
		},
	});
};

export { graphQLClient };
