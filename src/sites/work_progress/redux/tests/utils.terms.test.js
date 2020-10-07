import { PERMISSION, TERM_TYPE } from '../types/constans';
import { normalizeTermsData } from '../utils/terms_utils';

describe('TEST NORMALIZE_TERMS_DATA FUNCTION', () => {
	test('should return sth', () => {
		expect(normalizeTermsData([])).not.toBeNull();
		expect(normalizeTermsData([])).not.toBeUndefined();
	});
	test('should throw error if data is not array type', () => {
		expect(() => normalizeTermsData([])).not.toThrow();
		expect(() => normalizeTermsData('')).toThrowError('Data nie jest typu Array');
	});
	test('should generate data properly without user info', () => {
		const data = [
			{
				id: '16',
				name: 'Kuchnia i Kantyna',
				jobs: [
					{
						id: '1',
					},
					{
						id: '2',
					},
					{
						id: '3',
					},
				],
				terms: [],
			},
			{
				id: '17',
				name: 'Pow techniczna',
				jobs: [
					{
						id: '2',
					},
					{
						id: '4',
					},
					{
						id: '5',
					},
				],
				terms: [],
			},
			{
				id: '18',
				name: 'Pow magazynowa',
				jobs: [
					{
						id: '1',
					},
					{
						id: '2',
					},
					{
						id: '4',
					},
					{
						id: '5',
					},
				],
				terms: [],
			},
		];

		const expected = {
			'16': {
				name: 'Kuchnia i Kantyna',
				byJobId: {
					'1': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [],
						},
					},
					'2': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [],
						},
					},
					'3': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [],
						},
					},
				},
			},
			'17': {
				name: 'Pow techniczna',
				byJobId: {
					'2': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [],
						},
					},
					'4': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [],
						},
					},
					'5': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [],
						},
					},
				},
			},
			'18': {
				name: 'Pow magazynowa',
				byJobId: {
					'1': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [],
						},
					},
					'2': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [],
						},
					},
					'4': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [],
						},
					},
					'5': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [],
						},
					},
				},
			},
		};
		expect(normalizeTermsData(data)).toEqual(expected);
	});
	test('should generate data properly with info when user is not admin', () => {
		const data = [
			{
				id: '16',
				name: 'Kuchnia i Kantyna',
				jobs: [
					{
						id: '1',
					},
					{
						id: '2',
					},
					{
						id: '3',
					},
				],
				terms: [],
			},
			{
				id: '17',
				name: 'Pow techniczna',
				jobs: [
					{
						id: '2',
					},
					{
						id: '4',
					},
					{
						id: '5',
					},
				],
				terms: [],
			},
			{
				id: '18',
				name: 'Pow magazynowa',
				jobs: [
					{
						id: '1',
					},
					{
						id: '2',
					},
					{
						id: '4',
					},
					{
						id: '5',
					},
				],
				terms: [],
			},
		];

		const user = {
			id: '1',
			project_roles: [{ project: { id: '1' }, project_role: { name: 'asd' } }],
		};

		const project = {
			id: '1',
		};

		const expected = {
			'16': {
				name: 'Kuchnia i Kantyna',
				byJobId: {
					'1': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
					},
					'2': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
					},
					'3': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
					},
				},
			},
			'17': {
				name: 'Pow techniczna',
				byJobId: {
					'2': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
					},
					'4': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
					},
					'5': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
					},
				},
			},
			'18': {
				name: 'Pow magazynowa',
				byJobId: {
					'1': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
					},
					'2': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
					},
					'4': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
					},
					'5': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW],
						},
					},
				},
			},
		};
		expect(normalizeTermsData(data, user, project)).toEqual(expected);
	});
	test('should generate data properly with info when user is admin', () => {
		const data = [
			{
				id: '16',
				name: 'Kuchnia i Kantyna',
				jobs: [
					{
						id: '1',
					},
					{
						id: '2',
					},
					{
						id: '3',
					},
				],
				terms: [],
			},
			{
				id: '17',
				name: 'Pow techniczna',
				jobs: [
					{
						id: '2',
					},
					{
						id: '4',
					},
					{
						id: '5',
					},
				],
				terms: [],
			},
			{
				id: '18',
				name: 'Pow magazynowa',
				jobs: [
					{
						id: '1',
					},
					{
						id: '2',
					},
					{
						id: '4',
					},
					{
						id: '5',
					},
				],
				terms: [],
			},
		];

		const user = {
			id: '1',
			project_roles: [{ project: { id: '1' }, project_role: { name: 'admin' } }],
		};

		const project = {
			id: '1',
		};

		const expected = {
			'16': {
				name: 'Kuchnia i Kantyna',
				byJobId: {
					'1': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
					},
					'2': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
					},
					'3': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
					},
				},
			},
			'17': {
				name: 'Pow techniczna',
				byJobId: {
					'2': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
					},
					'4': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
					},
					'5': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
					},
				},
			},
			'18': {
				name: 'Pow magazynowa',
				byJobId: {
					'1': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
					},
					'2': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
					},
					'4': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
					},
					'5': {
						[TERM_TYPE.PLANNED_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_FINISH]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
						[TERM_TYPE.REAL_START]: {
							value: null,
							permissions: [PERMISSION.VIEW, PERMISSION.CREATE, PERMISSION.UPDATE],
						},
					},
				},
			},
		};
		expect(normalizeTermsData(data, user, project)).toEqual(expected);
	});
});
