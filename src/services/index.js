import ApolloClient from 'apollo-boost';
import { config } from '../config';

const graphQLClient = new ApolloClient({
	uri: config.bim_apps_api.graphql,
	onError: (error) => console.log(error),
	// request: (operation) => {
	// const token = authenticationService.authCode;
	// if (!token) return;
	// operation.setContext({
	// headers: {
	//       Authorization: `Bearer ${token}`
	// }
	// });
	// },
});

export { graphQLClient };
