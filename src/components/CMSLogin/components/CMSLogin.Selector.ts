import { createSelector } from 'reselect';
import { CMSLoginType } from '../type';

export const getUserProjects = createSelector(
	(state: { CMSLogin: CMSLoginType.Redux.Store }) => state.CMSLogin.projects,
	(projects) => (projects ? Object.values(projects) : []),
);
