import { WORKERS_LOG__WORKERS_TYPE } from '../../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';

export type LabourInputFormParametersType = {
	[key in WORKERS_LOG__WORKERS_TYPE]: ElementWorkType[];
};

export interface ElementWorkType {
	type: ElementType;
	parameters: ParameterDescription[];
}

export enum ElementType {
	Foundation = 'foundation',
	Wall = 'wall',
	Column = 'column',
	Floor = 'floor',
	Beam = 'beam',
	Stairs = 'stairs',
	Prefab = 'prefab',
	HelpWork = 'helpWork',
	OtherWorks = 'otherWorks',
}

export enum ParameterType {
	Element = 'element',
	BasicDescription = 'basic_description',
	AdditionalDescription = 'additional_description',
	CharacteristicParameters = 'characteristic_parameters',
	TimeInput = 'time_input',
}

export enum CharacteristicParametersChild {
	Height = 'height',
	Character = 'character',
	Finishing = 'finishing',
	Level = 'level',
	Difficulty = 'difficulty',
	Diameter = 'diameter',
}

export const PL_translations: { [key in ElementType | ParameterType | CharacteristicParametersChild]: string } = {
	[ElementType.Wall]: 'Ściany',
	[ElementType.Foundation]: 'Fundamenty',
	[ElementType.Column]: 'Słupy żelbetowe',
	[ElementType.Floor]: 'Stropy żelbetowe',
	[ElementType.Stairs]: 'Schody żelbetowe - monolityczne',
	[ElementType.Prefab]: 'Elemnety prefabrykowane',
	[ElementType.HelpWork]: 'Prace pomocnicze [BHP, Poprawki, Pielegnacja, Rozładunek, Sprzątanie]',
	[ElementType.OtherWorks]: 'Prace dodatkowe',
	[ElementType.Beam]: 'Belki żelbetowe - monolityczne',
	[ParameterType.AdditionalDescription]: 'Opis dodatkowy',
	[ParameterType.BasicDescription]: 'Opis podstawowy',
	[ParameterType.Element]: 'Element',
	[ParameterType.CharacteristicParameters]: 'Parametry charakterystyczne',
	[ParameterType.TimeInput]: 'Nakład pracy [w godzinach]',
	[CharacteristicParametersChild.Level]: 'Kondygnacja',
	[CharacteristicParametersChild.Diameter]: 'Średnica',
	[CharacteristicParametersChild.Difficulty]: 'Stopień trudności',
	[CharacteristicParametersChild.Character]: 'Specyfika',
	[CharacteristicParametersChild.Finishing]: 'Wykończenie',
	[CharacteristicParametersChild.Height]: 'Wysokość',
};

export interface ParameterDescription {
	id: ParameterType;
	options?: string[];
	childParameter?: ChildParameterDescription[];
}

export interface ChildParameterDescription {
	id: CharacteristicParametersChild;
	options?: string[];
}

