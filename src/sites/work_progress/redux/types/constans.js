/**
 * CONSTANTS
 * @readonly
 * @enum {string}
 */
import UNITS from '../../../../components/Units';

export const CONSTANTS = {
	RESULTS: 'RESULTS',
	PROGRESS: 'PROGRESS',
	TERMS: 'TERMS',
};

/**
 * TERM_TYPE
 * @readonly
 * @enum {string}
 */
export const TERM_TYPE = {
	REAL_START: 'REAL_START',
	PLANNED_FINISH: 'PLANNED_FINISH',
	REAL_FINISH: 'REAL_FINISH',
};

/**
 * Permissions
 * @readonly
 * @enum {string}
 */
export const PERMISSION = {
	VIEW: 'VIEW',
	CREATE: 'CREATE',
	UPDATE: 'UPDATE',
};

/**
 * Room Selection Enum
 * @readonly
 * @enum {string}
 */
export const ROOM_SELECTION_STATUS = {
	CLEAR: 'clear',
	REMOVE_VALUE: 'remove-value',
	ADD_SPECYFIC: 'add-specyfic',
};

/**
 * UPGRADING_BY Enum
 * @readonly
 * @enum {string}
 */
export const UPGRADING_BY = {
	ROOMS: 'ROOMS',
	DEPARTMENT: 'DEPARTMENT',
};

/**
 * @enum {string}
 * @type {{AREA: string, OCCURRENCE: string, AMOUNT: string, VOLUME: string}}
 */
export const JOB_TYPE = {
	AREA: 'area',
	VOLUME: 'volume',
	OCCURRENCE: 'occurrence',
	AMOUNT: 'amount',
};

export const JOB_TYPE_UNIT = {
	AREA: UNITS.M2,
	VOLUME: UNITS.M3,
	OCCURRENCE: UNITS.NONE,
	AMOUNT: UNITS.NONE,
};
