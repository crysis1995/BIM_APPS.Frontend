/*
 *      JOBS
 *
 * */
export const JOBS_LOADING_START = 'odbiory__jobs__LOADING_START';
export const JOBS_LOADING_END = 'odbiory__jobs__LOADING_END';
export const ALL_JOBS_FETCH_START = 'odbiory__jobs__ALL_FETCH_START';
export const ALL_JOBS_FETCH_END = 'odbiory__jobs__ALL_FETCH_END';
export const ALL_JOBS_FETCH_ERROR = 'odbiory__jobs__ALL_FETCH_ERROR';
export const JOBS_SET_DATA = 'odbiory__jobs__SET_DATA';
export const JOBS_CLEAN_DATA_OF_JOB = 'odbiory__jobs__CLEAN_JOBS';
export const OBJECT_JOB_FETCH_START = 'odbiory__jobs__OBJECT_JOB_FETCH_START';
export const OBJECT_JOB_FETCH_ERROR = 'odbiory__jobs__OBJECT_JOB_FETCH_ERROR';
export const OBJECT_JOB_FETCH_COMPLETED = 'odbiory__jobs__OBJECT_JOB_FETCH_COMPLETED';
export const ADD_INITIAL_JOB = 'odbiory__jobs__ADD_INITIAL_JOB';

/*
 *       OBJECTS
 *
 * */
export const OBJECTS_LOADING_START = 'odbiory__objects__LOADING_START';
export const OBJECTS_LOADING_ERROR = 'odbiory__objects__LOADING_ERROR';
export const OBJECTS_LOADING_END = 'odbiory__objects__LOADING_END';
export const OBJECTS_SET_DATA = 'odbiory__objects__SET_DATA';
export const OBJECTS_SET_INITIAL = 'odbiory__objects__SET_INITIAL';

/*
 *       ROOMS
 *
 * */
export const ROOMS_LOADING_START = 'odbiory__rooms__ROOMS_LOADING_START';
export const ROOMS_LOADING_ERROR = 'odbiory__rooms__ROOMS_LOADING_ERROR';
export const ROOMS_LOADING_END = 'odbiory__rooms__ROOMS_LOADING_END';
export const SELECT_ROOM_BY_ODBIORY = 'odbiory__rooms__SELECT_ROOM_BY_ODBIORY';
export const ADD_ROOM_TO_SELECTION = 'odbiory__rooms__ADD_ROOM_TO_SELECTION';
export const ADD_SPECYFIC_ROOM_TO_SELECTION = 'odbiory__rooms__ADD_SPECYFIC_ROOM_TO_SELECTION';
export const REMOVE_ROOM_FROM_SELECTION = 'odbiory__rooms__REMOVE_ROOM_FROM_SELECTION';
export const CLEAN_SELECTION = 'odbiory__rooms__CLEAN_SELECTION';
export const ROOMS_SET_INITIAL = 'odbiory__rooms__SET_INITIAL';
export const SELECT_ROOM = 'SELECT_ROOM';
export const SELECT_DEPARTMENT = 'SELECT_DEPARTMENT';
export const REMOVE_DEPARTMENT_FROM_SELECTIONS = 'REMOVE_DEPARTMENT_FROM_SELECTIONS';

/*
 *       ODBIORY COMPONENT
 *
 * */
export const ODBIORY_COMPONENT_STARTED = 'odbiory__COMPONENT_STARTED';
export const ODBIORY_COMPONENT_ENDED = 'odbiory__COMPONENT_ENDED';
export const SET_ACTIVE_TAB = 'odbiory__SET_ACTIVE_TAB';
export const CHANGE_VISIBILITY_UNITED_JOBS = 'odbiory__CHANGE_VISIBILITY_UNITED_JOBS';
export const CHANGE_VISIBILITY_DIFFERENTIAL_JOBS = 'odbiory__CHANGE_VISIBILITY_DIFFERENTIAL_JOBS';
export const CHANGE_UPGRADING_BY_TYPE = 'CHANGE_UPGRADING_BY_TYPE';

