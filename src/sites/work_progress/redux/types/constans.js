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

const VCF_REALISATION = {};

const ClassificationDefinitions = {
	/*VCG REALISATION*/
	ExternalWall: 'External wall',
	Pilaster: 'Pilaster',
	Pillar: 'Pillar',
	HighColumn: 'High column',
	CircularColumn: 'Circular column',
	KeelDrag: 'Keel drag',
	HollowCoreSlab: 'Hollow core slab',
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
	Raft: 'Raft',
	SpecificColumn: 'Specific column',
	HighWall: 'High wall',
	Stairs: 'Stairs',
	ConsoleCourte: 'Console courte',
	FormedStripFooting: 'Formed strip footing',
	IndividualFooting: 'Individual footing',
	UpstandBeam: 'Upstand beam',

	/*Strop*/
	StropMonolityczny: 'Strop monolityczny',
	StropFiligran: 'Strop filigran',
	Nadbeton: 'Nadbeton',
	StropPrefabrykowany: 'Strop prefabrykowany',
	StropPref: 'Strop pref.',
	StropPrefHc: 'Strop pref. hc pref. HC',
	StropSprezony: 'Strop sprezony',
	Kompensacja: 'Kompensacja',
	StropTransferowy: 'Strop transferowy',
	Glowica: 'Glowica',
	PlytaRampy: 'Plyta rampy',
	RampaProsta: 'Rampa prosta',
	RampaSpiralna: 'Rampa spiralna',
	StropNaGruncie: 'Strop na gruncie',
	StropPochyly: 'Strop pochyly',
	StropHC: 'Strop HC',
	/*Ściany*/
	ScianaMonolityczna: 'Sciana monolityczna',
	ScianaZewnetrzna: 'Sciana zewnetrzna',
	ScianaWewnetrzna: 'Sciana wewnetrzna',
	ScianaWysoka: 'Sciana wysoka',
	ScianaPrefabrykowana: 'Sciana prefabrykowana',
	ScianaPref: 'Sciana pref.',
	ScianaOporowa: 'Sciana oporowa',
	ScianaDociskowa: 'Sciana dociskowa',
	ScianaLukowa: 'Sciana lukowa',
	ScianaFundamentowa: 'Sciana fundamentowa',
	ScianaBetArch: 'Sciana bet arch',
	ScianaAkustyczna: 'Sciana akustyczna',
	ScianaMurowana: 'Sciana murowana',
	ScianaSzczelinowa: 'Sciana szczelinowa',
	ScianaPodstropowa: 'Sciana podstropowa ',
	ScianaWSystemieScp: 'Sciana w systemie scp',
	ScianaSzybuWindowego: 'Sciana szybu windowego',
	SciankaFundamentowa: 'Scianka fundamentowa',
	Filar: 'Filar',
	ScianyPrzeglebienia: 'Sciany przeglebienia',
	/*slupy*/
	SlupProstokatny: 'Slup prostokatny',
	SlupOkragly: 'Slup okragly',
	SlupWysoki: 'Slup wysoki',
	SlupWysokiProstokatny: 'Slup wysoki prostokatny',
	SlupWysokiOkragly: 'Slup wysoki okragly',
	SlupPrefabrykowany: 'Slup prefabrykowany',
	SlupPref: 'Slup pref.',
	SlupSkosny: 'Slup skosny',
	SlupSpecyficzny: 'Slup specyficzny',
	SlupPodstropowy: 'Slup podstropowy',
	/*Fundamenty*/
	StopaFundamentowa: 'Stopa fundamentowa',
	LawaFundamentowa: 'Lawa fundamentowa',
	PlytaFundamentowa: 'Plyta fundamentowa',
	PosadzkaBetonowa: 'Posadzka betonowa',
	Posadzka: 'Posadzka',
	ChudyBeton: 'Chudy beton',
	Barety: 'Barety',
	FundamentyPodUrzadzenia: 'Fundamenty pod urzadzenia',
	UskokLawy: 'Uskok lawy',
	LawaPochyla: 'Lawa pochyla',
	Fundament: 'Fundament',
	/*belki*/
	BelkaMonolityczna: 'Belka monolityczna',
	BelkaPrefabrykowana: 'Belka prefabrykowana',
	BelkaPref: 'Belka pref.',
	BelkaObwodowa: 'Belka obwodowa',
	BelkaObwodowaPref: 'Belka obwodowa pref.',
	BelkaKrawedziowa: 'Belka krawedziowa',
	BelkaKrawedziowaPref: 'Belka krawedziowa pref.',
	Nadciag: 'Nadciag',
	Podciag: 'Podciag',
	Wieniec: 'Wieniec',
	/*Inne*/
	Attyka: 'Attyka',
	SchodyMonolityczne: 'Schody monolityczne',
	SchodyPrefabrykowane: 'Schody prefabrykowane',
	Spocznik: 'Spocznik',
	BiegSchodowyPref: 'Bieg schodowy pref.',
	Podwalina: 'Podwalina',
	PodwalinaPref: 'Podwalina pref.',
	CokolSlupaPref: 'Cokol slupa pref.',
	TrzpienZelbetowy: 'Trzpien zelbetowy',
	Wyburzenia: 'Wyburzenia',
	RusztMonolityczny: 'Ruszt monolityczny',
};

