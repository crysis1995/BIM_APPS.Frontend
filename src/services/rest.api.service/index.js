import { config } from '../../config';

export default class RestAPIService {
	constructor() {}

	fetchClient(url) {
		return fetch(`${config.bim_apps_api.url}${url}`).then((e) => e.json());
	}

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
		getAllCranes: (project_id) => {
			return this.fetchClient(`/warbud-cranes/?_where[project]=${project_id}`);
		},
		getAllRotationDays: (project_id) => {
			return this.fetchClient(`/warbud-project-rotation-days/?_limit=1000&_where[project]=${project_id}`);
		},
		getDelayCauses: () => {
			return this.fetchClient(`/acceptance-delay-causes`);
		},
	};
}