export const ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE = 'ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE';
export const ODBIORY_COMPONENT_FETCH_CRANE_START = 'ODBIORY_COMPONENT_FETCH_CRANE_START';
export const ODBIORY_COMPONENT_FETCH_CRANE_END = 'ODBIORY_COMPONENT_FETCH_CRANE_END';
export const ODBIORY_COMPONENT_FETCH_CRANE_ERROR = 'ODBIORY_COMPONENT_FETCH_CRANE_ERROR';

export const ODBIORY_COMPONENT_SET_CRANE = 'ODBIORY_COMPONENT_SET_CRANE';
export const ODBIORY_COMPONENT_SET_LEVEL = 'ODBIORY_COMPONENT_SET_LEVEL';
export const ODBIORY_COMPONENT_SET_LEVEL_OPTIONS = 'ODBIORY_COMPONENT_SET_LEVEL_OPTIONS';
export const ODBIORY_COMPONENT_INCREMENT_DAY = 'ODBIORY_COMPONENT_INCREMENT_DAY';
export const ODBIORY_COMPONENT_DECREMENT_DAY = 'ODBIORY_COMPONENT_DECREMENT_DAY';
export const ODBIORY_COMPONENT_SET_DATE = 'ODBIORY_COMPONENT_SET_DATE';
export const ODBIORY_COMPONENT_SET_ROTATION_DAY = 'ODBIORY_COMPONENT_SET_ROTATION_DAY';
export const ODBIORY_COMPONENT_SET_INITIAL_ROTATION_DAY = 'ODBIORY_COMPONENT_SET_INITIAL_ROTATION_DAY';
export const ODBIORY_COMPONENT_SET_ACTUAL_TAB = 'ODBIORY_COMPONENT_SET_ACTUAL_TAB';

export const ODBIORY_COMPONENT_FETCH_STATUSES_START = 'ODBIORY_COMPONENT_FETCH_STATUSES_START';
export const ODBIORY_COMPONENT_FETCH_STATUSES_END = 'ODBIORY_COMPONENT_FETCH_STATUSES_END';
export const ODBIORY_COMPONENT_FETCH_STATUSES_ERROR = 'ODBIORY_COMPONENT_FETCH_STATUSES_ERROR';

export const ODBIORY_COMPONENT_FETCH_CALENDAR_START = 'ODBIORY_COMPONENT_FETCH_CALENDAR_START';
export const ODBIORY_COMPONENT_FETCH_CALENDAR_END = 'ODBIORY_COMPONENT_FETCH_CALENDAR_END';

export const ACCEPTANCE_MONOLITHIC_INIT = 'ACCEPTANCE_MONOLITHIC_INIT';

/*
 *       RESULTS COMPONENT
 *
 * */
export const COLOR_RESULTS = 'odbiory__results__COLOR_RESULTS';
export const CLEAN_RESULTS = 'odbiory__results__CLEAN_RESULTS';
export const RESET_RESULTS = 'odbiory__results__RESET_RESULTS';
export const RESULTS_FETCH_START = 'RESULTS_FETCH_START';
export const RESULTS_FETCH_END = 'RESULTS_FETCH_END';
export const RESULTS_SET_DATA = 'RESULTS_SET_DATA';
export const RESULTS_UPDATE_DATA = 'RESULTS_UPDATE_DATA';
export const RESULTS_FETCH_ERROR = 'RESULTS_FETCH_ERROR';

/*
 *       TERMS COMPONENT
 *
 * */
