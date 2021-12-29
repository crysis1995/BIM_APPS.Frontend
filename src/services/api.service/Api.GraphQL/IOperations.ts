import { IOperations } from '../IApi';
import {
	CreateCommentaryElementDtoInput,
	LoginInput,
	Mutation,
	PasswordResetInput,
	Query,
	UserInput,
} from '../../../generated/graphql';
import { FetchResult } from '@apollo/client';
import { QueryGetAllElementsInput } from './Operations/Query.GetAllElements';
import { QueryAllCommentaryElementsInput } from './Operations/Query.AllCommentaryElements';

export default interface IGraphQLOperations extends IOperations {
	QueryMe(): Promise<FetchResult<Pick<Query, 'me'>>>;
	QueryMyClaims(): Promise<FetchResult<Pick<Query, 'myClaims'>>>;
	QueryMyProjects(): Promise<FetchResult<Pick<Query, 'myProjects'>>>;
	QueryUser(input: UserInput): Promise<FetchResult<Pick<Query, 'user'>>>;
	QueryElements(
		input: QueryGetAllElementsInput,
		signal?: AbortSignal,
	): Promise<FetchResult<Pick<Query, 'elements'>>>;
	QueryAllCommentaryElements(
		input: QueryAllCommentaryElementsInput,
		signal?: AbortSignal,
	): Promise<FetchResult<Pick<Query, 'commentaryElements'>>>;
	MutationLogin(variables: LoginInput): Promise<FetchResult<Pick<Mutation, 'login'>>>;
	MutationResetPassword(
		variables: PasswordResetInput,
	): Promise<FetchResult<Pick<Mutation, 'passwordReset'>>>;
	MutationCreateCommentaryElement(
		input: CreateCommentaryElementDtoInput,
	): Promise<FetchResult<Pick<Mutation, 'createCommentaryElement'>>>;
}
