import IApi from '../IApi';
import IGraphQLOperations from './IOperations';
import ApolloClient, { ErrorPolicy, FetchPolicy } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { config } from '../../../config';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { NormalizedCacheObject } from '@apollo/client';
import Login from './Operations/Mutation.Login';
import {
	CreateCommentaryElementDtoInput,
	LoginInput,
	Mutation,
	PasswordResetInput,
	Query,
	UserInput,
} from '../../../generated/graphql';
import Me from './Operations/Query.Me';
import MyClaims from './Operations/Query.MyClaims';
import { MyProjects } from './Operations/QueryMyProjects';
import MutationPasswordReset from './Operations/Mutation.PasswordReset';
import QueryGetAllElements, { QueryGetAllElementsInput } from './Operations/Query.GetAllElements';
import {
	QueryAllCommentaryElements,
	QueryAllCommentaryElementsInput,
} from './Operations/Query.AllCommentaryElements';
import { QueryUser } from './Operations/Query.User';
import { MutationCreateCommentaryElement } from './Operations/Mutation.CreateCommentaryElement';

type Headers = {
	[key: string]: string;
};

export default class Api_GraphQL implements IApi {
	private errorPolicy: ErrorPolicy = 'all';
	private fetchPolicy: FetchPolicy = 'no-cache';

	GetAbortController() {
		return new AbortController();
	}

	Operations: IGraphQLOperations = {
		MutationCreateCommentaryElement: (input: CreateCommentaryElementDtoInput) => {
			return this.GetClient().mutate({
				mutation: MutationCreateCommentaryElement,
				variables: { input },
				errorPolicy: this.errorPolicy,
				fetchPolicy: this.fetchPolicy,
			});
		},
		QueryUser: (input: UserInput) => {
			return this.GetClient().query({
				query: QueryUser,
				variables: { input },
				errorPolicy: this.errorPolicy,
				fetchPolicy: this.fetchPolicy,
			});
		},
		QueryAllCommentaryElements: (
			input: QueryAllCommentaryElementsInput,
			signal?: AbortSignal,
		) => {
			return this.GetClient().query({
				query: QueryAllCommentaryElements,
				variables: input,
				errorPolicy: this.errorPolicy,
				fetchPolicy: this.fetchPolicy,
				context: {
					fetchOptions: {
						signal,
					},
				},
			});
		},
		QueryElements: (input: QueryGetAllElementsInput, signal?: AbortSignal) => {
			return this.GetClient().query({
				query: QueryGetAllElements,
				variables: input,
				errorPolicy: this.errorPolicy,
				fetchPolicy: this.fetchPolicy,
				context: {
					fetchOptions: {
						signal,
					},
				},
			});
		},
		MutationResetPassword: (variables: PasswordResetInput) => {
			return this.GetClient().mutate<Pick<Mutation, 'passwordReset'>, PasswordResetInput>({
				mutation: MutationPasswordReset,
				variables: variables,
				errorPolicy: this.errorPolicy,
				fetchPolicy: this.fetchPolicy,
			});
		},
		QueryMyProjects: () => {
			return this.GetClient().query({
				query: MyProjects,
				errorPolicy: this.errorPolicy,
				fetchPolicy: this.fetchPolicy,
			});
		},
		QueryMyClaims: () => {
			return this.GetClient().query({
				query: MyClaims,
				errorPolicy: this.errorPolicy,
				fetchPolicy: this.fetchPolicy,
			});
		},
		QueryMe: () => {
			return this.GetClient().query<Pick<Query, 'me'>>({
				query: Me,
			});
		},
		MutationLogin: (variables: LoginInput) => {
			return this.GetClient().mutate<Pick<Mutation, 'login'>, LoginInput>({
				mutation: Login,
				variables: variables,
				errorPolicy: this.errorPolicy,
				fetchPolicy: this.fetchPolicy,
			});
		},
	};

	GetToken(): string | null {
		return this.Token;
	}

	SetToken(token: string | null): void {
		this.Token = token;
	}

	private Token: string | null = null;

	private GetClient(): ApolloClient<NormalizedCacheObject> {
		let headers: Headers = {};
		if (this.GetToken()) {
			headers = {
				...headers,
				Authorization: `Bearer ${this.GetToken()}`,
			};
			return new ApolloClient({
				link: createHttpLink({
					uri: config.bim_apps_api.graphql2,
					headers,
				}),
				cache: new InMemoryCache(),
			});
		}
		return new ApolloClient({
			link: createHttpLink({
				uri: config.bim_apps_api.graphql2,
				headers,
			}),
			cache: new InMemoryCache(),
		});
	}
}
