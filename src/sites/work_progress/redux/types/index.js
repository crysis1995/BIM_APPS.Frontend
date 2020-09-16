/*
 *      JOBS
 *
 * */
const JOBS_LOADING_START = 'odbiory__jobs__LOADING_START';
const JOBS_LOADING_END = 'odbiory__jobs__LOADING_END';
const ALL_JOBS_FETCH_START = 'odbiory__jobs__ALL_FETCH_START';
const ALL_JOBS_FETCH_END = 'odbiory__jobs__ALL_FETCH_END';
const ALL_JOBS_FETCH_ERROR = 'odbiory__jobs__ALL_FETCH_ERROR';
const JOBS_SET_DATA = 'odbiory__jobs__SET_DATA';
const JOBS_CHANGE_PERCENTAGE_VALUE = 'odbiory__jobs__CHANGE_PERCENTAGE_VALUE';
const JOBS_CLEAN_DATA_OF_JOB = 'odbiory__jobs__CLEAN_JOBS';
const OBJECT_JOB_FETCH_START = 'odbiory__jobs__OBJECT_JOB_FETCH_START';
const OBJECT_JOB_FETCH_ERROR = 'odbiory__jobs__OBJECT_JOB_FETCH_ERROR';
const OBJECT_JOB_FETCH_COMPLETED = 'odbiory__jobs__OBJECT_JOB_FETCH_COMPLETED';
const SET_SUMMARY_VALUE_TO_JOB = 'odbiory__jobs__SET_SUMMARY_VALUE_TO_JOB';
const SET_SUMMARY_VALUE_TO_JOB_START = 'odbiory__jobs__SET_SUMMARY_VALUE_TO_JOB_START';
const SET_SUMMARY_VALUE_TO_JOB_END = 'odbiory__jobs__SET_SUMMARY_VALUE_TO_JOB_END';
const UPGRADE_RESULTS = 'odbiory__jobs__UPGRADE_RESULTS';
const ADD_INITIAL_JOB = 'odbiory__jobs__ADD_INITIAL_JOB';

/*
 *       OBJECTS
 *
 * */
const OBJECTS_LOADING_START = 'odbiory__objects__LOADING_START';
const OBJECTS_LOADING_ERROR = 'odbiory__objects__LOADING_ERROR';
const OBJECTS_LOADING_END = 'odbiory__objects__LOADING_END';
const OBJECTS_SET_DATA = 'odbiory__objects__SET_DATA';
const OBJECTS_SET_INITIAL = 'odbiory__objects__SET_INITIAL';

/*
 *       ROOMS
 *
 * */
const ROOMS_LOADING_START = 'odbiory__rooms__ROOMS_LOADING_START';
const ROOMS_LOADING_ERROR = 'odbiory__rooms__ROOMS_LOADING_ERROR';
const ROOMS_LOADING_END = 'odbiory__rooms__ROOMS_LOADING_END';
const SELECT_ROOM_BY_ODBIORY = 'odbiory__rooms__SELECT_ROOM_BY_ODBIORY';
const ADD_ROOM_TO_SELECTION = 'odbiory__rooms__ADD_ROOM_TO_SELECTION';
const ADD_SPECYFIC_ROOM_TO_SELECTION = 'odbiory__rooms__ADD_SPECYFIC_ROOM_TO_SELECTION';
const REMOVE_ROOM_FROM_SELECTION = 'odbiory__rooms__REMOVE_ROOM_FROM_SELECTION';
const CLEAN_SELECTION = 'odbiory__rooms__CLEAN_SELECTION';
const ROOMS_SET_INITIAL = 'odbiory__rooms__SET_INITIAL';

/*
 *       ODBIORY COMPONENT
 *
 * */
const ODBIORY_COMPONENT_STARTED = 'odbiory__COMPONENT_STARTED';
const ODBIORY_COMPONENT_ENDED = 'odbiory__COMPONENT_ENDED';
const SET_ACTIVE_TAB = 'odbiory__SET_ACTIVE_TAB';
// const SET_AWANSOWANIE_COMPONENT_ACTIVE = 'odbiory__SET_AWANSOWANIE_COMPONENT_ACTIVE';
// const SET_RESULTS_COMPONENT_ACTIVE = 'odbiory__SET_RESULTS_COMPONENT_ACTIVE';
const CHANGE_VISIBILITY_UNITED_JOBS = 'odbiory__CHANGE_VISIBILITY_UNITED_JOBS';
const CHANGE_VISIBILITY_DIFFERENTIAL_JOBS = 'odbiory__CHANGE_VISIBILITY_DIFFERENTIAL_JOBS';

/*
 *       RESULTS COMPONENT
 *
 * */
const COLOR_RESULTS = 'odbiory__results__COLOR_RESULTS';
const CLEAN_RESULTS = 'odbiory__results__CLEAN_RESULTS';
const RESET_RESULTS = 'odbiory__results__RESET_RESULTS';

export {
	ADD_INITIAL_JOB,
	ADD_SPECYFIC_ROOM_TO_SELECTION,
	UPGRADE_RESULTS,
	JOBS_LOADING_START,
	JOBS_LOADING_END,
	ALL_JOBS_FETCH_START,
	ALL_JOBS_FETCH_END,
	ALL_JOBS_FETCH_ERROR,
	JOBS_SET_DATA,
	JOBS_CHANGE_PERCENTAGE_VALUE,
	JOBS_CLEAN_DATA_OF_JOB,
	OBJECT_JOB_FETCH_START,
	OBJECT_JOB_FETCH_ERROR,
	OBJECT_JOB_FETCH_COMPLETED,
	SET_SUMMARY_VALUE_TO_JOB,
	SET_SUMMARY_VALUE_TO_JOB_START,
	SET_SUMMARY_VALUE_TO_JOB_END,
	OBJECTS_LOADING_START,
	OBJECTS_LOADING_ERROR,
	OBJECTS_LOADING_END,
	OBJECTS_SET_DATA,
	OBJECTS_SET_INITIAL,
	ROOMS_LOADING_START,
	ROOMS_LOADING_ERROR,
	ROOMS_LOADING_END,
	SELECT_ROOM_BY_ODBIORY,
	ADD_ROOM_TO_SELECTION,
	REMOVE_ROOM_FROM_SELECTION,
	CLEAN_SELECTION,
	ROOMS_SET_INITIAL,
	ODBIORY_COMPONENT_STARTED,
	ODBIORY_COMPONENT_ENDED,
	SET_ACTIVE_TAB,
	// SET_AWANSOWANIE_COMPONENT_ACTIVE,
	// SET_RESULTS_COMPONENT_ACTIVE,
	CHANGE_VISIBILITY_UNITED_JOBS,
	CHANGE_VISIBILITY_DIFFERENTIAL_JOBS,
	COLOR_RESULTS,
	CLEAN_RESULTS,
	RESET_RESULTS,
};
