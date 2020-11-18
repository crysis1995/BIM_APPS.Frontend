/**
 * CONSTANTS
 * @readonly
 * @enum {string}
 */
import UNITS from '../../../../components/Units';
import { RoundNumber } from '../../../../utils/RoundNumber';

export const CONSTANTS = {
	RESULTS: 'RESULTS',
	PROGRESS: 'PROGRESS',
	TERMS: 'TERMS',
};

export const ACCEPTANCE_TYPE = {
	MONOLITHIC: 'monolithic',
	STRUCTURAL: 'structural',
	MEP: 'mep',
	ARCHITECTURAL: 'architectural',
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

const VCF_REALISATION = {
	ExternalWall: 'External wall',
	InternalWall: 'Internal wall',
	Acroterion: 'Acroterion',
	CastInSituBeam: 'Cast in situ beam',
	OneSideWall: 'One side wall',
	CastInSituSlab: 'Cast in situ slab',
	FoundationWall: 'Foundation wall',
	CurveWall: 'Curve wall',
	RectangularColumn: 'Rectangular column',
	HeadOfPile: 'Head of pile',
	BeamKeyway: 'Beam keyway',
	ParticularBeam: 'Particular beam',
	RectangularHighColumn: 'Rectangular high column',
	Ramp: 'Ramp',
	Raft: 'raft',
	SpecificColumn: 'Specific column',
	HighWall: 'High wall',
	Stairs: 'Stairs',
	ConsoleCourte: 'Console courte',
};

const ELEMENT_TYPE = {
	V: {
		name: 'Elementy pionowe',
	},
	H: {
		name: 'Elementy poziome',
	},
	// F: {
	// 	name: 'Elementy fundamentów',
	// },
};

const PARAMETERS = {
	Volume: 'Objętość',
	Area: 'Powierzchnia',
	Length: 'Długość',
};
const STATUS = {
	'': { id: '', name: 'Brak statusu', color: '#99a8b2' },
	'1': {
		id: '1',
		name: 'Nie wykonano',
		color: '#f05454',
	},
	'2': {
		id: '2',
		name: 'Wykonano',
		color: '#00ca43',
	},
};

/**
 *
 * @param a {number}
 * @param b {number}
 * @return {number}
 */
const sum = (a, b) => RoundNumber(a + b);

export const MONOLITHIC = {
	PARAMETERS,
	VCF_REALISATION,
	ELEMENT_TYPE,
	STATUS,
	TABS: {
		SCHEDULED: 'SCHEDULED',
		ACTUAL: 'ACTUAL',
		TERMS: 'TERMS',
	},
	GROUP_BY: [
		{
			// element_type: ELEMENT_TYPE.V,
			name: 'Ściany',
			parameters: {
				Volume: sum,
				Area: sum,
				Length: sum,
			},
			conditions: {
				keys: [
					VCF_REALISATION.ExternalWall,
					VCF_REALISATION.InternalWall,
					VCF_REALISATION.CurveWall,
					VCF_REALISATION.FoundationWall,
					VCF_REALISATION.HighWall,
				],
				specyfic: {},
			},
		},
		{
			// element_type: ELEMENT_TYPE.V,
			name: 'Słupy',
			parameters: {
				Volume: sum,
			},
			conditions: {
				keys: [
					VCF_REALISATION.RectangularHighColumn,
					VCF_REALISATION.RectangularColumn,
					VCF_REALISATION.SpecificColumn,
				],
				specyfic: {},
			},
		},
		{
			// element_type: ELEMENT_TYPE.H,
			name: 'Belki',
			parameters: {
				Volume: sum,
				Length: sum,
			},
			conditions: {
				keys: [VCF_REALISATION.CastInSituBeam, VCF_REALISATION.ParticularBeam],
				specyfic: {},
			},
		},
		{
			// element_type: ELEMENT_TYPE.H,
			name: 'Stropy',
			parameters: {
				Volume: sum,
				Area: sum,
			},
			conditions: {
				keys: [VCF_REALISATION.CastInSituSlab, VCF_REALISATION.ConsoleCourte],
				specyfic: {},
			},
		},
	],
};
