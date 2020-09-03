import { prepareDataForJobs } from './utils';

const job_id = '2';
const objects = {
	'1613128': {
		'31194': {
			id: '31194',
			area: 14.87,
			object_finish_type: {
				name: 'Podłoga 12cm',
				jobs: [
					{
						id: '3',
					},
					{
						id: '10',
					},
					{
						id: '11',
					},
				],
			},
			room: {
				revit_id: '1613128',
			},
			reference_jobs: [],
		},
		'31195': {
			id: '31195',
			area: 7.73,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm REI30',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '1613128',
			},
			reference_jobs: [],
		},
		'31196': {
			id: '31196',
			area: 4.45,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '1613128',
			},
			reference_jobs: [],
		},
		'31197': {
			id: '31197',
			area: 4.45,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '1613128',
			},
			reference_jobs: [],
		},
		'31198': {
			id: '31198',
			area: 23.68,
			object_finish_type: {
				name: 'WCZD_TYNK',
				jobs: [
					{
						id: '4',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '1613128',
			},
			reference_jobs: [],
		},
		'31199': {
			id: '31199',
			area: 7.36,
			object_finish_type: {
				name: 'WCZD_TYNK',
				jobs: [
					{
						id: '4',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '1613128',
			},
			reference_jobs: [],
		},
		'31200': {
			id: '31200',
			area: 13.57,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '1613128',
			},
			reference_jobs: [],
		},
		'31201': {
			id: '31201',
			area: 6.52,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '1613128',
			},
			reference_jobs: [],
		},
		'31202': {
			id: '31202',
			area: 15.6,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '1613128',
			},
			reference_jobs: [],
		},
		'31203': {
			id: '31203',
			area: 3.4,
			object_finish_type: {
				name: 'SP. 12 - Pełny GK',
				jobs: [
					{
						id: '1',
					},
					{
						id: '8',
					},
				],
			},
			room: {
				revit_id: '1613128',
			},
			reference_jobs: [],
		},
		'31204': {
			id: '31204',
			area: 7.9,
			object_finish_type: {
				name: 'SP 5 - sufit pełny GK',
				jobs: [
					{
						id: '1',
					},
					{
						id: '8',
					},
					{
						id: '16',
					},
				],
			},
			room: {
				revit_id: '1613128',
			},
			reference_jobs: [],
		},
	},
	'4903821': {
		'31560': {
			id: '31560',
			area: 15.93,
			object_finish_type: {
				name: 'Podłoga 12cm',
				jobs: [
					{
						id: '3',
					},
					{
						id: '10',
					},
					{
						id: '11',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31561': {
			id: '31561',
			area: 13.69,
			object_finish_type: {
				name: 'Ściana GK - ruszt 5cm - SANIT',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31562': {
			id: '31562',
			area: 0.84,
			object_finish_type: {
				name: 'Ściana GK - ruszt 5cm - SANIT',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31563': {
			id: '31563',
			area: 13.57,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31564': {
			id: '31564',
			area: 30.5,
			object_finish_type: {
				name: 'WCZD_TYNK',
				jobs: [
					{
						id: '4',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31565': {
			id: '31565',
			area: 15.61,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31566': {
			id: '31566',
			area: 5.6,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31567': {
			id: '31567',
			area: 5.6,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31568': {
			id: '31568',
			area: 1.8,
			object_finish_type: {
				name: 'Sufit podwieszany GK zabudowa 75mm',
				jobs: [
					{
						id: '1',
					},
					{
						id: '8',
					},
					{
						id: '16',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31569': {
			id: '31569',
			area: 10.24,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31570': {
			id: '31570',
			area: 19.88,
			object_finish_type: {
				name: 'Ściana GK - ruszt 10cm REI30',
				jobs: [
					{
						id: '2',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31571': {
			id: '31571',
			area: 1.93,
			object_finish_type: {
				name: 'WCZD_TYNK',
				jobs: [
					{
						id: '4',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31572': {
			id: '31572',
			area: 0.77,
			object_finish_type: {
				name: 'WCZD_TYNK',
				jobs: [
					{
						id: '4',
					},
					{
						id: '7',
					},
					{
						id: '14',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31573': {
			id: '31573',
			area: 4.14,
			object_finish_type: {
				name: 'SP 5 - sufit pełny GK',
				jobs: [
					{
						id: '1',
					},
					{
						id: '8',
					},
					{
						id: '16',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31574': {
			id: '31574',
			area: 2.86,
			object_finish_type: {
				name: 'SP. 5b - RIGIPS - Casoprano Casorock - 60,0 cm x 60,0 cm',
				jobs: [
					{
						id: '1',
					},
					{
						id: '8',
					},
					{
						id: '16',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
		'31575': {
			id: '31575',
			area: 1.27,
			object_finish_type: {
				name: 'SP. 12 - Pełny GK',
				jobs: [
					{
						id: '1',
					},
					{
						id: '8',
					},
				],
			},
			room: {
				revit_id: '4903821',
			},
			reference_jobs: [],
		},
	},
};

const expected = {
	summary_value: { '1613128': 52.32, '4903821': 85.03 },
	particular_values: {
		'1613128': [7.73, 4.45, 4.45, 13.57, 6.52, 15.6],
		'4903821': [13.69, 0.84, 13.57, 15.61, 5.6, 5.6, 10.24, 19.88],
	},
	object_ids: {
		'1613128': ['31195', '31196', '31197', '31200', '31201', '31202'],
		'4903821': ['31561', '31562', '31563', '31565', '31566', '31567', '31569', '31570'],
	},
	reference_job: { '1613128': null, '4903821': null },
	percentage_value: { '1613128': 0, '4903821': 0 },
	current_value: { '1613128': 0, '4903821': 0 },
};

const selectedRooms = ['1613128', '4903821'];

test('should prepareDataForJobs function generate expected object', () => {
	expect(prepareDataForJobs(job_id, objects, selectedRooms)).toStrictEqual(expected);
});
