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
				id: '2',
				departments: [
					{
						id: '26',
						name: 'Oddział Chirurgii',
						terms: [],
					},
					{
						id: '28',
						name: 'Zespół Poradni Specjalistycznych',
						terms: [],
					},
					{
						id: '29',
						name: 'Komunikacja ogólna',
						terms: [],
					},
				],
			},
			{
				id: '4',
				departments: [
					{
						id: '26',
						name: 'Oddział Chirurgii',
						terms: [],
					},
					{
						id: '27',
						name: 'Pow techniczna',
						terms: [],
					},
					{
						id: '28',
						name: 'Zespół Poradni Specjalistycznych',
						terms: [],
					},
					{
						id: '29',
						name: 'Komunikacja ogólna',
						terms: [],
					},
				],
			},
			{
				id: '3',
				departments: [
					{
						id: '26',
						name: 'Oddział Chirurgii',
						terms: [],
					},
					{
						id: '27',
						name: 'Pow techniczna',
						terms: [],
					},
					{
						id: '28',
						name: 'Zespół Poradni Specjalistycznych',
						terms: [],
					},
					{
						id: '29',
						name: 'Komunikacja ogólna',
						terms: [],
					},
				],
			},
			{
				id: '5',
				departments: [
					{
						id: '26',
						name: 'Oddział Chirurgii',
						terms: [],
					},
					{
						id: '28',
						name: 'Zespół Poradni Specjalistycznych',
						terms: [],
					},
					{
						id: '29',
						name: 'Komunikacja ogólna',
						terms: [],
					},
				],
			},
			{
				id: '7',
				departments: [
					{
						id: '26',
						name: 'Oddział Chirurgii',
						terms: [],
					},
					{
						id: '27',
						name: 'Pow techniczna',
						terms: [],
					},
					{
						id: '28',
						name: 'Zespół Poradni Specjalistycznych',
						terms: [],
					},
					{
						id: '29',
						name: 'Komunikacja ogólna',
						terms: [],
					},
				],
			},
			{
				id: '8',
				departments: [
					{
						id: '26',
						name: 'Oddział Chirurgii',
						terms: [],
					},
					{
						id: '28',
						name: 'Zespół Poradni Specjalistycznych',
						terms: [],
					},
					{
						id: '29',
						name: 'Komunikacja ogólna',
						terms: [],
					},
				],
			},
			{
				id: '10',
				departments: [
					{
						id: '26',
						name: 'Oddział Chirurgii',
						terms: [],
					},
					{
						id: '27',
						name: 'Pow techniczna',
						terms: [],
					},
					{
						id: '28',
						name: 'Zespół Poradni Specjalistycznych',
						terms: [],
					},
					{
						id: '29',
						name: 'Komunikacja ogólna',
						terms: [],
					},
				],
			},
			{
				id: '11',
				departments: [
					{
						id: '26',
						name: 'Oddział Chirurgii',
						terms: [],
					},
					{
						id: '27',
						name: 'Pow techniczna',
						terms: [],
					},
					{
						id: '28',
						name: 'Zespół Poradni Specjalistycznych',
						terms: [],
					},
					{
						id: '29',
						name: 'Komunikacja ogólna',
						terms: [],
					},
				],
			},
			{
				id: '13',
				departments: [
					{
						id: '26',
						name: 'Oddział Chirurgii',
						terms: [],
					},
				],
			},
			{
				id: '14',
				departments: [
					{
						id: '26',
						name: 'Oddział Chirurgii',
						terms: [],
					},
					{
						id: '27',
						name: 'Pow techniczna',
						terms: [],
					},
					{
						id: '28',
						name: 'Zespół Poradni Specjalistycznych',
						terms: [],
					},
					{
						id: '29',
						name: 'Komunikacja ogólna',
						terms: [],
					},
				],
			},
			{
				id: '16',
				departments: [
					{
						id: '26',
						name: 'Oddział Chirurgii',
						terms: [],
					},
					{
						id: '28',
						name: 'Zespół Poradni Specjalistycznych',
						terms: [],
					},
					{
						id: '29',
						name: 'Komunikacja ogólna',
						terms: [],
					},
				],
			},
			{
				id: '1',
				departments: [
					{
						id: '26',
						name: 'Oddział Chirurgii',
						terms: [],
					},
					{
						id: '28',
						name: 'Zespół Poradni Specjalistycznych',
						terms: [],
					},
					{
						id: '29',
						name: 'Komunikacja ogólna',
						terms: [],
					},
				],
			},
			{
				id: '6',
				departments: [],
			},
			{
				id: '9',
				departments: [],
			},
			{
				id: '12',
				departments: [],
			},
			{
				id: '15',
				departments: [],
			},
		];

		const expected = {
			'1': {
				byDepartment: {
					'26': {
						name: 'Oddział Chirurgii',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'28': {
						name: 'Zespół Poradni Specjalistycznych',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'29': {
						name: 'Komunikacja ogólna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
				[TERM_TYPE.PLANNED_FINISH]: null,
				[TERM_TYPE.REAL_FINISH]: null,
				[TERM_TYPE.REAL_START]: null,
			},
			'2': {
				byDepartment: {
					'26': {
						name: 'Oddział Chirurgii',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'28': {
						name: 'Zespół Poradni Specjalistycznych',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'29': {
						name: 'Komunikacja ogólna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
				[TERM_TYPE.PLANNED_FINISH]: null,
				[TERM_TYPE.REAL_FINISH]: null,
				[TERM_TYPE.REAL_START]: null,
			},
			'3': {
				byDepartment: {
					'26': {
						name: 'Oddział Chirurgii',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'27': {
						name: 'Pow techniczna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'28': {
						name: 'Zespół Poradni Specjalistycznych',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'29': {
						name: 'Komunikacja ogólna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
				[TERM_TYPE.PLANNED_FINISH]: null,
				[TERM_TYPE.REAL_FINISH]: null,
				[TERM_TYPE.REAL_START]: null,
			},
			'4': {
				byDepartment: {
					'26': {
						name: 'Oddział Chirurgii',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'27': {
						name: 'Pow techniczna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'28': {
						name: 'Zespół Poradni Specjalistycznych',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'29': {
						name: 'Komunikacja ogólna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
				[TERM_TYPE.PLANNED_FINISH]: null,
				[TERM_TYPE.REAL_FINISH]: null,
				[TERM_TYPE.REAL_START]: null,
			},
			'5': {
				byDepartment: {
					'26': {
						name: 'Oddział Chirurgii',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'28': {
						name: 'Zespół Poradni Specjalistycznych',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'29': {
						name: 'Komunikacja ogólna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
				[TERM_TYPE.PLANNED_FINISH]: null,
				[TERM_TYPE.REAL_FINISH]: null,
				[TERM_TYPE.REAL_START]: null,
			},
			'7': {
				byDepartment: {
					'26': {
						name: 'Oddział Chirurgii',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'27': {
						name: 'Pow techniczna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'28': {
						name: 'Zespół Poradni Specjalistycznych',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'29': {
						name: 'Komunikacja ogólna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
				[TERM_TYPE.PLANNED_FINISH]: null,
				[TERM_TYPE.REAL_FINISH]: null,
				[TERM_TYPE.REAL_START]: null,
			},
			'8': {
				byDepartment: {
					'26': {
						name: 'Oddział Chirurgii',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'28': {
						name: 'Zespół Poradni Specjalistycznych',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'29': {
						name: 'Komunikacja ogólna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
				[TERM_TYPE.PLANNED_FINISH]: null,
				[TERM_TYPE.REAL_FINISH]: null,
				[TERM_TYPE.REAL_START]: null,
			},
			'10': {
				byDepartment: {
					'26': {
						name: 'Oddział Chirurgii',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'27': {
						name: 'Pow techniczna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'28': {
						name: 'Zespół Poradni Specjalistycznych',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'29': {
						name: 'Komunikacja ogólna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
				[TERM_TYPE.PLANNED_FINISH]: null,
				[TERM_TYPE.REAL_FINISH]: null,
				[TERM_TYPE.REAL_START]: null,
			},
			'11': {
				byDepartment: {
					'26': {
						name: 'Oddział Chirurgii',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'27': {
						name: 'Pow techniczna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'28': {
						name: 'Zespół Poradni Specjalistycznych',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'29': {
						name: 'Komunikacja ogólna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
				[TERM_TYPE.PLANNED_FINISH]: null,
				[TERM_TYPE.REAL_FINISH]: null,
				[TERM_TYPE.REAL_START]: null,
			},
			'13': {
				byDepartment: {
					'26': {
						name: 'Oddział Chirurgii',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
				[TERM_TYPE.PLANNED_FINISH]: null,
				[TERM_TYPE.REAL_FINISH]: null,
				[TERM_TYPE.REAL_START]: null,
			},
			'14': {
				byDepartment: {
					'26': {
						name: 'Oddział Chirurgii',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'27': {
						name: 'Pow techniczna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'28': {
						name: 'Zespół Poradni Specjalistycznych',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'29': {
						name: 'Komunikacja ogólna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
				[TERM_TYPE.PLANNED_FINISH]: null,
				[TERM_TYPE.REAL_FINISH]: null,
				[TERM_TYPE.REAL_START]: null,
			},
			'16': {
				byDepartment: {
					'26': {
						name: 'Oddział Chirurgii',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'28': {
						name: 'Zespół Poradni Specjalistycznych',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
					'29': {
						name: 'Komunikacja ogólna',
						[TERM_TYPE.PLANNED_FINISH]: null,
						[TERM_TYPE.REAL_FINISH]: null,
						[TERM_TYPE.REAL_START]: null,
					},
				},
				[TERM_TYPE.PLANNED_FINISH]: null,
				[TERM_TYPE.REAL_FINISH]: null,
				[TERM_TYPE.REAL_START]: null,
			},
		};
		expect(normalizeTermsData(data)).toEqual(expected);
	});
});
