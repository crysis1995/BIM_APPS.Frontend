import { Color } from '../../../config';

export namespace Constants {
	export enum MonolithicTabs {
		SCHEDULED = 'monolithic_tab_scheduled',
		CURRENT = 'monolithic_tab_current',
		HISTORICAL = 'monolithic_tab_historical',
		TERMS = 'monolithic_tab_terms',
		DELAY_LIST = 'monolithic_tab_delay_list',
		DELAY_CREATE = 'monolithic_tab_delay_create',
	}
	export enum AcceptanceType {
		MONOLITHIC = 'monolithic',
		PREFABRICATED = 'prefabricated',
		GENERAL_CONSTRUCTION = 'general_construction'
	}
	export enum ClassificationDefinitions {
		/*VCG REALISATION*/
		ExternalWall = 'External wall',
		Pilaster = 'Pilaster',
		Pillar = 'Pillar',
		HighColumn = 'High column',
		CircularColumn = 'Circular column',
		KeelDrag = 'Keel drag',
		HollowCoreSlab = 'Hollow core slab',
		InternalWall = 'Internal wall',
		Acroterion = 'Acroterion',
		CastInSituBeam = 'Cast in situ beam',
		OneSideWall = 'One side wall',
		CastInSituSlab = 'Cast in situ slab',
		FoundationWall = 'Foundation wall',
		CurveWall = 'Curve wall',
		RectangularColumn = 'Rectangular column',
		HeadOfPile = 'Head of pile',
		BeamKeyway = 'Beam keyway',
		ParticularBeam = 'Particular beam',
		RectangularHighColumn = 'Rectangular high column',
		Ramp = 'Ramp',
		Raft = 'Raft',
		SpecificColumn = 'Specific column',
		HighWall = 'High wall',
		Stairs = 'Stairs',
		ConsoleCourte = 'Console courte',
		FormedStripFooting = 'Formed strip footing',
		IndividualFooting = 'Individual footing',
		UpstandBeam = 'Upstand beam',

		/*Strop*/
		StropMonolityczny = 'Strop monolityczny',
		StropFiligran = 'Strop filigran',
		Nadbeton = 'Nadbeton',
		StropPrefabrykowany = 'Strop prefabrykowany',
		StropPref = 'Strop pref.',
		StropPrefHc = 'Strop pref. HC',
		StropSprezony = 'Strop sprezony',
		Kompensacja = 'Kompensacja',
		StropTransferowy = 'Strop transferowy',
		Glowica = 'Glowica',
		PlytaRampy = 'Plyta rampy',
		RampaProsta = 'Rampa prosta',
		RampaSpiralna = 'Rampa spiralna',
		StropNaGruncie = 'Strop na gruncie',
		StropPochyly = 'Strop pochyly',
		StropHC = 'Strop HC',
		/*Ściany*/
		ScianaMonolityczna = 'Sciana monolityczna',
		ScianaZewnetrzna = 'Sciana zewnetrzna',
		ScianaWewnetrzna = 'Sciana wewnetrzna',
		ScianaWysoka = 'Sciana wysoka',
		ScianaPrefabrykowana = 'Sciana prefabrykowana',
		ScianaPref = 'Sciana pref.',
		ScianaOporowa = 'Sciana oporowa',
		ScianaDociskowa = 'Sciana dociskowa',
		ScianaLukowa = 'Sciana lukowa',
		ScianaFundamentowa = 'Sciana fundamentowa',
		ScianaBetArch = 'Sciana bet arch',
		ScianaAkustyczna = 'Sciana akustyczna',
		ScianaMurowana = 'Sciana murowana',
		ScianaSzczelinowa = 'Sciana szczelinowa',
		ScianaPodstropowa = 'Sciana podstropowa ',
		ScianaWSystemieScp = 'Sciana w systemie scp',
		ScianaSzybuWindowego = 'Sciana szybu windowego',
		SciankaFundamentowa = 'Scianka fundamentowa',
		Filar = 'Filar',
		ScianyPrzeglebienia = 'Sciany przeglebienia',
		/*slupy*/
		SlupProstokatny = 'Slup prostokatny',
		SlupOkragly = 'Slup okragly',
		SlupWysoki = 'Slup wysoki',
		SlupWysokiProstokatny = 'Slup wysoki prostokatny',
		SlupWysokiOkragly = 'Slup wysoki okragly',
		SlupPrefabrykowany = 'Slup prefabrykowany',
		SlupPref = 'Slup pref.',
		SlupSkosny = 'Slup skosny',
		SlupSpecyficzny = 'Slup specyficzny',
		SlupPodstropowy = 'Slup podstropowy',
		/*Fundamenty*/
		StopaFundamentowa = 'Stopa fundamentowa',
		LawaFundamentowa = 'Lawa fundamentowa',
		PlytaFundamentowa = 'Plyta fundamentowa',
		PosadzkaBetonowa = 'Posadzka betonowa',
		Posadzka = 'Posadzka',
		ChudyBeton = 'Chudy beton',
		Barety = 'Barety',
		FundamentyPodUrzadzenia = 'Fundamenty pod urzadzenia',
		UskokLawy = 'Uskok lawy',
		LawaPochyla = 'Lawa pochyla',
		Fundament = 'Fundament',
		/*belki*/
		BelkaMonolityczna = 'Belka monolityczna',
		BelkaPrefabrykowana = 'Belka prefabrykowana',
		BelkaPref = 'Belka pref.',
		BelkaObwodowa = 'Belka obwodowa',
		BelkaObwodowaPref = 'Belka obwodowa pref.',
		BelkaKrawedziowa = 'Belka krawedziowa',
		BelkaKrawedziowaPref = 'Belka krawedziowa pref.',
		Nadciag = 'Nadciag',
		Podciag = 'Podciag',
		Wieniec = 'Wieniec',
		/*Inne*/
		Attyka = 'Attyka',
		SchodyMonolityczne = 'Schody monolityczne',
		SchodyPrefabrykowane = 'Schody prefabrykowane',
		Spocznik = 'Spocznik',
		BiegSchodowyPref = 'Bieg schodowy pref.',
		Podwalina = 'Podwalina',
		PodwalinaPref = 'Podwalina pref.',
		CokolSlupaPref = 'Cokol slupa pref.',
		TrzpienZelbetowy = 'Trzpien zelbetowy',
		Wyburzenia = 'Wyburzenia',
		RusztMonolityczny = 'Ruszt monolityczny',
	}

