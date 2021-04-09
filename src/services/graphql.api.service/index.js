import dayjs from 'dayjs';
import { graphQLClient } from '../index';
import MUTATION from './CONSTANTS/mutation';
import QUERY from './CONSTANTS/query';

export default class GraphQLAPIService {
	constructor(access_token, client = graphQLClient, query = QUERY, mutation = MUTATION) {
		this.client = client(access_token);
		this.query = query;
		this.mutation = mutation;
	}
	fetchPolicy = 'no-cache';

	login(identifier, password) {
		const { LOGIN } = this.mutation;
		return this.client.mutate({
			mutation: LOGIN,
			variables: { i: identifier, p: password },
			fetchPolicy: this.fetchPolicy,
		});
	}

	queryClient(query, variables, fetchPolicy = this.fetchPolicy) {
		return this.client.query({
			query,
			variables,
			fetchPolicy,
		});
	}
	mutateClient(mutation, variables, fetchPolicy = this.fetchPolicy) {
		return this.client.mutate({
			mutation,
			variables,
			fetchPolicy,
		});
	}

	resetPassword(id, password) {
		const { RESET_PASSWORD } = this.mutation;
		return this.mutateClient(RESET_PASSWORD, { p: password, u: id });
	}

	userData(user_id) {
		const { USER_DATA } = this.query;
		return this.queryClient(USER_DATA, { i: user_id }).then((e) => e.data.user);
	}
	getUserProjectRoles(user_id) {
		const { USER_PROJECTS } = this.query;
		return this.queryClient(USER_PROJECTS, { i: user_id }).then((e) => e.data.warbudProjUserRoles);
	}

	ARCHITECTURAL = {
		getAllJobs: () => {
			const { GET_ALL_ACCEPTANCE_JOBS } = this.query;
			return this.queryClient(GET_ALL_ACCEPTANCE_JOBS);
		},
	};

	MONOLITHIC = {
		countObjects: (project_id) => {
			const { ACCEPTANCE_OBJECTS_COUNT } = this.query;
			return this.queryClient(ACCEPTANCE_OBJECTS_COUNT, { p: project_id }).then(
				(e) => e.data.acceptanceObjectsConnection.aggregate.totalCount,
			);
		},
		createStatus: (object_id, date, user_id, status_id) => {
			const { CREATE_STATUS } = this.mutation;
			return this.mutateClient(CREATE_STATUS, { o: object_id, d: date, u: user_id, s: status_id }).then(
				(e) => e.data.createAcceptanceObjectStatus.acceptanceObjectStatus.id,
			);
		},
		getDelays: (user_id) => {
			const { GET_DELAYS } = this.query;
			return this.queryClient(GET_DELAYS, { us: user_id }).then((e) => e.data.acceptanceDelays);
		},
		getStatuses: () => {
			const { GET_STATUSES } = this.query;
			return this.queryClient(GET_STATUSES).then((e) => e.data.acceptanceStatuses);
		},
		createDelay: (user, commentary, date, causes_array, level, crane) => {
			const { CREATE_DELAY } = this.mutation;
			return this.mutateClient(CREATE_DELAY, {
				u: user,
				c: commentary,
				dt: date,
				cs: causes_array,
				l: level,
				cr: crane,
			});
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
			GetAllCrews: async (project_id, user_id) => {
				const { GET_ALL_CREWS } = this.query;
				return this.queryClient(GET_ALL_CREWS, { proj: project_id, user: user_id });
			},
			GetAllWorkers: async () => {
				const { GET_ALL_WORKERS } = this.query;
				return this.queryClient(GET_ALL_WORKERS);
			},
			CreateHouseCrew: async (project_id, user_id, crew_name, work_type) => {
				const { CREATE_HOUSE_CREW } = this.mutation;
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
			UpdateCrewSummary: async ({ crew_summary, workers }) => {
				const { UPDATE_CREW_SUMMARY } = this.mutation;
				return this.mutateClient(UPDATE_CREW_SUMMARY, { crewSummary: crew_summary, work: workers });
			},
		},
	};
}

function generateRanges(total, N = 100) {
	const ranges = Math.ceil(total / N);
	let arr = [];
	for (let i = 0; i < ranges; i++) {
		arr.push(i * N);
	}
	return arr;
}