export const LabourInputFormParameters: LabourInputFormParametersType = {
	[WORKERS_LOG__WORKERS_TYPE.CARPENTER]: [
		{
			type: ElementType.Foundation,
			parameters: [
				{
					id: ParameterType.Element,
					options: ['Szalowanie Płyt', 'Szalowanie Stóp', 'Szalowanie Ław', 'Szalowanie Stóp i Ław'],
				},
				{
					id: ParameterType.CharacteristicParameters,
					childParameter: [
						{ id: CharacteristicParametersChild.Height },
						{
							id: CharacteristicParametersChild.Character,
							options: [
								'zwykłe',
								'w obudowie ścian szczelinowej',
								'schodkowe (ew. dla stóp i ław)',
								'inne',
							],
						},
						{ id: CharacteristicParametersChild.Level },
					],
				},
				{
					id: ParameterType.TimeInput,
				},
			],
		},
		{
			type: ElementType.Wall,
			parameters: [
				{
					id: ParameterType.Element,
					options: [
						'Szalowanie - ściany wewn/zewn',
						'Szalowanie - podstropowa',
						'Szalowanie - attyki',
						'Szalowanie - oporowa',
					],
				},
				{
					id: ParameterType.BasicDescription,
					options: [
						'Szalunek ramowy',
						'Szalunek dźwigarkowy',
						'Szalunek ramowy z wykorzystaniem acs/rcs/scp',
						'Szalunek z wykorzystaniem kozłów oporowych',
						'Szalunek inny',
					],
				},
				{
					id: ParameterType.CharacteristicParameters,
					childParameter: [
						{ id: CharacteristicParametersChild.Height },
						{
							id: CharacteristicParametersChild.Character,
							options: ['prosta', 'łukowa', 'pochyła', 'inna'],
						},
						{
							id: CharacteristicParametersChild.Finishing,
							options: ['zwykły', 'architektoniczny', 'inny'],
						},
						{ id: CharacteristicParametersChild.Level },
					],
				},
				{
					id: ParameterType.TimeInput,
				},
			],
		},
		{
			type: ElementType.Column,
			parameters: [
				{
					id: ParameterType.Element,
					options: [
						'Szalowanie - zwykłe',
						'Szalowanie - podstropowo',
						'Szalowanie - rdzenie',
						'Szalowanie - słupki pod urządzenia/el arch.',
					],
				},
				{
					id: ParameterType.BasicDescription,
					options: [
						'Szalunek ramowy',
						'Szalunek dźwigarkowy',
						'Szalunek słupowy',
						'Szalunek monotuba',
						'Szalunek inny',
					],
				},
				{
					id: ParameterType.CharacteristicParameters,
					childParameter: [
						{ id: CharacteristicParametersChild.Height },
						{
							id: CharacteristicParametersChild.Character,
							options: ['prostokątny', 'okrągły', 'nieregularny', 'pochyły', 'rozgałęziony', 'inny'],
						},
						{
							id: CharacteristicParametersChild.Finishing,
							options: ['zwykły', 'architektoniczny', 'inny'],
						},
						{ id: CharacteristicParametersChild.Level },
					],
				},
				{
					id: ParameterType.TimeInput,
				},
			],
		},
		{
			type: ElementType.Floor,
			parameters: [
				{
					id: ParameterType.Element,
					options: [
						'Szalowanie - stropy',
						'Szalowanie - głowice',
						'Szalowanie - rampa',
						'Szalowanie - płytowo żebrowy (szal. cała pow pod belki)',
					],
				},
				{
					id: ParameterType.BasicDescription,
					options: [
						'Szalunek dżwigarkowy',
						'Szalunek stolikowy',
						'Szalunek na wieżach',
						'Szalunek na gruncie',
						'Szalunek ramowyy',
						'Szalunek inny',
					],
				},
				{
					id: ParameterType.CharacteristicParameters,
					childParameter: [
						{ id: CharacteristicParametersChild.Height },
						{
							id: CharacteristicParametersChild.Character,
							options: ['zwykły', 'trudny', 'gruby (>=40cm)', 'skośny (nachylenie >= 20 stopni)', 'inny'],
						},
						{
							id: CharacteristicParametersChild.Finishing,
							options: ['zwykły', 'architektoniczny', 'inny'],
						},
						{ id: CharacteristicParametersChild.Level },
					],
				},
				{
					id: ParameterType.TimeInput,
				},
			],
		},
		{
			type: ElementType.Beam,
			parameters: [
				{
					id: ParameterType.Element,
					options: [
						'Szalowanie - podciąg',
						'Szalowanie - nadciąg/uskok',
						'Szalowanie - belki pref na budowie + gniazda',
						'Szalowanie - żebra stropu płytowo żebrowego (zaszalowany spód belek)',
						'Szalowanie - podwaliny',
					],
				},
				{
					id: ParameterType.BasicDescription,
					options: [
						'Szalunek dżwigarkowy',
						'Szalunek stolikowy',
						'Szalunek na wieżach',
						'Szalunek na gruncie',
						'Szalunek inny',
					],
				},
				{
					id: ParameterType.CharacteristicParameters,
					childParameter: [
						{ id: CharacteristicParametersChild.Height },
						{
							id: CharacteristicParametersChild.Character,
							options: [
								'prosta wys do 1m',
								'łukowa wys do 1m',
								'prosta wys 1 do 2m',
								'łukowa wys 1 do 2m',
								'inna',
							],
						},
						{
							id: CharacteristicParametersChild.Finishing,
							options: ['zwykły', 'architektoniczny', 'inny'],
						},
						{ id: CharacteristicParametersChild.Level },
					],
				},
				{
					id: ParameterType.TimeInput,
				},
			],
		},
		{
			type: ElementType.Stairs,
			parameters: [
				{
					id: ParameterType.Element,
					options: ['Szalowanie - spoczniki', 'Szalowanie - biegi', 'Szalowanie - spoczniki i biegi'],
				},
				{
					id: ParameterType.BasicDescription,
					options: ['dźwigarkowy', 'na wieżach', 'na gruncie', 'inny'],
				},
				{
					id: ParameterType.CharacteristicParameters,
					childParameter: [
						{ id: CharacteristicParametersChild.Height },
						{
							id: CharacteristicParametersChild.Character,
							options: ['zwykłe', 'trudne'],
						},
						{
							id: CharacteristicParametersChild.Finishing,
							options: ['zwykły', 'architektoniczny', 'inny'],
						},
						{ id: CharacteristicParametersChild.Level },
					],
				},
				{
					id: ParameterType.TimeInput,
				},
			],
		},
		{
			type: ElementType.Prefab,
			parameters: [
				{
					id: ParameterType.Element,
					options: [
						'Belki',
						'Biegi',
						'Spoczniki',
						'Płyty filigran',
						'Płyty kanałowe',
						'Płyty balkony',
						'Płyty inne',
						'Nadproża',
						'Głowice',
						'Inne elementy',
						'Słupy',
						'Ściany',
					],
				},
				{
					id: ParameterType.CharacteristicParameters,
					childParameter: [
						{ id: CharacteristicParametersChild.Height },
						{ id: CharacteristicParametersChild.Level },
					],
				},
				{
					id: ParameterType.TimeInput,
				},
			],
		},
		{
			type: ElementType.HelpWork,
			parameters: [
				{
					id: ParameterType.Element,
					options: [
						'BHP (ogólne budowy)',
						'Sprzątanie',
						'Poprawki + Pielęgnacja',
						'Rozładunek',
						'Czyszczenie i zdawanie',
					],
				},
				{
					id: ParameterType.TimeInput,
				},
			],
		},
		{
			type: ElementType.OtherWorks,
			parameters: [
				{
					id: ParameterType.Element,
					options: [
						'Zmiany projektowe',
						'Odśnieżanie/odladzanie/zabezpieczanie ze względu na pogodę',
						'Przestój',
						'Roboty Dodatkowe',
						'Pierwomontaż/demontaż',
					],
				},
				{
					id: ParameterType.TimeInput,
				},
			],
		},
	],
	[WORKERS_LOG__WORKERS_TYPE.STEEL_FIXER]: [],
	[WORKERS_LOG__WORKERS_TYPE.GENERAL_CONSTRUCTION]: [],
};
