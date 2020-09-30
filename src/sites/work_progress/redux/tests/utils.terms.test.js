import { TERM_TYPE } from '../types/constans';
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

	test('', () => {
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
					{
						id: '4',
					},
					{
						id: '5',
					},
					{
						id: '7',
					},
					{
						id: '8',
					},
					{
						id: '10',
					},
					{
						id: '11',
					},
					{
						id: '14',
					},
					{
						id: '16',
					},
				],
				terms: [],
			},
			{
				id: '17',
				name: 'Pow techniczna',
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
					{
						id: '7',
					},
					{
						id: '8',
					},
					{
						id: '13',
					},
					{
						id: '14',
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
					{
						id: '7',
					},
					{
						id: '8',
					},
					{
						id: '13',
					},
					{
						id: '14',
					},
					{
						id: '16',
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
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'2': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'3': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'4': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'5': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'7': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'8': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'10': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'11': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'14': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'16': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
			},
			'17': {
				name: 'Pow techniczna',
				byJobId: {
					'1': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'2': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'4': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'5': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'7': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'8': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},

					'13': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'14': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
			},
			'18': {
				name: 'Pow magazynowa',
				byJobId: {
					'1': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'2': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'4': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'5': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'7': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'8': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},

					'13': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'14': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'16': {
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
			},
		};
		expect(normalizeTermsData(data)).toEqual(expected);
	});
});
