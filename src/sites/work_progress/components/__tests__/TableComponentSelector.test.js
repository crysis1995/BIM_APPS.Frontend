import { splitJobsByKey, genSingleSelectionFilteredJobs } from '../TableComponentSelector';

const objects = {
	results: {
		'1': {
			summary_all_value: 9146.27,
			summary_current_value: 298.75,
			percentage_value: 3.26,
			elements: {
				'1104476': 0.4,
				'1104503': 0.5,
				'3510928': 0.6,
			},
		},
		'2': {
			summary_all_value: 21228.33,
			summary_current_value: 5.03,
			percentage_value: 0.02,
			elements: {
				'1104503': 0.1,
			},
		},
		'3': {
			summary_all_value: 4395.12,
			summary_current_value: 215.24,
			percentage_value: 4.89,
			elements: {
				'1104503': 0.5,
				'3510928': 0.9,
			},
		},
		'4': {
			summary_all_value: 3447.67,
			summary_current_value: 0,
			percentage_value: 0,
			elements: {},
		},
		'5': {
			summary_all_value: 21404.11,
			summary_current_value: 40.24,
			percentage_value: 0.18,
			elements: {
				'1104503': 0.8,
			},
		},
		'6': {
			summary_all_value: 0,
			summary_current_value: 0,
			percentage_value: null,
			elements: {},
		},
	},
	upgrading: {
		'1': {
			summary_value: {
				'1681704': 5.78,
				'1950062': 14.44,
			},
			particular_values: {
				'1681704': [2.89, 2.89],
				'1950062': [7.22, 7.22],
			},
			object_ids: {
				'1681704': ['26423', '26424'],
				'1950062': ['26811', '26812'],
			},
			reference_job: {
				'1681704': null,
				'1950062': null,
			},
			percentage_value: {
				'1681704': 0,
				'1950062': 0,
			},
			current_value: {
				'1681704': 0,
				'1950062': 0,
			},
		},
		'2': {
			summary_value: {
				'1681704': 43.11,
				'1950062': 42.69,
			},
			particular_values: {
				'1681704': [18.49, 6.74, 6.74, 5.68, 5.46],
				'1950062': [8.39, 7.96, 3.25, 10.64, 9.78, 1.92, 0.75],
			},
			object_ids: {
				'1681704': ['26416', '26417', '26418', '26419', '26422'],
				'1950062': ['26804', '26805', '26806', '26807', '26808', '26809', '26810'],
			},
			reference_job: {
				'1681704': null,
				'1950062': null,
			},
			percentage_value: {
				'1681704': 0,
				'1950062': 0,
			},
			current_value: {
				'1681704': 0,
				'1950062': 0,
			},
		},
		'3': {
			summary_value: {
				'1681704': 2.88,
				'1950062': 6.61,
			},
			particular_values: {
				'1681704': [2.88],
				'1950062': [6.61],
			},
			object_ids: {
				'1681704': ['26415'],
				'1950062': ['26803'],
			},
			reference_job: {
				'1681704': null,
				'1950062': null,
			},
			percentage_value: {
				'1681704': 0,
				'1950062': 0,
			},
			current_value: {
				'1681704': 0,
				'1950062': 0,
			},
		},
		'4': {
			summary_value: {},
			particular_values: {},
			object_ids: {},
			reference_job: {},
			percentage_value: {},
			current_value: {},
		},
		'5': {
			summary_value: {
				'1681704': 43.11,
				'1950062': 42.69,
			},
			particular_values: {
				'1681704': [18.49, 6.74, 6.74, 5.68, 5.46],
				'1950062': [8.39, 7.96, 3.25, 10.64, 9.78, 1.92, 0.75],
			},
			object_ids: {
				'1681704': ['26416', '26417', '26418', '26419', '26422'],
				'1950062': ['26804', '26805', '26806', '26807', '26808', '26809', '26810'],
			},
			reference_job: {
				'1681704': null,
				'1950062': null,
			},
			percentage_value: {
				'1681704': 0,
				'1950062': 0,
			},
			current_value: {
				'1681704': 0,
				'1950062': 0,
			},
		},
		'6': {
			summary_value: {},
			particular_values: {},
			object_ids: {},
			reference_job: {},
			percentage_value: {},
			current_value: {},
		},
	},
	jobs: {
		'1': {
			id: '1',
			name: 'malowanie stropów, słupów, ścian nad sufitem podwieszanym',
			unit: 'area',

			hidden: false,
		},
		'2': {
			id: '2',
			name: 'Otwarcie ścian GK',
			unit: null,

			hidden: false,
		},
		'3': {
			id: '3',
			name: 'Wykonanie podkładów betonowych',
			unit: null,

			hidden: false,
		},
		'4': {
			id: '4',
			name: 'Tynk - GK',
			unit: null,

			hidden: false,
		},
		'5': {
			id: '5',
			name: 'Zamknięcie ścian GK',
			unit: null,

			hidden: false,
		},
		'6': {
			id: '6',
			name: 'Montaż stolarki (ościeżnice)',
			unit: 'piece',

			hidden: true,
		},
	},
};

