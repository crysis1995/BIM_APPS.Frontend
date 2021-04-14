import { graphQLClient } from '../index';
import MUTATION from './CONSTANTS/mutation';
import QUERY from './CONSTANTS/query';
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

export default class GraphQLAPIService {
	private client: ApolloClient<NormalizedCacheObject>;
	private readonly query: any;
	private readonly mutation: any;
	constructor(
		access_token: CMSLogin.Payload.Credentials['access_token'],
		client = graphQLClient,
		query = QUERY,
		mutation = MUTATION,
	) {
		this.client = client(access_token);
		this.query = query;
		this.mutation = mutation;
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
		// countObjects: (project_id) => {
		// 	const { ACCEPTANCE_OBJECTS_COUNT } = this.query;
		// 	return this.queryClient(ACCEPTANCE_OBJECTS_COUNT, { p: project_id }).then(
		// 		(e) => e.data.acceptanceObjectsConnection.aggregate.totalCount,
		// 	);
		// },
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
		updateTerm: (term_id, { REAL_START, PLANNED_FINISH, REAL_FINISH, PLANNED_START, objects }) => {
			const { UPDATE_TERM } = this.mutation;
			let variables = { i: term_id };
			if (REAL_START) variables.RS = REAL_START;
			if (PLANNED_FINISH) variables.PF = PLANNED_FINISH;
			if (REAL_FINISH) variables.RF = REAL_FINISH;
			if (PLANNED_START) variables.PS = PLANNED_START;
			if (objects) variables.obj = objects;
			return this.mutateClient(UPDATE_TERM, variables);
		},
	};

	WorkersLog = {
		WorkTimeEvidence: {
			GetAllCrews: (data: GetAllCrewsType.Request) => {
				return this.queryClient<GetAllCrewsType.Response, GetAllCrewsType.Request>(GET_ALL_CREWS, data);
			},
			GetAllWorkers: async () => {
				return this.queryClient<GetAllWorkersType.Response, GetAllWorkersType.Request>(GET_ALL_WORKERS);
			},
			CreateHouseCrew: async (project_id, user_id, crew_name, work_type) => {
				return this.mutateClient(CREATE_HOUSE_CREW, {
					name: crew_name,
					user: user_id,
					proj: project_id,
					work_type,
				});
			},
			GetAllCrewSummaries: async ({ crew_id, start_date, end_date, user_id, project_id }) => {
				const { GET_ALL_CREW_SUMMARIES } = this.query;
				return this.queryClient(GET_ALL_CREW_SUMMARIES, {
					crw: crew_id,
					start: start_date,
					end: end_date,
					own: user_id,
					proj: project_id,
				});
			},
			GetWorkerTimeEvidence: async ({ worker_id, start_date, end_date }) => {
				const { GET_WORK_TIME_EVIDENCE } = this.query;
				return this.queryClient(GET_WORK_TIME_EVIDENCE, {
					worker: worker_id,
					start: start_date,
					end: end_date,
				});
			},
			CreateCrewSummary: async ({ crew, range, user, workers = [], project }) => {
				const { CREATE_CREW_SUMMARY } = this.mutation;
				return this.mutateClient(CREATE_CREW_SUMMARY, {
					crw: crew,
					start: range.start,
					end: range.end,
					own: user,
					work: workers,
					proj: project,
				});
			},
			UpdateCrewSummary: async ({ crew_summary, workers }) => {
				const { UPDATE_CREW_SUMMARY } = this.mutation;
				return this.mutateClient(UPDATE_CREW_SUMMARY, { crewSummary: crew_summary, work: workers });
			},
		},
	};
}
