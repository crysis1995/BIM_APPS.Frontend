import { createSelector } from 'reselect';
import { CMSLogin } from '../type';

export const getUserProjects = createSelector(
	(state: { CMSLogin: CMSLogin.Redux.Store }) => state.CMSLogin.projects,
	(projects) => (projects ? Object.values(projects) : []),
);
