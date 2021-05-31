export enum Workers {
	FETCH_WORKERS_START = 'workers_log__FETCH_WORKERS_START',
	FETCH_WORKERS_END = 'workers_log__FETCH_WORKERS_END',

	SET_ALL = 'workers_log__SET_ALL_WORKERS',
	ADD = 'workers_log__ADD_WORKER',
	ADD_NEW = 'workers_log__ADD_NEW_WORKER',
	CREATE = 'workers_log__CREATE',
	DELETE = 'workers_log__DELETE_WORKER',
	COPY_WORKERS = 'workers_log__COPY_WORKERS',
	SET_WORK_TIME = 'workers_log__SET_WORKER_WORK_TIME',

	FETCH_WORKERS_MAP_START = 'workers_log__FETCH_WORKERS_MAP_START',
	FETCH_WORKERS_MAP_END = 'workers_log__FETCH_WORKERS_MAP_END',
	FETCH_WORKERS_MAP_ERROR = 'workers_log__FETCH_WORKERS_MAP_ERROR',
}
