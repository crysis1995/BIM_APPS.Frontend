const DEV_URI = 'http://localhost:2000';
const PROD_URI = 'http://bim.warbud.pl';

export const config = {
	// api_url: "http://localhost:2000",
	api_url: PROD_URI,
	bim_apps_api: {
		url: process.env.NODE_ENV === 'development' ? DEV_URI : PROD_URI + '/bim_apps/api',
		graphql: process.env.NODE_ENV === 'development' ? DEV_URI + '/graphql' : PROD_URI + '/bim_apps/api/graphql',
	},
	// units: {
	// 	area: {
	// 		color_map: {
	// 			1: { color: '#c9c9c9', option: '%=0', condition: (x: number) => x === 0 },
	// 			2: {
	// 				color: '#ff0000',
	// 				option: '0>%>25',
	// 				condition: (x: number) => x > 0 && x < 0.25,
	// 			},
	// 			3: {
	// 				color: '#ffff00',
	// 				option: '25>=%>50',
	// 				condition: (x: number) => x >= 0.25 && x < 0.5,
	// 			},
	// 			4: {
	// 				color: '#00b0fa',
	// 				option: '50>=%>75',
	// 				condition: (x: number) => x >= 0.5 && x < 0.75,
	// 			},
	// 			5: {
	// 				color: '#6f30a0',
	// 				option: '75>=%>100',
	// 				condition: (x: number) => x >= 0.75 && x < 1,
	// 			},
	// 			6: { color: '#00B050', option: '%=100', condition: (x: number) => x === 1 },
	// 		},
	// 	},
	// 	entity: {
	// 		color_map: {
	// 			1: { color: '#C9C9C9', option: 'Brak' },
	// 			2: { color: '#FF0000', option: 'Nie rozpoczęte' },
	// 			3: { color: '#FFFF00', option: 'W trakcie' },
	// 			4: { color: '#00B050', option: 'Ukończone' },
	// 		},
	// 	},
	// },
	ACCEPTANCE: {
		MONOLITHIC: {
			legend: {
				active: { color: '#FFCC1B', alpha: 0.7, option: 'Bieżący' },
				finished: { color: '#858585', alpha: 0.9, option: 'Zakończony' },
				finished_historical: { color: '#009b03', alpha: 0.9, option: 'Zakończony / Dzień' },
				finished_earlier: { color: '#3A86FF', alpha: 0.9, option: 'Zakończony przed czasem' },
				delayed: { color: '#EF233C', alpha: 0.7, option: 'Opóźniony' },
				out_of: { color: '#efefef', alpha: 0.85, option: 'Poza zakresem' },
				inactive: { color: '#efefef', alpha: 0.7, option: 'Nieaktywny' },
				future: { color: '#bababa', alpha: 0.9, option: 'Element planowane' },
			},
		},
	},
};

export enum MonolithicStatuses {
	Active = 'active',
	Finished = 'finished',
	FinishedHistorical = 'finished_historical',
	FinishedEarlier = 'finished_earlier',
	Delayed = 'delayed',
	OutOf = 'out_of',
	Inactive = 'inactive',
	Future = 'future',
	InProgress = 'in_progress',
}

export type MonolithicViewerLegendType = {
	[key in MonolithicStatuses]: {
		color: string;
		alpha: number;
		option: string;
	};
};
export const MonolithicViewerLegend: MonolithicViewerLegendType = {
	active: { color: '#FFCC1B', alpha: 0.7, option: 'Bieżący' },
	finished: { color: '#858585', alpha: 0.9, option: 'Zakończony' },
	finished_historical: { color: '#009b03', alpha: 0.9, option: 'Zakończony / Dzień' },
	finished_earlier: { color: '#3A86FF', alpha: 0.9, option: 'Zakończony przed czasem' },
	delayed: { color: '#EF233C', alpha: 0.7, option: 'Opóźniony' },
	out_of: { color: '#efefef', alpha: 0.85, option: 'Poza zakresem' },
	inactive: { color: '#efefef', alpha: 0.7, option: 'Nieaktywny' },
	future: { color: '#bababa', alpha: 0.9, option: 'Element planowane' },
	in_progress: { color: '#1b82ff', alpha: 0.7, option: 'W trakcie' },
};

export enum Color {
	Yellow = '#FFCC1B',
	Green = '#009b03',
	Blue = '#3A86FF',
	Red = '#EF233C',
	BrightGrey = '#efefef',
	Grey = '#bababa',
	DarkGrey = '#858585',
}

export enum TOOLTIPS_MESSAGES {
	TooltipShowBasePlan = 'tooltip_show_base_plan',
	TooltipShowActualPlan = 'tooltip_show_actual',
	TooltipShowHistoricPlan = 'tooltip_show_historic_plan',
	TooltipShowTermsPlan = 'tooltip_show_terms_plan',
	TooltipShowDelay = 'tooltip_show_delay',
}

export enum ELEMENT_DESCRIPTIONS {
	ButtonBasePlan = 'button_base_plan',
	ButtonActualPlan = 'button_actual_plan',
	ButtonHistoricPlan = 'button_historic_plan',
	ButtonTermPlan = 'button_term_plan',
	ButtonDelayList = 'button_delay_list',
	ButtonDelay = 'button_delay',
	ButtonDelayCreator = 'button_delay_creator',
}
