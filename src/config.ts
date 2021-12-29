const DEV_URI = 'http://localhost:2000';
const DEV_URI2 = 'http://localhost:5000';
const PROD_URI = 'http://bim.warbud.pl';

export const config = {
	api_url: PROD_URI,
	bim_apps_api: {
		// url: process.env.NODE_ENV === 'development' ? DEV_URI : PROD_URI + '/bim_apps/api',
		url: DEV_URI,
		// graphql: process.env.NODE_ENV === 'development' ? DEV_URI + '/graphql' : PROD_URI + '/bim_apps/api/graphql',
		graphql: DEV_URI + '/graphql',
		// graphql2: process.env.NODE_ENV === 'development' ? DEV_URI2 + '/graphql/' : PROD_URI + '/bim_apps/api/graphql',
		graphql2: DEV_URI2 + '/graphql/',
	},

	ACCEPTANCE: {
		MONOLITHIC: {
			legend: {
				active: { color: '#FFCC1B', alpha: 0.7, option: 'Bieżący' },
				finished: { color: '#858585', alpha: 0.9, option: 'Zakończony' },
				finished_historical: { color: '#009b03', alpha: 0.9, option: 'Zakończony / Dzień' },
				finished_earlier: {
					color: '#3A86FF',
					alpha: 0.9,
					option: 'Zakończony przed czasem',
				},
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
