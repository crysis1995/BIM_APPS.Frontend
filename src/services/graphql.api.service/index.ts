import { graphQLClient } from '../index';
import { CMSLoginType } from '../../components/CMSLogin/type';

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
import COUNT_WORKERS, { CountWorkersType } from './CONSTANTS/Queries/CountWorkers';
import GET_CREWS_AND_THEIR_CREW_SUMMARIES, {
	GetCrewsAndTheirCrewSummariesType,
} from './CONSTANTS/Queries/GetCrewsAndTheirCrewSummaries';
import GET_SUMMARY_WORKER_TIME, { GetSummaryWorkerTimeType } from './CONSTANTS/Queries/GET_SUMMARY_WORKER_TIME';
import GetObjectTimeEvidences, { GetObjectTimeEvidencesType } from './CONSTANTS/Queries/GetObjectTimeEvidences';
import CreateObjectTimeEvidence, { CreateObjectTimeEvidenceType } from './CONSTANTS/Mutations/CreateObjectTimeEvidence';
import UpdateObjectTimeEvidence, { UpdateObjectTimeEvidenceType } from './CONSTANTS/Mutations/UpdateObjectTimeEvidence';
import GetAllOtherWorkOptions, { GetAllOtherWorkOptionsType } from './CONSTANTS/Queries/GetAllOtherWorkOptions';
import CreateGroupedOtherWorkTimeEvidence, {
	CreateGroupedOtherWorkTimeEvidenceType,
} from './CONSTANTS/Mutations/CreateGroupedOtherWorkTimeEvidence';
import CreateOtherWorkTimeEvidence, {
	CreateOtherWorkTimeEvidenceType,
} from './CONSTANTS/Mutations/CreateOtherWorkTimeEvidence';
import UpdateGroupedOtherWorkTimeEvidence, {
	UpdateGroupedOtherWorkTimeEvidenceType,
} from './CONSTANTS/Mutations/UpdateGroupedOtherWorkTimeEvidence';
import UpdateOtherWorkTimeEvidence, {
	UpdateOtherWorkTimeEvidenceType,
} from './CONSTANTS/Mutations/UpdateOtherWorkTimeEvidence';
import DeleteOtherWorkTimeEvidence, {
	DeleteOtherWorkTimeEvidenceType,
} from './CONSTANTS/Mutations/DeleteOtherWorkTimeEvidence';
import GetGroupedOtherWorksTimeEvidences, {
	GetGroupedOtherWorksTimeEvidencesType,
} from './CONSTANTS/Queries/GetGroupedOtherWorksTimeEvidences';
import CreateWorker, { CreateWorkerType } from './CONSTANTS/Mutations/CreateWorker';
import AgregateWorkerTimeEvidence, {
	AgregateWorkerTimeEvidenceType,
} from './CONSTANTS/Queries/AgregateWorkerTimeEvidence';

