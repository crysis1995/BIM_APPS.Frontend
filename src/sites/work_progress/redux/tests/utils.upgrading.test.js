import { prepUpgradingDataToSet } from '../utils/upgrading_utils';

describe('TEST PREP_UPGRADING_DATA_TO_SET', () => {
	const job_id = '3';
	const object = {
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
	};
	test('should properly generate expected object', () => {
		const expected = {
			summary_value: 14.87,
			particular_values: [14.87],
			object_ids: ['31194'],
			reference_job: null,
			percentage_value: 0,
			current_value: 0,
		};

		expect(prepUpgradingDataToSet(job_id, object)).toEqual(expected);
	});
});
