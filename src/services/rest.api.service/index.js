import { config } from '../../config';

export default class RestAPIService {
	constructor(accessToken) {
		this.accessToken = accessToken;
	}

	fetchClient(url, baseUrl = config.bim_apps_api.url) {
		let options = {};
		if (this.accessToken) {
			options.headers = {
				Authorization: `Bearer ${this.accessToken}`,
			};
		}
		return fetch(`${baseUrl}${url}`, options);
	}
	fetchClientPost(url, body, baseUrl = config.bim_apps_api.url) {
		let options = {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		};
		if (this.accessToken) {
			options.headers = {
				...options.headers,
				Authorization: `Bearer ${this.accessToken}`,
			};
		}
		return fetch(`${baseUrl}${url}`, options);
	}
	GENERAL = {
		getAccessToken: () => {
			return this.fetchClient('/api/token/', config.api_url);
		},
	};

	MONOLITHIC = {
		initializeTerms: (project_id) => {
			return this.fetchClient(`/acceptance-terms/getActual?project_id=${project_id}`).then((e) => e.json());
		},
		getAllObjects: async (project_id) => {
			return this.fetchClient(`/acceptance-objects?_limit=2000&project=${project_id}`).then((e) => e.json());
		},
		getAccepntaceTerms: (project_id) => {
			return this.fetchClient(`/acceptance-terms?project=${project_id}`).then((e) => e.json());
		},
		getAllRotationDays: (project_id) => {
			return this.fetchClient(
				`/warbud-project-rotation-days/?_limit=1000&_where[project]=${project_id}`,
			).then((e) => e.json());
		},
		getDelayCauses: () => {
			return this.fetchClient(`/acceptance-delay-causes`).then((e) => e.json());
		},
	};
	WORKERS_LOG = {
		GENERAL: {
			fetchWorkersMap: () => {
				return this.fetchClient(`/ax-synchro`).then((e) => e.json());
			},
		},
		WORK_TIME_EVIDENCE: {
			CreateOrUpdate: (body) => {
				return this.fetchClientPost('/workers-log-work-time-evidences/create_or_update', body).then((e) =>
					e.json(),
				);
			},
			GenerateFinancialRaport: ({ project_id, user_id, start_date, end_date }) => {
				return this.fetchClientPost('/raports-generator/workers-log-evidence', {
					project_id,
					user_id,
					start_date,
					end_date,
				});
			},
		},
		LABOUR_INPUT: {
			GetObjectsFilteredByStatuses: ({ date, project }) => {
				return this.fetchClientPost('/acceptance-objects/find-by-statuses-filter', {
					date,
					project,
				}).then((e) => e.json());
			},
		},
	};
}