export default class GraphQLAPIService {
	private client: ApolloClient<NormalizedCacheObject>;
	constructor(access_token?: CMSLoginType.Payload.Credentials['access_token'], client = graphQLClient) {
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
		return this.queryClient<UserDataType.Response, UserDataType.Request>(USER_DATA, data);
	}
	getUserProjectRoles(data: UserProjectsType.Request) {
		return this.queryClient<UserProjectsType.Response, UserProjectsType.Request>(USER_PROJECTS, data);
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
		LabourInput: {
			ObjectTimeEvidences: {
				Get: (data: GetObjectTimeEvidencesType.Request) => {
					return this.queryClient<GetObjectTimeEvidencesType.Response, GetObjectTimeEvidencesType.Request>(
						GetObjectTimeEvidences,
						data,
					);
				},
				Create: (data: CreateObjectTimeEvidenceType.Request) => {
					return this.mutateClient<
						CreateObjectTimeEvidenceType.Response,
						CreateObjectTimeEvidenceType.Request
					>(CreateObjectTimeEvidence, data);
				},
				Update: (data: UpdateObjectTimeEvidenceType.Request) => {
					return this.mutateClient<
						UpdateObjectTimeEvidenceType.Response,
						UpdateObjectTimeEvidenceType.Request
					>(UpdateObjectTimeEvidence, data);
				},
			},
			OtherWorkOptions: {
				GetAll: () => {
					return this.queryClient<GetAllOtherWorkOptionsType.Response, GetAllOtherWorkOptionsType.Request>(
						GetAllOtherWorkOptions,
					);
				},
			},

			GroupedOtherWorkTimeEvidence: {
				GetAll: (data: GetGroupedOtherWorksTimeEvidencesType.Request) => {
					return this.queryClient<
						GetGroupedOtherWorksTimeEvidencesType.Response,
						GetGroupedOtherWorksTimeEvidencesType.Request
					>(GetGroupedOtherWorksTimeEvidences, data);
				},
				Create: (data: CreateGroupedOtherWorkTimeEvidenceType.Request) => {
					return this.mutateClient<
						CreateGroupedOtherWorkTimeEvidenceType.Response,
						CreateGroupedOtherWorkTimeEvidenceType.Request
					>(CreateGroupedOtherWorkTimeEvidence, data);
				},
				Update: (data: UpdateGroupedOtherWorkTimeEvidenceType.Request) => {
					return this.mutateClient<
						UpdateGroupedOtherWorkTimeEvidenceType.Response,
						UpdateGroupedOtherWorkTimeEvidenceType.Request
					>(UpdateGroupedOtherWorkTimeEvidence, data);
				},
			},
			OtherWorkTimeEvidence: {
				Create: (data: CreateOtherWorkTimeEvidenceType.Request) => {
					return this.mutateClient<
						CreateOtherWorkTimeEvidenceType.Response,
						CreateOtherWorkTimeEvidenceType.Request
					>(CreateOtherWorkTimeEvidence, data);
				},
				Update: (data: UpdateOtherWorkTimeEvidenceType.Request) => {
					return this.mutateClient<
						UpdateOtherWorkTimeEvidenceType.Response,
						UpdateOtherWorkTimeEvidenceType.Request
					>(UpdateOtherWorkTimeEvidence, data);
				},
				Delete: (data: DeleteOtherWorkTimeEvidenceType.Request) => {
					return this.mutateClient<
						DeleteOtherWorkTimeEvidenceType.Response,
						DeleteOtherWorkTimeEvidenceType.Request
					>(DeleteOtherWorkTimeEvidence, data);
				},
			},
		},
		WorkTimeEvidence: {
			Worker: {
				Create: (data: CreateWorkerType.Request) => {
					return this.mutateClient<CreateWorkerType.Response, CreateWorkerType.Request>(CreateWorker, data);
				},
				AgregateTimeEvidence: (data: AgregateWorkerTimeEvidenceType.Request) => {
					return this.queryClient<
						AgregateWorkerTimeEvidenceType.Response,
						AgregateWorkerTimeEvidenceType.Request
					>(AgregateWorkerTimeEvidence, data);
				},
			},
			GetAllCrews: (data: GetAllCrewsType.Request) => {
				return this.queryClient<GetAllCrewsType.Response, GetAllCrewsType.Request>(GET_ALL_CREWS, data);
			},
			GetAllWorkers: (data: GetAllWorkersType.Request) => {
				return this.queryClient<GetAllWorkersType.Response, GetAllWorkersType.Request>(GET_ALL_WORKERS, data);
			},
			CountWorkers: () => {
				return this.queryClient<CountWorkersType.Response, CountWorkersType.Request>(COUNT_WORKERS);
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
			GetCrewsAndTheirCrewSummaries: (data: GetCrewsAndTheirCrewSummariesType.Request) => {
				return this.queryClient<
					GetCrewsAndTheirCrewSummariesType.Response,
					GetCrewsAndTheirCrewSummariesType.Request
				>(GET_CREWS_AND_THEIR_CREW_SUMMARIES, data);
			},
			GetSummaryWorkedTime: (data: GetSummaryWorkerTimeType.Request) => {
				return this.queryClient<GetSummaryWorkerTimeType.Response, GetSummaryWorkerTimeType.Request>(
					GET_SUMMARY_WORKER_TIME,
					data,
				);
			},
		},
	};
}
