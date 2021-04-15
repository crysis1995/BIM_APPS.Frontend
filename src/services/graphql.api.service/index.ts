import { graphQLClient } from '../index';
import { CMSLogin } from '../../components/CMSLogin/type';

import ApolloClient, { FetchPolicy } from 'apollo-client';
import { DocumentNode, NormalizedCacheObject } from '@apollo/client';
import LOGIN, { LoginType } from './CONSTANTS/Mutations/Login';
import RESET_PASSWORD, { ResetPasswordType } from './CONSTANTS/Mutations/ResetPassword';
import USER_DATA, { UserDataType } from './CONSTANTS/Queries/UserData';
import USER_PROJECTS, { UserProjectsType } from './CONSTANTS/Queries/UserProjects';
import CREATE_STATUS, { CreateStatusType } from './CONSTANTS/Mutations/CreateStatus';
import CREATE_DELAY, { CreateDelayType } from './CONSTANTS/Mutations/CreateDelay';
import GET_DELAYS, { GetDelaysType } from './CONSTANTS/Queries/GetDelays';
import GET_STATUSES, { GetStatusesType } from './CONSTANTS/Queries/GetStatuses';
import GET_ALL_CREWS, { GetAllCrewsType } from './CONSTANTS/Queries/GetAllCrews';
import GET_ALL_WORKERS, { GetAllWorkersType } from './CONSTANTS/Queries/GetAllWorkers';
import CREATE_HOUSE_CREW, { CreateHouseCrewType } from './CONSTANTS/Mutations/CreateHouseCrew';
import GET_ALL_CREW_SUMMARIES, { GetAllCrewSummariesType } from './CONSTANTS/Queries/GetAllCrewSummaries';
import GET_WORK_TIME_EVIDENCE, { GetWorkTimeEvidenceType } from './CONSTANTS/Queries/GetWorkTimeEvidence';
import CREATE_CREW_SUMMARY, { CreateCrewSummaryType } from './CONSTANTS/Mutations/CreateCrewSummary';
import UPDATE_CREW_SUMMARY, { UpdateCrewSummaryType } from './CONSTANTS/Mutations/UpdateCrewSummary';
import UPDATE_TERM, { UpdateTermType } from './CONSTANTS/Mutations/UpdateTerm';

export default class GraphQLAPIService {
	private client: ApolloClient<NormalizedCacheObject>;
	constructor(access_token?: CMSLogin.Payload.Credentials['access_token'], client = graphQLClient) {
		this.client = client(access_token);
	}
	fetchPolicy: FetchPolicy = 'no-cache';

	login(credentials: LoginType.Request) {
		return this.client.mutate<LoginType.Response, LoginType.Request>({
			mutation: LOGIN,
			variables: credentials,
			fetchPolicy: this.fetchPolicy,
		});
	}

	queryClient<Response, Request>(query: DocumentNode, variables?: Request, fetchPolicy = this.fetchPolicy) {
		return this.client.query<Response, Request>({
			query,
			variables,
			fetchPolicy,
		});
	}
	mutateClient<Response, Request>(mutation: DocumentNode, variables: Request, fetchPolicy = this.fetchPolicy) {
		return this.client.mutate<Response, Request>({
			mutation,
			variables,
			fetchPolicy,
		});
	}

	resetPassword(data: ResetPasswordType.Request) {
		return this.mutateClient<ResetPasswordType.Response, ResetPasswordType.Request>(RESET_PASSWORD, data);
	}

	userData(data: UserDataType.Request) {
		return this.queryClient<UserDataType.Response, UserDataType.Request>(USER_DATA, data).then((e) => e.data.user);
	}
	getUserProjectRoles(data: UserProjectsType.Request) {
		return this.queryClient<UserProjectsType.Response, UserProjectsType.Request>(USER_PROJECTS, data).then(
			(e) => e.data.warbudProjUserRoles,
		);
	}

	MONOLITHIC = {
		createStatus: (data: CreateStatusType.Request) => {
			return this.mutateClient<CreateStatusType.Response, CreateStatusType.Request>(CREATE_STATUS, data).then(
				(e) => e.data?.createAcceptanceObjectStatus.acceptanceObjectStatus.id,
			);
		},
		getDelays: (data: GetDelaysType.Request) => {
			return this.queryClient<GetDelaysType.Response, GetDelaysType.Request>(GET_DELAYS, data).then(
				(e) => e.data.acceptanceDelays,
			);
		},
		getStatuses: () => {
			return this.queryClient<GetStatusesType.Response, GetStatusesType.Request>(GET_STATUSES).then(
				(e) => e.data.acceptanceStatuses,
			);
		},
		createDelay: (data: CreateDelayType.Request) => {
			return this.mutateClient<CreateDelayType.Response, CreateDelayType.Request>(CREATE_DELAY, data);
		},
		updateTerm: (data: UpdateTermType.Request) => {
			return this.mutateClient<UpdateTermType.Response, UpdateTermType.Request>(UPDATE_TERM, data);
		},
	};

	WorkersLog = {
		WorkTimeEvidence: {
			GetAllCrews: (data: GetAllCrewsType.Request) => {
				return this.queryClient<GetAllCrewsType.Response, GetAllCrewsType.Request>(GET_ALL_CREWS, data);
			},
			GetAllWorkers: () => {
				return this.queryClient<GetAllWorkersType.Response, GetAllWorkersType.Request>(GET_ALL_WORKERS);
			},
			CreateHouseCrew: (data: CreateHouseCrewType.Request) => {
				return this.mutateClient<CreateHouseCrewType.Response, CreateHouseCrewType.Request>(
					CREATE_HOUSE_CREW,
					data,
				);
			},
			GetAllCrewSummaries: (data: GetAllCrewSummariesType.Request) => {
				return this.queryClient<GetAllCrewSummariesType.Response, GetAllCrewSummariesType.Request>(
					GET_ALL_CREW_SUMMARIES,
					data,
				);
			},
			GetWorkerTimeEvidence: (data: GetWorkTimeEvidenceType.Request) => {
				return this.queryClient<GetWorkTimeEvidenceType.Response, GetWorkTimeEvidenceType.Request>(
					GET_WORK_TIME_EVIDENCE,
					data,
				);
			},
			CreateCrewSummary: (data: CreateCrewSummaryType.Request) => {
				return this.mutateClient<CreateCrewSummaryType.Response, CreateCrewSummaryType.Request>(
					CREATE_CREW_SUMMARY,
					data,
				);
			},
			UpdateCrewSummary: (data: UpdateCrewSummaryType.Request) => {
				return this.mutateClient<UpdateCrewSummaryType.Response, UpdateCrewSummaryType.Request>(
					UPDATE_CREW_SUMMARY,
					data,
				);
			},
		},
	};
}
