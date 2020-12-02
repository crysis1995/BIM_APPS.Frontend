/**
 * CONSTANTS
 * @readonly
 * @enum {string}
 */
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
	REAL_START: { id: 'REAL_START', name: 'Rzeczywista data rozpoczęcia' },
	PLANNED_START_BP: { id: 'PLANNED_START_BP', name: 'Data planowanego rozpoczęcia wg. PB', dbKey: 'StartDate' },
	PLANNED_FINISH_BP: { id: 'PLANNED_FINISH_BP', name: 'Data planowanego zakończenia wg. PB', dbKey: 'EndDate' },
	PLANNED_START: { id: 'PLANNED_START', name: 'Planowana data rozpoczęcia' },
	PLANNED_FINISH: { id: 'PLANNED_FINISH', name: 'Planowana data zakończenia' },
	REAL_FINISH: { id: 'REAL_FINISH', name: 'Rzeczywista data zakończenia' },
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

const PL_Description = {
	'External wall': 'Ściana zewnętrzna',
	'Internal wall': 'Ściana wewnętrzna',
	Acroterion: 'Attyka',
	'Cast in situ beam': 'Belka monolityczna',
	'One side wall': 'Bareta',
	'Cast in situ slab': 'Strop monolityczny',
	'Foundation wall': 'Ściana fundamentowa',
	'Curve wall': 'Ściana łukowa',
	'Rectangular column': 'Słup prostokątny',
	'Head of pile': 'Oczep',
	'Beam keyway': 'Belka monolityczna',
	'Particular beam': 'Belka monolityczna',
	'Rectangular high column': 'Słup prostokątny wysoki',
	Ramp: 'Rampa',
	raft: 'Płyta fundamentowa',
	'Specific column': 'Słupki prostokątne',
	'High wall': 'Ściana dociskowa',
	Stairs: 'Schody',
	'Console courte': 'Strop wspornikowy',
};

const ELEMENT_TYPE = {
	V: {
		id: 'V',
		name: 'Elementy pionowe',
	},
	H: {
		id: 'H',
		name: 'Elementy poziome',
	},
	// F: {
	// 	name: 'Elementy fundamentów',
	// },
};

const PARAMETERS = {
	volume: 'Objętość',
	area: 'Powierzchnia',
	running_meter: 'Długość',
};
const STATUS = {
	Delayed: { id: 'Delayed', name: 'Opóźniony', color: '#f05454' },
	Planned: {
		id: 'Planned',
		name: 'Planowany',
		color: '#FFCC1B',
	},
	Finished: {
		id: 'Finished',
		name: 'Wykonano',
		color: '#00ca43',
	},
};

const DELAY = [
	{
		id: '1',
		label: 'Przygotowanie inwestycji',
		children: [
			{
				id: '1',
				label: 'Dokumentacja',
				children: [{ id: '1', label: 'Brak dokumentacji wykonawczej' }],
			},
			{ id: '2', label: 'Metodologia' },
			{
				id: '3',
				label: 'Zakupy',
				children: [{ id: '1', label: 'Brak podwykonawcy danego zakresu' }],
			},
			{
				id: '4',
				label: 'Dostawy',
				children: [{ id: '1', label: 'Brak materiału na budowie' }],
			},
			{ id: '5', label: 'Uzyskanie decyzji urzędowych' },
		],
	},
	{
		id: '2',
		label: 'Zarządzanie',
		children: [
			{
				id: '1',
				label: 'Błędne decyzje kadry',
				children: [{ id: '1', label: 'Zła organizacja terenu budowy' }],
			},
			{ id: '2', label: 'Nieodpowiedni schemat organizacyjny' },
			{
				id: '3',
				label: 'Nieobsadzone stanowiska',
			},
		],
	},
	{
		id: '3',
		label: 'Wynikające bezpośrednio z produkcji',
		children: [
			{
				id: '1',
				label: 'Awarie sprzętu',
				children: [{ id: '1', label: 'Awaria żurawia wieżowego' }],
			},
			{ id: '2', label: 'Braki sprzętu' },
			{
				id: '3',
				label: 'Niedobory pracowników',
			},
		],
	},
	{
		id: '4',
		label: 'Niezależne od budowy',
		children: [
			{
				id: '1',
				label: 'Pogoda',
				children: [
					{ id: '1', label: 'Wiatr' },
					{ id: '2', label: 'Wysoka temp' },
					{ id: '3', label: 'Niska temp' },
					{ id: '4', label: 'Opady' },
				],
			},
			{
				id: '2',
				label: 'Stany zastany na budowie',
				children: [
					{ id: '1', label: 'Woda gruntowa na innym poziomie' },
					{ id: '2', label: 'Zanieczyszczony grunt' },
					{ id: '3', label: 'Nieudokumentowany istniejący obiekt w kolizji' },
				],
			},
			{
				id: '3',
				label: 'Stany nadzwyczajne',
				children: [{ id: '1', label: 'Braki kadrowe spowodowane Covid' }],
			},
		],
	},
	{
		id: '5',
		label: 'Zależne od Inwestora',
		children: [
			{
				id: '1',
				label: 'Opóźnienia w podejmowaniu decyzji',
			},
			{
				id: '2',
				label: 'Niedostarczone dokumentacje',
			},
			{
				id: '3',
				label: 'Zmiany projektowe',
			},
			{
				id: '4',
				label: 'Zmiany zakresu kontraktu',
			},
		],
	},
];

/**
 *
 * @param a {number}
 * @param b {number}
 * @return {number}
 */
const sum = (a, b) => RoundNumber(a + b);

export const MONOLITHIC = {
	PL_Description,
	PARAMETERS,
	VCF_REALISATION,
	ELEMENT_TYPE,
	STATUS,
	TERM_TYPE,
	TABS: {
		SCHEDULED: 'SCHEDULED',
		ACTUAL: 'ACTUAL',
		TERMS: 'TERMS',
		DELAY: 'DELAY',
		LOG: 'LOG',
	},
	DELAY,
	GROUP_BY: [
		{
			// element_type: ELEMENT_TYPE.V,
			name: 'Ściany',
			parameters: {
				volume: sum,
				area: sum,
				running_meter: sum,
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
				volume: sum,
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
				volume: sum,
				running_meter: sum,
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
				volume: sum,
				area: sum,
			},
			conditions: {
				keys: [VCF_REALISATION.CastInSituSlab, VCF_REALISATION.ConsoleCourte],
				specyfic: {},
			},
		},
		{
			// element_type: ELEMENT_TYPE.H,
			name: 'Rampy',
			parameters: {
				volume: sum,
				area: sum,
			},
			conditions: {
				keys: [VCF_REALISATION.Ramp],
				specyfic: {},
			},
		},
	],
};