const PL_Description = {
	/*VCF REALISATION*/
	'External wall': 'Ściana zewnętrzna',
	'Internal wall': 'Ściana wewnętrzna',
	'Circular column': 'Słup okrągły',
	'Hollow core slab': 'Strop HC',
	'High column': 'Słup okrągły',
	'Keel drag': 'Przegłębienie',
	Pilaster: 'Pilaster',
	Pillar: 'Filar',
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
	Raft: 'Płyta fundamentowa',
	'Specific column': 'Słupki prostokątne',
	'High wall': 'Ściana dociskowa',
	Stairs: 'Schody',
	'Console courte': 'Strop wspornikowy',
	'Formed strip footing': 'Ława fundamentowa',
	'Individual footing': 'Stopa fundamentowa',
	'Upstand beam': 'Nadciąg',
	/* STROP*/
	'Strop monolityczny': 'Strop monolityczny',
	'Strop filigran': 'Strop filigran',
	Nadbeton: 'Nadbeton',
	'Strop prefabrykowany': 'Strop prefabrykowany',
	'Strop pref.': 'Strop pref.',
	'Strop pref. hc pref. HC': 'Strop pref. HC',
	'Strop sprezony': 'Strop sprężony',
	Kompensacja: 'Kompensacja',
	'Strop transferowy': 'Strop transferowy',
	Glowica: 'Głowica',
	'Plyta rampy': 'Płyta rampy',
	'Rampa prosta': 'Rampa prosta',
	'Rampa spiralna': 'Rampa spiralna',
	'Strop na gruncie': 'Strop na gruncie',
	'Strop pochyly': 'Strop pochyły',
	'Strop HC': 'Strop HC',
	/*SCIANA*/
	'Sciana monolityczna': 'Ściana monolityczna',
	'Sciana zewnetrzna': 'Ściana zewnętrzna',
	'Sciana wewnetrzna': 'Ściana wewnętrzna',
	'Sciana wysoka': 'Ściana wysoka',
	'Sciana prefabrykowana': 'Ściana prefabrykowana',
	'Sciana pref.': 'Ściana pref.',
	'Sciana oporowa': 'Ściana oporowa',
	'Sciana dociskowa': 'Ściana dociskowa',
	'Sciana lukowa': 'Ściana łukowa',
	'Sciana fundamentowa': 'Ściana fundamentowa',
	'Sciana bet arch': 'Ściana bet. arch',
	'Sciana akustyczna': 'Ściana akustyczna',
	'Sciana murowana': 'Ściana murowana',
	'Sciana szczelinowa': 'Ściana szczelinowa',
	'Sciana podstropowa ': 'Ściana podstropowa',
	'Sciana w systemie scp': 'Ściana w systemie SCP',
	'Sciana szybu windowego': 'Ściana szybu windowego',
	'Scianka fundamentowa': 'Ścianka fundamentowa',
	Filar: 'Filar',
	'Sciany przeglebienia': 'Ściany przegłębienia',
	/*SLUP*/
	'Slup prostokatny': 'Słup prostokątny',
	'Slup okragly': 'Słup okrągły',
	'Slup wysoki': 'Słup wysoki',
	'Slup wysoki prostokatny': 'Słup wysoki prostokątny',
	'Slup wysoki okragly': 'Słup wysoki okrągły',
	'Slup prefabrykowany': 'Słup prefabrykowany',
	'Slup pref.': 'Słup pref.',
	'Slup skosny': 'Słup skośny',
	'Slup specyficzny': 'Słup specyficzny',
	'Slup podstropowy': 'Słup podstropowy',
	/*FUNDAMENTY*/
	'Stopa fundamentowa': 'Stopa fundamentowa',
	'Lawa fundamentowa': 'Ława fundamentowa',
	'Plyta fundamentowa': 'Płyta fundamentowa',
	'Posadzka betonowa': 'Posadzka betonowa',
	Posadzka: 'Posadzka',
	'Chudy beton': 'Chudy beton',
	Barety: 'Barety',
	'Fundamenty pod urzadzenia': 'Fundamenty pod urządzenia',
	'Uskok lawy': 'Uskok ławy',
	'Lawa pochyla': 'Ława pochyła',
	Fundament: 'Fundament',
	/*BELKI*/
	'Belka monolityczna': 'Belka monolityczna',
	'Belka prefabrykowana': 'Belka prefabrykowana',
	'Belka pref.': 'Belka pref.',
	'Belka obwodowa': 'Belka obwodowa',
	'Belka obwodowa pref.': 'Belka obwodowa pref.',
	'Belka krawedziowa': 'Belka krawędziowa',
	'Belka krawedziowa pref.': 'Belka krawędziowa pref.',
	Nadciag: 'Nadciąg',
	Podciag: 'Podciąg',
	Wieniec: 'Wieniec',
	/*INNE*/
	Attyka: 'Attyka',
	'Schody monolityczne': 'Schody monolityczne',
	'Schody prefabrykowane': 'Schody prefabrykowane',
	Spocznik: 'Spocznik',
	'Bieg schodowy pref.': 'Bieg schodowy prefabrykowany',
	Podwalina: 'Podwalina',
	'Podwalina pref.': 'Podwalina prefabrykowana',
	'Cokol slupa pref.': 'Cokół słupa prefabrykowany',
	'Trzpien zelbetowy': 'Trzpień żelbetowy',
	Wyburzenia: 'Wyburzenia',
	'Ruszt monolityczny': 'Ruszt monolityczny',
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
};

