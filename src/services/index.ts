import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { config } from '../config';
import { CMSLoginType } from '../state/CMSLogin/type';

const graphQLClient = (access_token?: CMSLoginType.Payload.Credentials['token']) => {
	var headers = {};
	if (access_token) {
		headers = { Authorization: `Bearer ${access_token}` };
	}
	return new ApolloClient({
		link: createHttpLink({
			uri: config.bim_apps_api.graphql,
			headers,
		}),
		cache: new InMemoryCache(),
	});
};

export { graphQLClient };
