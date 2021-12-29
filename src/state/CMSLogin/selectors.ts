import { createSelector } from 'reselect';
import { RootState } from '..';

import { AppEnum } from '../../generated/graphql';

function UserProjects(state: RootState) {
	return state.CMSLogin.Projects ? Object.values(state.CMSLogin.Projects) : [];
}
function IsLogin(state: RootState) {
	return state.CMSLogin.IsLogin;
}
function GetMe(state: RootState) {
	return state.CMSLogin.user;
}
function GetCurrentProjectCustomParams(state: RootState) {
	return state.CMSLogin.CurrentProject?.customParams;
}

function GetCurrentProject(state: RootState) {
	return state.CMSLogin.CurrentProject;
}

function GetCurrentProjectId(state: RootState) {
	return state.CMSLogin.CurrentProject?.id ?? null;
}

function UserAppsSelector(state: RootState) {
	return state.CMSLogin.UserApps;
}
function CMSCredentialTokenSelector(state: RootState) {
	return state.CMSLogin.Credentials?.token ?? null;
}
const CurrentProjectAppsPermissions = createSelector(
	UserAppsSelector,
	GetCurrentProjectId,
	(state: RootState, props: AppEnum) => props,
	(apps, projectId, requiredApp) => {
		if (!projectId) return false;
		const app = apps?.[projectId];
		if (!app) return false;
		return app?.some((app) => app.appName === requiredApp) ?? false;
	},
);

const GetProjectStatuses = createSelector(GetCurrentProject, (currentProject) => {
	return currentProject?.supportedStatuses ?? [];
});

export const ProjectsSelector = createSelector(UserProjects, (projects) => projects);
export const CurrentProjectAppsSelector = createSelector(
	UserAppsSelector,
	GetCurrentProjectId,
	(apps, projectId) => {
		if (apps && projectId) {
			return apps[projectId];
		}
		return null;
	},
);

function GetUser(state: RootState, userId: string) {
	return state.CMSLogin.Users?.[userId] ?? null;
}

function IsUserLoading(state: RootState, userId: string) {
	return state.CMSLogin.UsersLoading?.[userId] ?? false;
}

export const CMSLoginSelectors = {
	UserProjects,
	IsLogin,
	GetMe,
	GetCurrentProject,
	GetCurrentProjectId,
	UserAppsSelector,
	CMSCredentialTokenSelector,
	GetCurrentProjectCustomParams,
	CurrentProjectAppsPermissions,
	GetProjectStatuses,
	GetUser,
	IsUserLoading,
};