export const TERMS_DATA_FETCH_START = 'TERMS_DATA_FETCH_START';
export const TERMS_DATA_FETCH_END = 'TERMS_DATA_FETCH_END';
export const TERMS_DATA_FETCH_ERROR = 'TERMS_DATA_FETCH_ERROR';
export const TERMS_SET_BY_JOB = 'TERMS_SET_BY_JOB';
export const TERMS_SET_BY_DEPARTMENT = 'TERMS_SET_BY_DEPARTMENT';
export const TERMS_SET_DEPARTMENT = 'TERMS_SET_DEPARTMENT';
export const TERMS_MONOLITHIC_SET_BY_GROUP = 'TERMS_MONOLITHIC_SET_BY_GROUP';
export const TERMS_MONOLITHIC_SET_BY_GROUP_INIT = 'TERMS_MONOLITHIC_SET_BY_GROUP_INIT';
export const TERMS_MONOLITHIC_UPDATE_BY_GROUP = 'TERMS_MONOLITHIC_UPDATE_BY_GROUP';
export const TERMS_MONOLITHIC_UPDATE_BY_GROUP_INIT = 'TERMS_MONOLITHIC_UPDATE_BY_GROUP_INIT';
export const TERMS_FETCH_START = 'TERMS_FETCH_START';
export const TERMS_FETCH_END = 'TERMS_FETCH_END';

/*
 *       UPGRADING COMPONENT
 *
 * */
export const UPGRADING_SET_DATA = 'UPGRADING_SET_DATA';
export const UPGRADING_UPDATE_JOB = 'UPGRADING_UPDATE_JOB';
export const UPGRADE_BY_JOB = 'UPGRADE_BY_JOB';
export const UPGRADING_FETCH_START = 'UPGRADING_FETCH_START';
export const UPGRADING_FETCH_END = 'UPGRADING_FETCH_END';
export const UPGRADING_FETCH_ERROR = 'UPGRADING_FETCH_ERROR';
export const UPGRADING_SET_ACTUAL_ELEMENTS = 'UPGRADING_SET_ACTUAL_ELEMENTS';
export const UPGRADING_HANDLE_SELECTED_ELEMENTS = 'UPGRADING_HANDLE_SELECTED_ELEMENTS';
export const UPGRADING_SET_STATUSES = 'UPGRADING_SET_STATUSES';
export const UPGRADING_SET_STATUSES_INITIALIZER = 'UPGRADING_SET_STATUSES_INITIALIZER';
export const UPGRADING_SET_STATUSES_START = 'UPGRADING_SET_STATUSES_START';
export const UPGRADING_SET_STATUSES_SUCCESS = 'UPGRADING_SET_STATUSES_SUCCESS';
export const UPGRADING_SET_STATUSES_ERROR = 'UPGRADING_SET_STATUSES_ERROR';
export const UPGRADING_CHECK_OBJECT_GROUP_TERMS = 'UPGRADING_CHECK_OBJECT_GROUP_TERMS';
/**
 *      MAIN
 *
 */
export const SET_INITIAL = 'odbiory__SET_INITIAL';
export const SET_CURRENT_LEVEL = 'odbiory__SET_CURRENT_LEVEL';

/*
 *       REFERENCE JOB
 *
 * */
export const ADD_REFERENCE_JOB = 'ADD_REFERENCE_JOB';
export const DELETE_REFERENCE_JOB = 'DELETE_REFERENCE_JOB';
export const UPDATE_REFERENCE_JOB = 'UPDATE_REFERENCE_JOB';
export const SAVE_REFERENCE_JOB = 'SAVE_REFERENCE_JOB';

/*
 *       DELAYS
 *
 * */
export const DELAYS_CREATE_NEW = 'DELAYS_CREATE_NEW';
export const DELAYS_CREATE_NEW_INIT = 'DELAYS_CREATE_NEW_INIT';
export const DELAYS_FETCH_CAUSES_START = 'DELAYS_FETCH_CAUSES_START';
export const DELAYS_FETCH_CAUSES_END = 'DELAYS_FETCH_CAUSES_END';
export const DELAYS_UPDATE_EXIST = 'DELAYS_UPDATE_EXIST';
