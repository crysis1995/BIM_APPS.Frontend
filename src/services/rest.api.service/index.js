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
		return fetch(`${baseUrl}${url}`, options).then((e) => e.json());
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
			return this.fetchClient(`/acceptance-terms/getActual?project_id=${project_id}`);
		},
		getAllObjects: async (project_id) => {
			return this.fetchClient(`/acceptance-objects?_limit=2000&project=${project_id}`);
		},
		getAccepntaceTerms: (project_id) => {
			return this.fetchClient(`/acceptance-terms?project=${project_id}`);
		},
		getAllRotationDays: (project_id) => {
			return this.fetchClient(`/warbud-project-rotation-days/?_limit=1000&_where[project]=${project_id}`);
		},
		getDelayCauses: () => {
			return this.fetchClient(`/acceptance-delay-causes`);
		},
	};
	WORKERS_LOG = {
		GENERAL: {
			fetchWorkersMap: () => {
				return this.fetchClient(`/ax-synchro`);
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
	};
}