	export enum TermTypes {
		REAL_START = 'REAL_START',
		PLANNED_START_BP = 'PLANNED_START_BP',
		PLANNED_FINISH_BP = 'PLANNED_FINISH_BP',
		PLANNED_START = 'PLANNED_START',
		PLANNED_FINISH = 'PLANNED_FINISH',
		REAL_FINISH = 'REAL_FINISH',
	}

	export enum WorkProgressElementStatus {
		Finished = 'wp_statuses_finished',
		InProgress = 'wp_statuses_in_progress',
		Planned = 'wp_statuses_planned',
		Delayed = 'wp_statuses_delayed',
		None = 'wp_statuses_none',
		Current = 'wp_statuses_current',
	}

	export type WorkProgressMonolithicStatusLegendType = {
		[key in MonolithicTabs]?: {
			[key in WorkProgressElementStatus]?: {
				color: string;
				alpha: number;
			};
		};
	};

	export const WorkProgressMonolithicColorMap: WorkProgressMonolithicStatusLegendType = {
		[MonolithicTabs.CURRENT]: {
			[WorkProgressElementStatus.Current]: { color: '#FFCC1B', alpha: 0.7 },
			[WorkProgressElementStatus.InProgress]: { color: '#009b03', alpha: 0.7 },
			[WorkProgressElementStatus.Delayed]: { color: '#EF233C', alpha: 0.7 },
			[WorkProgressElementStatus.Finished]: { color: '#172ce0', alpha: 0.7 },
			[WorkProgressElementStatus.None]: { color: '#848484', alpha: 0.7 },
		},
		[MonolithicTabs.SCHEDULED]: {
			[WorkProgressElementStatus.Planned]: { color: '#FFCC1B', alpha: 0.7 },
			[WorkProgressElementStatus.Finished]: { color: '#858585', alpha: 0.9 },
			[WorkProgressElementStatus.None]: { color: '#2f2f2f', alpha: 0.9 },
		},
		[MonolithicTabs.HISTORICAL]: {
			[WorkProgressElementStatus.Finished]: { color: '#494949', alpha: 0.7 },
			[WorkProgressElementStatus.InProgress]: { color: '#009b03', alpha: 0.7 },
		},
	};

	export type WorkProgressGeneralConstructionStatusLegendType = {
		[key in WorkProgressElementStatus]?: {
			color: string;
			alpha: number;
		};
	};

	export const WorkProgressGeneralConstructionColorMap: WorkProgressGeneralConstructionStatusLegendType = {
		[WorkProgressElementStatus.InProgress]: { color: Color.Yellow, alpha: 0.8 },
		[WorkProgressElementStatus.Finished]: { color: Color.Blue, alpha: 0.8 },
	};

	export type WorkProgressPrefabricatedStatusLegendType = {
		[key in WorkProgressPrefabricatedElementStatus]: {
			color: string;
			alpha: number;
		};
	};
	export enum WorkProgressPrefabricatedElementStatus {
		Approved = 'wp_statuses_approved',
		Created = 'wp_statuses_created',
		Mounted = 'wp_statuses_mounted',
		None = 'wp_statuses_none',
	}

	export const WorkProgressPrefabricatedColorMap: WorkProgressPrefabricatedStatusLegendType = {
		[WorkProgressPrefabricatedElementStatus.Mounted]: { color: '#009b03', alpha: 0.7 },
		[WorkProgressPrefabricatedElementStatus.Created]: { color: '#FFCC1B', alpha: 0.7 },
		[WorkProgressPrefabricatedElementStatus.Approved]: { color: '#172ce0', alpha: 0.7 },
		[WorkProgressPrefabricatedElementStatus.None]: { color: '#848484', alpha: 0.7 },
	};
}