const PARAMETERS = {
	volume: 'Objętość',
	area: 'Powierzchnia',
	running_meter: 'Długość',
};
const STATUS = {
	Delayed: { id: 'Delayed', name: 'Opóźniony', color: '#f05454' },
	Planned: { id: 'Planned', name: 'Planowany', color: '#FFCC1B' },
	Finished: { id: 'Finished', name: 'Wykonano', color: '#00ca43' },
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
	// VCF_REALISATION,
	ClassificationDefinitions,
	ELEMENT_TYPE,
	STATUS,
	TERM_TYPE,
	WORKERS: [{ name: 'Cieśle' }, { name: 'Zbrojarze' }],
	TABS: {
		SCHEDULED: 'SCHEDULED',
		ACTUAL: 'ACTUAL',
		HISTORICAL: 'HISTORICAL',
		TERMS: 'TERMS',
		DELAY: 'DELAY',
		LOG: 'LOG',
	},
	DELAY,
	GROUP_BY: [
		{
			name: 'Ściany',
			parameters: {
				volume: sum,
				area: sum,
				running_meter: sum,
			},
			conditions: {
				keys: [
					/*VCF*/
					ClassificationDefinitions.ExternalWall,
					ClassificationDefinitions.InternalWall,
					ClassificationDefinitions.CurveWall,
					ClassificationDefinitions.FoundationWall,
					ClassificationDefinitions.HighWall,
					ClassificationDefinitions.OneSideWall,
					/*METODOLOGIA KLASYFIKACJA*/
					ClassificationDefinitions.ScianaMonolityczna,
					ClassificationDefinitions.ScianaZewnetrzna,
					ClassificationDefinitions.ScianaWewnetrzna,
					ClassificationDefinitions.ScianaWysoka,
					ClassificationDefinitions.ScianaPrefabrykowana,
					ClassificationDefinitions.ScianaPref,
					ClassificationDefinitions.ScianaOporowa,
					ClassificationDefinitions.ScianaDociskowa,
					ClassificationDefinitions.ScianaLukowa,
					ClassificationDefinitions.ScianaFundamentowa,
					ClassificationDefinitions.ScianaBetArch,
					ClassificationDefinitions.ScianaAkustyczna,
					ClassificationDefinitions.ScianaMurowana,
					ClassificationDefinitions.ScianaSzczelinowa,
					ClassificationDefinitions.ScianaPodstropowa,
					ClassificationDefinitions.ScianaWSystemieScp,
					ClassificationDefinitions.ScianaSzybuWindowego,
					ClassificationDefinitions.SciankaFundamentowa,
					ClassificationDefinitions.Filar,
					ClassificationDefinitions.ScianyPrzeglebienia,
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
					/*VCF*/
					ClassificationDefinitions.RectangularHighColumn,
					ClassificationDefinitions.RectangularColumn,
					ClassificationDefinitions.SpecificColumn,
					ClassificationDefinitions.Pilaster,
					/*METODOLOGIA KLASYFIKACJA*/
					ClassificationDefinitions.SlupProstokatny,
					ClassificationDefinitions.SlupOkragly,
					ClassificationDefinitions.SlupWysoki,
					ClassificationDefinitions.SlupWysokiProstokatny,
					ClassificationDefinitions.SlupWysokiOkragly,
					ClassificationDefinitions.SlupPrefabrykowany,
					ClassificationDefinitions.SlupPref,
					ClassificationDefinitions.SlupSkosny,
					ClassificationDefinitions.SlupSpecyficzny,
					ClassificationDefinitions.SlupPodstropowy,
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
				keys: [
					/*VCF*/
					ClassificationDefinitions.CastInSituBeam,
					ClassificationDefinitions.ParticularBeam,
					/*METODOLOGIA KLASYFIKACJA*/
					ClassificationDefinitions.BelkaMonolityczna,
					ClassificationDefinitions.BelkaPrefabrykowana,
					ClassificationDefinitions.BelkaPref,
					ClassificationDefinitions.BelkaObwodowa,
					ClassificationDefinitions.BelkaObwodowaPref,
					ClassificationDefinitions.BelkaKrawedziowa,
					ClassificationDefinitions.BelkaKrawedziowaPref,
					ClassificationDefinitions.Nadciag,
					ClassificationDefinitions.Podciag,
					ClassificationDefinitions.Wieniec,
				],
				specyfic: {},
			},
		},
		{
			// element_type: ELEMENT_TYPE.H,
			name: 'Fundamenty',
			parameters: {
				volume: sum,
				running_meter: sum,
			},
			conditions: {
				keys: [
					/*METODOLOGIA KLASYFIKACJA*/
					ClassificationDefinitions.StopaFundamentowa,
					ClassificationDefinitions.LawaFundamentowa,
					ClassificationDefinitions.PlytaFundamentowa,
					ClassificationDefinitions.PosadzkaBetonowa,
					ClassificationDefinitions.Posadzka,
					ClassificationDefinitions.ChudyBeton,
					ClassificationDefinitions.Barety,
					ClassificationDefinitions.FundamentyPodUrzadzenia,
					ClassificationDefinitions.UskokLawy,
					ClassificationDefinitions.LawaPochyla,
					ClassificationDefinitions.Fundament,
				],
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
				keys: [
					/*VCF*/
					ClassificationDefinitions.CastInSituSlab,
					ClassificationDefinitions.ConsoleCourte,
					/*METODOLOGIA KLASYFIKACJA*/
					ClassificationDefinitions.StropMonolityczny,
					ClassificationDefinitions.StropFiligran,
					ClassificationDefinitions.Nadbeton,
					ClassificationDefinitions.StropPrefabrykowany,
					ClassificationDefinitions.StropPref,
					ClassificationDefinitions.StropPrefHc,
					ClassificationDefinitions.StropSprezony,
					ClassificationDefinitions.Kompensacja,
					ClassificationDefinitions.StropTransferowy,
					ClassificationDefinitions.Glowica,
					ClassificationDefinitions.PlytaRampy,
					ClassificationDefinitions.RampaProsta,
					ClassificationDefinitions.RampaSpiralna,
					ClassificationDefinitions.StropNaGruncie,
					ClassificationDefinitions.StropPochyly,
					ClassificationDefinitions.StropHC,
				],
				specyfic: {},
			},
		},
		{
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
		{
			name: 'Inne',
			parameters: {
				volume: sum,
				running_meter: sum,
			},
			conditions: {
				keys: [
					/*VCF*/
					ClassificationDefinitions.BeamKeyway,
					/*METODOLOGIA KLASYFIKACJA*/
					ClassificationDefinitions.Attyka,
					ClassificationDefinitions.Acroterion,
					ClassificationDefinitions.SchodyMonolityczne,
					ClassificationDefinitions.SchodyPrefabrykowane,
					ClassificationDefinitions.Spocznik,
					ClassificationDefinitions.BiegSchodowyPref,
					ClassificationDefinitions.Podwalina,
					ClassificationDefinitions.PodwalinaPref,
					ClassificationDefinitions.CokolSlupaPref,
					ClassificationDefinitions.TrzpienZelbetowy,
					ClassificationDefinitions.Wyburzenia,
					ClassificationDefinitions.RusztMonolityczny,
				],
				specyfic: {},
			},
		},
	],
};
