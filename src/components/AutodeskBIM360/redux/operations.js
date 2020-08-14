import AutodeskApi from '../../../utils/AutodeskApi';
import Actions from './actions';


export const fetchAllProjects = () => async (dispatch, getState) => {
      const api = new AutodeskApi(
            getState().AutodeskLogin.login_3_legged.access_token
      );
      const projects = await api.bim360.getProjects(
            getState().AutodeskBIM360.accountId
      );
      dispatch(Actions.FETCH_ALL_PROJECTS(projects.data));
};

export const getProjectTopFolders = () => async (dispatch, getState) => {
      if (getState().AutodeskBIM360.currentProject) {
            const api = new AutodeskApi(
                  getState().AutodeskLogin.login_3_legged.access_token
            );
            const folders = await api.bim360.getProjectTopFolders(
                  getState().AutodeskBIM360.accountId,
                  getState().AutodeskBIM360.currentProject
            );
            dispatch(Actions.SET_PROJECTS_TOP_FOLDERS(folders.data));
      } else {
            dispatch(Actions.CLEAR_PROJECTS_TOP_FOLDERS());
      }
};

export const selectCurrentProject = (projectId) => (dispatch) => {
      dispatch(Actions.SET_CURRENT_PROJECT(projectId));
      dispatch(getProjectTopFolders());
};
