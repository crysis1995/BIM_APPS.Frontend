import types from "./types";

const FETCH_ALL_PROJECTS = (projects) => ({
      type: types.FETCH_ALL_PROJECTS,
      projects,
});

const SET_CURRENT_PROJECT = (currentProject) => ({
      type: types.SET_CURRENT_PROJECT,
      currentProject,
});

const SET_PROJECTS_TOP_FOLDERS = (projectTopFolders) => ({
      type: types.SET_PROJECT_TOP_FOLDER,
      projectTopFolders,
});

const CLEAR_PROJECTS_TOP_FOLDERS = () => ({
      type: types.CLEAR_PROJECT_TOP_FOLDER,
});

const CLEAR_ALL_DATA = () => ({
      type: types.CLEAR_ALL_DATA,
});

export default {
      SET_CURRENT_PROJECT,
      FETCH_ALL_PROJECTS,
      SET_PROJECTS_TOP_FOLDERS,
      CLEAR_PROJECTS_TOP_FOLDERS,
      CLEAR_ALL_DATA,
};
