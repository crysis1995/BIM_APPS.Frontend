import { createSelector } from 'reselect';

export const getUserProjects = createSelector(
	(state) => state.CMSLogin.user.project_roles,
	/**
	 *
	 * @param projects {Object | null}
	 * @return {{name: *, id: string}[]|*[]}
	 */
	(projects) =>
		projects
			? Object.keys(projects).map((project_id) => ({ id: project_id, name: projects[project_id].project.name }))
			: [],
);
