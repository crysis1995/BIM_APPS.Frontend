export const config = {
	// api_url: "http://localhost:2000",
	api_url: 'http://bim.warbud.pl',
	bim_apps_api: {
		// url: 'http://localhost:2000',
		url: 'http://bim.warbud.pl/bim_apps/api',
		// graphql: 'http://localhost:2000/graphql',
		graphql: 'http://bim.warbud.pl/bim_apps/api/graphql',
	},
	accountId: 'b.2012a172-f733-426d-847e-b62dda511dcb',
	units: {
		area: {
			color_map: {
				1: { color: '#c9c9c9', option: '%=0', condition: (x) => x === 0 },
				2: {
					color: '#ff0000',
					option: '0>%>25',
					condition: (x) => x > 0 && x < 0.25,
				},
				3: {
					color: '#ffff00',
					option: '25>=%>50',
					condition: (x) => x >= 0.25 && x < 0.5,
				},
				4: {
					color: '#00b0fa',
					option: '50>=%>75',
					condition: (x) => x >= 0.5 && x < 0.75,
				},
				5: {
					color: '#6f30a0',
					option: '75>=%>100',
					condition: (x) => x >= 0.75 && x < 1,
				},
				6: { color: '#00B050', option: '%=100', condition: (x) => x === 1 },
			},
		},
		entity: {
			color_map: {
				1: { color: '#C9C9C9', option: 'Brak' },
				2: { color: '#FF0000', option: 'Nie rozpoczęte' },
				3: { color: '#FFFF00', option: 'W trakcie' },
				4: { color: '#00B050', option: 'Ukończone' },
			},
		},
	},
	ACCEPTANCE: {
		MONOLITHIC: {
			legend: {
				active: { color: '#FFCC1B', alpha: 0.7, option: 'Bieżący' },
				finished: { color: '#858585', alpha: 0.9, option: 'Zakończony' },
				finished_earlier: { color: '#3A86FF', alpha: 0.9, option: 'Zakończony przed czasem' },
				delayed: { color: '#EF233C', alpha: 0.7, option: 'Opóźniony' },
				out_of: { color: '#efefef', alpha: 0.85, option: 'Poza zakresem' },
				inactive: { color: '#efefef', alpha: 0.7, option: 'Nieaktywny' },
				future: { color: '#bababa', alpha: 0.9, option: 'Element planowane' },
			},
		},
	},
};
