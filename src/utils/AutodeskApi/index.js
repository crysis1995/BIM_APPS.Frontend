class AutodeskApi {
	constructor(accessToken) {
		this.accessToken = accessToken;
	}
	authorization = {
		getUserDetails: () =>
			fetch('https://developer.api.autodesk.com/userprofile/v1/users/@me', {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
			}).then((r) => r.json()),
	};

	bim360 = {
		getProjects: (hubId) =>
			fetch(`https://developer.api.autodesk.com/project/v1/hubs/${hubId}/projects`, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
			}).then((e) => e.json()),
		getProjectTopFolders: (hubId, projectId) =>
			fetch(`https://developer.api.autodesk.com/project/v1/hubs/${hubId}/projects/${projectId}/topFolders`, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
			}).then((e) => e.json()),
		getFolderContents: (project_id, folder_id) =>
			fetch(`https://developer.api.autodesk.com/data/v1/projects/${project_id}/folders/${folder_id}/contents`, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
			}).then((e) => e.json()),
		getItems: (project_id, folder_id) =>
			fetch(`https://developer.api.autodesk.com/data/v1/projects/${project_id}/folders/${folder_id}/contents`, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
			}).then((e) => e.json()),
		getVersion: (project_id, folder_id) =>
			fetch(`https://developer.api.autodesk.com/data/v1/projects/${project_id}/folders/${folder_id}/contents`, {
				headers: {
					Authorization: `Bearer ${this.accessToken}`,
				},
			}).then((e) => e.json()),
	};
}

export default AutodeskApi;
