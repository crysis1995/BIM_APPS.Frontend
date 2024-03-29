import { ITranslation } from '../ITranslation';

const translation: ITranslation = {
	/*
	 * 	terms
	 * */
	REAL_START: 'Rzeczywista data rozpoczęcia',
	REAL_FINISH: 'Rzeczywista data zakończenia',
	PLANNED_START_BP: 'Planowana data rozpoczęcia',
	PLANNED_FINISH_BP: 'Data planowanego rozpoczęcia wg. PB',
	PLANNED_START: 'Data planowanego zakończenia wg. PB',
	PLANNED_FINISH: 'Planowana data zakończenia',

	carpenter: 'Cieśle',
	general_construction: 'Pracownik ogólnobudowlany',
	steel_fixer: 'Zbrojarze',
	additional: 'Prace dodatkowe',
	helper: 'Prace pomocnicze',
	elements: 'Elementy modelu',
	button_base_plan: 'Plan Bazowy',
	button_actual_plan: 'Realizacja',
	button_historic_plan: 'Historia',
	button_term_plan: 'Terminy',
	button_delay: 'Opóźnienia',
	button_delay_list: 'Lista opóźnień',
	button_delay_creator: 'Raportowanie opóźnień',
	tooltip_show_base_plan: 'Pokaż plan bazowy',
	tooltip_show_actual: 'Pokaż stan rzeczywisty',
	tooltip_show_historic_plan: 'Pokaż dane dotyczące historię realizacji obiektu',
	tooltip_show_terms_plan: 'Pokaż terminy',
	tooltip_show_delay: 'Pokaż widok raportowania powodów opóźnień',

	monolithic_tab_current: '',
	monolithic_tab_delay_create: '',
	monolithic_tab_delay_list: '',
	monolithic_tab_terms: '',
	monolithic_tab_scheduled: '',
	monolithic_tab_historical: '',

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
	'Strop monolityczny': 'Strop Monolityczny',
	'Strop filigran': 'Strop filigran',
	Nadbeton: 'Nadbeton',
	'Strop prefabrykowany': 'Strop prefabrykowany',
	'Strop pref.': 'Strop pref.',
	'Strop pref. HC': 'Strop pref. HC',
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

	wall: 'Ściana',
	column: 'Słup',
	beam: 'Belka',
	foundation: 'Fundament',
	floor: 'Strop',
	other: 'Inny',

	area: 'Powierzchnia',
	volume: 'Objętość',
	running_meter: 'Metry bieżące',

	wp_statuses_current: 'Zaplanowany',
	wp_statuses_planned: 'Planowany',
	wp_statuses_delayed: 'Opóźniony',
	wp_statuses_finished: 'Zakończony',
	wp_statuses_in_progress: 'W trakcie',
	wp_statuses_none: 'Brak',

	in_progress: 'W trakcie',
	finished: 'Zakończono',
	approved: 'Zaakceptowano',
	created: 'Wytworzono',
	mounted: 'Zamontowano',
	wp_statuses_approved: 'Zaakceptowany',
	wp_statuses_created: 'Wytworzony',
	wp_statuses_mounted: 'Zamontowany',
};

export default translation;