const expected = {
	equal: {
		'1': {
			id: '1',
			name: 'malowanie stropów, słupów, ścian nad sufitem podwieszanym',
			unit: 'area',

			hidden: false,
			results: {
				summary_all_value: 9146.27,
				summary_current_value: 298.75,
				percentage_value: 3.26,
				elements: {
					'1104476': 0.4,
					'1104503': 0.5,
					'3510928': 0.6,
				},
			},
			upgrading: {
				summary_value: {
					'1681704': 5.78,
					'1950062': 14.44,
				},
				particular_values: {
					'1681704': [2.89, 2.89],
					'1950062': [7.22, 7.22],
				},
				object_ids: {
					'1681704': ['26423', '26424'],
					'1950062': ['26811', '26812'],
				},
				reference_job: {
					'1681704': null,
					'1950062': null,
				},
				percentage_value: {
					'1681704': 0,
					'1950062': 0,
				},
				current_value: {
					'1681704': 0,
					'1950062': 0,
				},
			},
		},
		'2': {
			id: '2',
			name: 'Otwarcie ścian GK',
			unit: null,

			hidden: false,
			results: {
				summary_all_value: 21228.33,
				summary_current_value: 5.03,
				percentage_value: 0.02,
				elements: {
					'1104503': 0.1,
				},
			},
			upgrading: {
				summary_value: {
					'1681704': 43.11,
					'1950062': 42.69,
				},
				particular_values: {
					'1681704': [18.49, 6.74, 6.74, 5.68, 5.46],
					'1950062': [8.39, 7.96, 3.25, 10.64, 9.78, 1.92, 0.75],
				},
				object_ids: {
					'1681704': ['26416', '26417', '26418', '26419', '26422'],
					'1950062': ['26804', '26805', '26806', '26807', '26808', '26809', '26810'],
				},
				reference_job: {
					'1681704': null,
					'1950062': null,
				},
				percentage_value: {
					'1681704': 0,
					'1950062': 0,
				},
				current_value: {
					'1681704': 0,
					'1950062': 0,
				},
			},
		},
		'3': {
			id: '3',
			name: 'Wykonanie podkładów betonowych',
			unit: null,

			hidden: false,
			results: {
				summary_all_value: 4395.12,
				summary_current_value: 215.24,
				percentage_value: 4.89,
				elements: {
					'1104503': 0.5,
					'3510928': 0.9,
				},
			},
			upgrading: {
				summary_value: {
					'1681704': 2.88,
					'1950062': 6.61,
				},
				particular_values: {
					'1681704': [2.88],
					'1950062': [6.61],
				},
				object_ids: {
					'1681704': ['26415'],
					'1950062': ['26803'],
				},
				reference_job: {
					'1681704': null,
					'1950062': null,
				},
				percentage_value: {
					'1681704': 0,
					'1950062': 0,
				},
				current_value: {
					'1681704': 0,
					'1950062': 0,
				},
			},
		},
		'5': {
			id: '5',
			name: 'Zamknięcie ścian GK',
			unit: null,

			hidden: false,
			results: {
				summary_all_value: 21404.11,
				summary_current_value: 40.24,
				percentage_value: 0.18,
				elements: {
					'1104503': 0.8,
				},
			},
			upgrading: {
				summary_value: {
					'1681704': 43.11,
					'1950062': 42.69,
				},
				particular_values: {
					'1681704': [18.49, 6.74, 6.74, 5.68, 5.46],
					'1950062': [8.39, 7.96, 3.25, 10.64, 9.78, 1.92, 0.75],
				},
				object_ids: {
					'1681704': ['26416', '26417', '26418', '26419', '26422'],
					'1950062': ['26804', '26805', '26806', '26807', '26808', '26809', '26810'],
				},
				reference_job: {
					'1681704': null,
					'1950062': null,
				},
				percentage_value: {
					'1681704': 0,
					'1950062': 0,
				},
				current_value: {
					'1681704': 0,
					'1950062': 0,
				},
			},
		},
	},
	different: {
		'13': {
			id: '13',
			name: 'Montaż okładzin ściennych',
			unit: null,

			hidden: false,
			results: {
				summary_all_value: 296.66,
				summary_current_value: 0,
				percentage_value: 0,
				elements: {},
			},
			upgrading: {
				summary_value: {
					'1681704': 2.31,
				},
				particular_values: {
					'1681704': [1.45, 0.87],
				},
				object_ids: {
					'1681704': ['26420', '26421'],
				},
				reference_job: {
					'1681704': null,
				},
				percentage_value: {
					'1681704': 0,
				},
				current_value: {
					'1681704': 0,
				},
			},
		},
	},
};
const expected2 = {
	equal: {},
	different: {
		'1': {
			id: '1',
			name: 'malowanie stropów, słupów, ścian nad sufitem podwieszanym',
			unit: 'area',

			hidden: false,
			results: {
				summary_all_value: 9146.27,
				summary_current_value: 298.75,
				percentage_value: 3.26,
				elements: {
					'1104476': 0.4,
					'1104503': 0.5,
					'3510928': 0.6,
				},
			},
			upgrading: {
				summary_value: {
					'1681704': 5.78,
					'1950062': 14.44,
				},
				particular_values: {
					'1681704': [2.89, 2.89],
					'1950062': [7.22, 7.22],
				},
				object_ids: {
					'1681704': ['26423', '26424'],
					'1950062': ['26811', '26812'],
				},
				reference_job: {
					'1681704': null,
					'1950062': null,
				},
				percentage_value: {
					'1681704': 0,
					'1950062': 0,
				},
				current_value: {
					'1681704': 0,
					'1950062': 0,
				},
			},
		},
		'2': {
			id: '2',
			name: 'Otwarcie ścian GK',
			unit: null,

			hidden: false,
			results: {
				summary_all_value: 21228.33,
				summary_current_value: 5.03,
				percentage_value: 0.02,
				elements: {
					'1104503': 0.1,
				},
			},
			upgrading: {
				summary_value: {
					'1681704': 43.11,
					'1950062': 42.69,
				},
				particular_values: {
					'1681704': [18.49, 6.74, 6.74, 5.68, 5.46],
					'1950062': [8.39, 7.96, 3.25, 10.64, 9.78, 1.92, 0.75],
				},
				object_ids: {
					'1681704': ['26416', '26417', '26418', '26419', '26422'],
					'1950062': ['26804', '26805', '26806', '26807', '26808', '26809', '26810'],
				},
				reference_job: {
					'1681704': null,
					'1950062': null,
				},
				percentage_value: {
					'1681704': 0,
					'1950062': 0,
				},
				current_value: {
					'1681704': 0,
					'1950062': 0,
				},
			},
		},
		'3': {
			id: '3',
			name: 'Wykonanie podkładów betonowych',
			unit: null,

			hidden: false,
			results: {
				summary_all_value: 4395.12,
				summary_current_value: 215.24,
				percentage_value: 4.89,
				elements: {
					'1104503': 0.5,
					'3510928': 0.9,
				},
			},
			upgrading: {
				summary_value: {
					'1681704': 2.88,
					'1950062': 6.61,
				},
				particular_values: {
					'1681704': [2.88],
					'1950062': [6.61],
				},
				object_ids: {
					'1681704': ['26415'],
					'1950062': ['26803'],
				},
				reference_job: {
					'1681704': null,
					'1950062': null,
				},
				percentage_value: {
					'1681704': 0,
					'1950062': 0,
				},
				current_value: {
					'1681704': 0,
					'1950062': 0,
				},
			},
		},
		'5': {
			id: '5',
			name: 'Zamknięcie ścian GK',
			unit: null,

			hidden: false,
			results: {
				summary_all_value: 21404.11,
				summary_current_value: 40.24,
				percentage_value: 0.18,
				elements: {
					'1104503': 0.8,
				},
			},
			upgrading: {
				summary_value: {
					'1681704': 43.11,
					'1950062': 42.69,
				},
				particular_values: {
					'1681704': [18.49, 6.74, 6.74, 5.68, 5.46],
					'1950062': [8.39, 7.96, 3.25, 10.64, 9.78, 1.92, 0.75],
				},
				object_ids: {
					'1681704': ['26416', '26417', '26418', '26419', '26422'],
					'1950062': ['26804', '26805', '26806', '26807', '26808', '26809', '26810'],
				},
				reference_job: {
					'1681704': null,
					'1950062': null,
				},
				percentage_value: {
					'1681704': 0,
					'1950062': 0,
				},
				current_value: {
					'1681704': 0,
					'1950062': 0,
				},
			},
		},
		'7': {
			id: '7',
			name: 'Szpachlowanie i malowanie ( I warstwa)',
			unit: null,

			hidden: false,
			results: {
				summary_all_value: 24851.77,
				summary_current_value: 266.2,
				percentage_value: 1.07,
				elements: {
					'1104503': 0.9,
					'3510928': 1,
				},
			},
			upgrading: {
				summary_value: {
					'1681704': 43.11,
					'1950062': 42.69,
				},
				particular_values: {
					'1681704': [18.49, 6.74, 6.74, 5.68, 5.46],
					'1950062': [8.39, 7.96, 3.25, 10.64, 9.78, 1.92, 0.75],
				},
				object_ids: {
					'1681704': ['26416', '26417', '26418', '26419', '26422'],
					'1950062': ['26804', '26805', '26806', '26807', '26808', '26809', '26810'],
				},
				reference_job: {
					'1681704': null,
					'1950062': null,
				},
				percentage_value: {
					'1681704': 0,
					'1950062': 0,
				},
				current_value: {
					'1681704': 0,
					'1950062': 0,
				},
			},
		},
		'8': {
			id: '8',
			name: 'Sufit konstrukcja + sufit GK',
			unit: null,

			hidden: false,
			results: {
				summary_all_value: 9146.27,
				summary_current_value: 0,
				percentage_value: 0,
				elements: {},
			},
			upgrading: {
				summary_value: {
					'1681704': 5.78,
					'1950062': 14.44,
				},
				particular_values: {
					'1681704': [2.89, 2.89],
					'1950062': [7.22, 7.22],
				},
				object_ids: {
					'1681704': ['26423', '26424'],
					'1950062': ['26811', '26812'],
				},
				reference_job: {
					'1681704': null,
					'1950062': null,
				},
				percentage_value: {
					'1681704': 0,
					'1950062': 0,
				},
				current_value: {
					'1681704': 0,
					'1950062': 0,
				},
			},
		},
		'10': {
			id: '10',
			name: 'Wylewka samopoziomująca',
			unit: null,

			hidden: false,
			results: {
				summary_all_value: 4395.12,
				summary_current_value: 0,
				percentage_value: 0,
				elements: {},
			},
			upgrading: {
				summary_value: {
					'1681704': 2.88,
					'1950062': 6.61,
				},
				particular_values: {
					'1681704': [2.88],
					'1950062': [6.61],
				},
				object_ids: {
					'1681704': ['26415'],
					'1950062': ['26803'],
				},
				reference_job: {
					'1681704': null,
					'1950062': null,
				},
				percentage_value: {
					'1681704': 0,
					'1950062': 0,
				},
				current_value: {
					'1681704': 0,
					'1950062': 0,
				},
			},
		},
		'11': {
			id: '11',
			name: 'Montaż wykładzin podłogowych',
			unit: null,

			hidden: false,
			results: {
				summary_all_value: 4395.12,
				summary_current_value: 4.95,
				percentage_value: 0.11,
				elements: {
					'1104503': 0.9,
				},
			},
			upgrading: {
				summary_value: {
					'1681704': 2.88,
					'1950062': 6.61,
				},
				particular_values: {
					'1681704': [2.88],
					'1950062': [6.61],
				},
				object_ids: {
					'1681704': ['26415'],
					'1950062': ['26803'],
				},
				reference_job: {
					'1681704': null,
					'1950062': null,
				},
				percentage_value: {
					'1681704': 0,
					'1950062': 0,
				},
				current_value: {
					'1681704': 0,
					'1950062': 0,
				},
			},
		},
		'13': {
			id: '13',
			name: 'Montaż okładzin ściennych',
			unit: null,

			hidden: false,
			results: {
				summary_all_value: 296.66,
				summary_current_value: 0,
				percentage_value: 0,
				elements: {},
			},
			upgrading: {
				summary_value: {
					'1681704': 2.31,
				},
				particular_values: {
					'1681704': [1.45, 0.87],
				},
				object_ids: {
					'1681704': ['26420', '26421'],
				},
				reference_job: {
					'1681704': null,
				},
				percentage_value: {
					'1681704': 0,
				},
				current_value: {
					'1681704': 0,
				},
			},
		},
		'14': {
			id: '14',
			name: 'Drugie malowanie',
			unit: null,

			hidden: false,
			results: {
				summary_all_value: 24851.77,
				summary_current_value: 0,
				percentage_value: 0,
				elements: {},
			},
			upgrading: {
				summary_value: {
					'1681704': 43.11,
					'1950062': 42.69,
				},
				particular_values: {
					'1681704': [18.49, 6.74, 6.74, 5.68, 5.46],
					'1950062': [8.39, 7.96, 3.25, 10.64, 9.78, 1.92, 0.75],
				},
				object_ids: {
					'1681704': ['26416', '26417', '26418', '26419', '26422'],
					'1950062': ['26804', '26805', '26806', '26807', '26808', '26809', '26810'],
				},
				reference_job: {
					'1681704': null,
					'1950062': null,
				},
				percentage_value: {
					'1681704': 0,
					'1950062': 0,
				},
				current_value: {
					'1681704': 0,
					'1950062': 0,
				},
			},
		},
		'16': {
			id: '16',
			name: 'Wypełnienie sufitu podwieszanego',
			unit: null,
			hidden: false,
			results: {
				summary_all_value: 8958.53,
				summary_current_value: 0,
				percentage_value: 0,
				elements: {},
			},
			upgrading: {
				summary_value: {
					'1681704': 5.78,
					'1950062': 14.44,
				},
				particular_values: {
					'1681704': [2.89, 2.89],
					'1950062': [7.22, 7.22],
				},
				object_ids: {
					'1681704': ['26423', '26424'],
					'1950062': ['26811', '26812'],
				},
				reference_job: {
					'1681704': null,
					'1950062': null,
				},
				percentage_value: {
					'1681704': 0,
					'1950062': 0,
				},
				current_value: {
					'1681704': 0,
					'1950062': 0,
				},
			},
		},
	},
};

