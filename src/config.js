export const config = {
	// api_url: "http://10.104.0.128:2000",
	api_url: 'http://bim.warbud.pl/bim_apps/api',
	bim_apps_api: {
		// url: "http://10.104.0.128:2000",
		url: 'http://bim.warbud.pl/bim_apps/api',
		// graphql: "http://10.104.0.128:2000/graphql",
		graphql: 'http://bim.warbud.pl/bim_apps/api/graphql',
	},
	accountId: 'b.2012a172-f733-426d-847e-b62dda511dcb',
	units: {
		area: {
			color_map: {
				1: { color: '#C9C9C9', option: '%=0', condition: (x) => x === 0 },
				2: {
					color: '#FF0000',
					option: '0>%>25',
					condition: (x) => x > 0 && x < 25,
				},
				3: {
					color: '#FFFF00',
					option: '25>=%>50',
					condition: (x) => x >= 25 && x < 50,
				},
				4: {
					color: '#00b0fa',
					option: '50>=%>75',
					condition: (x) => x >= 50 && x < 75,
				},
				5: {
					color: '#6f30a0',
					option: '75>=%>100',
					condition: (x) => x >= 75 && x < 100,
				},
				6: { color: '#00B050', option: '%=100', condition: (x) => x === 100 },
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
};