const expected3 = {
	'1': {
		id: '1',
		name: 'malowanie stropów, słupów, ścian nad sufitem podwieszanym',
		unit: 'area',

		hidden: false,
		results: {
			summary_all_value: 9146.27,
			summary_current_value: 298.75,
			percentage_value: 3.26,
			elements: {
				'1104476': 0.4,
				'1104503': 0.5,
				'3510928': 0.6,
			},
		},
		upgrading: {
			summary_value: {
				'1681704': 5.78,
				'1950062': 14.44,
			},
			particular_values: {
				'1681704': [2.89, 2.89],
				'1950062': [7.22, 7.22],
			},
			object_ids: {
				'1681704': ['26423', '26424'],
				'1950062': ['26811', '26812'],
			},
			reference_job: {
				'1681704': null,
				'1950062': null,
			},
			percentage_value: {
				'1681704': 0,
				'1950062': 0,
			},
			current_value: {
				'1681704': 0,
				'1950062': 0,
			},
		},
	},
	'2': {
		id: '2',
		name: 'Otwarcie ścian GK',
		unit: null,

		hidden: false,
		results: {
			summary_all_value: 21228.33,
			summary_current_value: 5.03,
			percentage_value: 0.02,
			elements: {
				'1104503': 0.1,
			},
		},
		upgrading: {
			summary_value: {
				'1681704': 43.11,
				'1950062': 42.69,
			},
			particular_values: {
				'1681704': [18.49, 6.74, 6.74, 5.68, 5.46],
				'1950062': [8.39, 7.96, 3.25, 10.64, 9.78, 1.92, 0.75],
			},
			object_ids: {
				'1681704': ['26416', '26417', '26418', '26419', '26422'],
				'1950062': ['26804', '26805', '26806', '26807', '26808', '26809', '26810'],
			},
			reference_job: {
				'1681704': null,
				'1950062': null,
			},
			percentage_value: {
				'1681704': 0,
				'1950062': 0,
			},
			current_value: {
				'1681704': 0,
				'1950062': 0,
			},
		},
	},
	'3': {
		id: '3',
		name: 'Wykonanie podkładów betonowych',
		unit: null,

		hidden: false,
		results: {
			summary_all_value: 4395.12,
			summary_current_value: 215.24,
			percentage_value: 4.89,
			elements: {
				'1104503': 0.5,
				'3510928': 0.9,
			},
		},
		upgrading: {
			summary_value: {
				'1681704': 2.88,
				'1950062': 6.61,
			},
			particular_values: {
				'1681704': [2.88],
				'1950062': [6.61],
			},
			object_ids: {
				'1681704': ['26415'],
				'1950062': ['26803'],
			},
			reference_job: {
				'1681704': null,
				'1950062': null,
			},
			percentage_value: {
				'1681704': 0,
				'1950062': 0,
			},
			current_value: {
				'1681704': 0,
				'1950062': 0,
			},
		},
	},
	'5': {
		id: '5',
		name: 'Zamknięcie ścian GK',
		unit: null,

		hidden: false,
		results: {
			summary_all_value: 21404.11,
			summary_current_value: 40.24,
			percentage_value: 0.18,
			elements: {
				'1104503': 0.8,
			},
		},
		upgrading: {
			summary_value: {
				'1681704': 43.11,
				'1950062': 42.69,
			},
			particular_values: {
				'1681704': [18.49, 6.74, 6.74, 5.68, 5.46],
				'1950062': [8.39, 7.96, 3.25, 10.64, 9.78, 1.92, 0.75],
			},
			object_ids: {
				'1681704': ['26416', '26417', '26418', '26419', '26422'],
				'1950062': ['26804', '26805', '26806', '26807', '26808', '26809', '26810'],
			},
			reference_job: {
				'1681704': null,
				'1950062': null,
			},
			percentage_value: {
				'1681704': 0,
				'1950062': 0,
			},
			current_value: {
				'1681704': 0,
				'1950062': 0,
			},
		},
	},
	'7': {
		id: '7',
		name: 'Szpachlowanie i malowanie ( I warstwa)',
		unit: null,

		hidden: false,
		results: {
			summary_all_value: 24851.77,
			summary_current_value: 266.2,
			percentage_value: 1.07,
			elements: {
				'1104503': 0.9,
				'3510928': 1,
			},
		},
		upgrading: {
			summary_value: {
				'1681704': 43.11,
				'1950062': 42.69,
			},
			particular_values: {
				'1681704': [18.49, 6.74, 6.74, 5.68, 5.46],
				'1950062': [8.39, 7.96, 3.25, 10.64, 9.78, 1.92, 0.75],
			},
			object_ids: {
				'1681704': ['26416', '26417', '26418', '26419', '26422'],
				'1950062': ['26804', '26805', '26806', '26807', '26808', '26809', '26810'],
			},
			reference_job: {
				'1681704': null,
				'1950062': null,
			},
			percentage_value: {
				'1681704': 0,
				'1950062': 0,
			},
			current_value: {
				'1681704': 0,
				'1950062': 0,
			},
		},
	},
	'8': {
		id: '8',
		name: 'Sufit konstrukcja + sufit GK',
		unit: null,

		hidden: false,
		results: {
			summary_all_value: 9146.27,
			summary_current_value: 0,
			percentage_value: 0,
			elements: {},
		},
		upgrading: {
			summary_value: {
				'1681704': 5.78,
				'1950062': 14.44,
			},
			particular_values: {
				'1681704': [2.89, 2.89],
				'1950062': [7.22, 7.22],
			},
			object_ids: {
				'1681704': ['26423', '26424'],
				'1950062': ['26811', '26812'],
			},
			reference_job: {
				'1681704': null,
				'1950062': null,
			},
			percentage_value: {
				'1681704': 0,
				'1950062': 0,
			},
			current_value: {
				'1681704': 0,
				'1950062': 0,
			},
		},
	},
	'10': {
		id: '10',
		name: 'Wylewka samopoziomująca',
		unit: null,

		hidden: false,
		results: {
			summary_all_value: 4395.12,
			summary_current_value: 0,
			percentage_value: 0,
			elements: {},
		},
		upgrading: {
			summary_value: {
				'1681704': 2.88,
				'1950062': 6.61,
			},
			particular_values: {
				'1681704': [2.88],
				'1950062': [6.61],
			},
			object_ids: {
				'1681704': ['26415'],
				'1950062': ['26803'],
			},
			reference_job: {
				'1681704': null,
				'1950062': null,
			},
			percentage_value: {
				'1681704': 0,
				'1950062': 0,
			},
			current_value: {
				'1681704': 0,
				'1950062': 0,
			},
		},
	},
	'11': {
		id: '11',
		name: 'Montaż wykładzin podłogowych',
		unit: null,

		hidden: false,
		results: {
			summary_all_value: 4395.12,
			summary_current_value: 4.95,
			percentage_value: 0.11,
			elements: {
				'1104503': 0.9,
			},
		},
		upgrading: {
			summary_value: {
				'1681704': 2.88,
				'1950062': 6.61,
			},
			particular_values: {
				'1681704': [2.88],
				'1950062': [6.61],
			},
			object_ids: {
				'1681704': ['26415'],
				'1950062': ['26803'],
			},
			reference_job: {
				'1681704': null,
				'1950062': null,
			},
			percentage_value: {
				'1681704': 0,
				'1950062': 0,
			},
			current_value: {
				'1681704': 0,
				'1950062': 0,
			},
		},
	},
	'13': {
		id: '13',
		name: 'Montaż okładzin ściennych',
		unit: null,

		hidden: false,
		results: {
			summary_all_value: 296.66,
			summary_current_value: 0,
			percentage_value: 0,
			elements: {},
		},
		upgrading: {
			summary_value: {
				'1681704': 2.31,
			},
			particular_values: {
				'1681704': [1.45, 0.87],
			},
			object_ids: {
				'1681704': ['26420', '26421'],
			},
			reference_job: {
				'1681704': null,
			},
			percentage_value: {
				'1681704': 0,
			},
			current_value: {
				'1681704': 0,
			},
		},
	},
	'14': {
		id: '14',
		name: 'Drugie malowanie',
		unit: null,

		hidden: false,
		results: {
			summary_all_value: 24851.77,
			summary_current_value: 0,
			percentage_value: 0,
			elements: {},
		},
		upgrading: {
			summary_value: {
				'1681704': 43.11,
				'1950062': 42.69,
			},
			particular_values: {
				'1681704': [18.49, 6.74, 6.74, 5.68, 5.46],
				'1950062': [8.39, 7.96, 3.25, 10.64, 9.78, 1.92, 0.75],
			},
			object_ids: {
				'1681704': ['26416', '26417', '26418', '26419', '26422'],
				'1950062': ['26804', '26805', '26806', '26807', '26808', '26809', '26810'],
			},
			reference_job: {
				'1681704': null,
				'1950062': null,
			},
			percentage_value: {
				'1681704': 0,
				'1950062': 0,
			},
			current_value: {
				'1681704': 0,
				'1950062': 0,
			},
		},
	},
	'16': {
		id: '16',
		name: 'Wypełnienie sufitu podwieszanego',
		unit: null,
		hidden: false,
		results: {
			summary_all_value: 8958.53,
			summary_current_value: 0,
			percentage_value: 0,
			elements: {},
		},
		upgrading: {
			summary_value: {
				'1681704': 5.78,
				'1950062': 14.44,
			},
			particular_values: {
				'1681704': [2.89, 2.89],
				'1950062': [7.22, 7.22],
			},
			object_ids: {
				'1681704': ['26423', '26424'],
				'1950062': ['26811', '26812'],
			},
			reference_job: {
				'1681704': null,
				'1950062': null,
			},
			percentage_value: {
				'1681704': 0,
				'1950062': 0,
			},
			current_value: {
				'1681704': 0,
				'1950062': 0,
			},
		},
	},
};

describe('spliting objects by key ', () => {
	test('should generate same objects', () => {
		expect(splitJobsByKey(objects.jobs, 2)).toStrictEqual(expected);
	});
	test('should generate expected with more than save jobs', () => {
		expect(splitJobsByKey(objects.jobs, 3)).toStrictEqual(expected2);
	});
});

describe('getSingleSelectionFilteredJobs function', () => {
	test('should generate exact object', () => {
		expect(genSingleSelectionFilteredJobs(objects.jobs)).toStrictEqual(expected3);
	});
});
