import { hexToRgba } from '../../../../utils/hexToRgb';
import { filterTree, findMinAndMaxRotationDay } from '../utils/odbiory_utils';
import data from '../__MOCK__/MONOLITHIC.upgrading.json';
import { config } from '../../../../config';

describe('TEST findMinAndMaxRotationDay function', () => {
	const elements = {
		'32768957': {
			Id: 32768957,
			Crane: 2,
			Level: 'B03',
			Vertical: 'V',
			Day: 15,
			'Revit category': 'Walls',
			Comments: 'Ściana wewnętrzna',
			VCF_Realisation: 'Internal wall',
			Volume: 2.224910953,
			Length: 308.8114809,
			Area: 8.899643812,
		},
		'32768958': {
			Id: 32768958,
			Crane: 2,
			Level: 'L01',
			Vertical: 'V',
			Day: 80,
			'Revit category': 'Walls',
			Comments: 'Attyka',
			VCF_Realisation: 'Acroterion',
			Volume: 6.788374388,
			Length: 2282.218579,
			Area: 27.15349755,
		},
		'32768959': {
			Id: 32768959,
			Crane: 2,
			Level: 'B02',
			Vertical: 'V',
			Day: 45,
			'Revit category': 'Walls',
			Comments: 'Belka monolityczna',
			VCF_Realisation: 'Cast in situ beam',
			Volume: 2.504396367,
			Length: 780,
			Area: 4.173993945,
		},
	};

	test('should return min and max val in object', () => {
		const expected = { min: 1, max: 1 };

		const actual = findMinAndMaxRotationDay({}, null, null);

		expect(actual).toEqual(expected);
	});

	test('should return properly min and max - one case', () => {
		const activeCrane = '2';
		const activeLevel = 'B02';

		const expected = { min: 45, max: 45 };

		const actual = findMinAndMaxRotationDay(elements, activeCrane, activeLevel);
		expect(actual).toEqual(expected);
	});

	test('should return min and max - many cases', () => {
		const activeCrane = '1';
		const activeLevel = 'B03';

		const expected = { min: 1, max: 60 };

		const t0 = performance.now();
		const actual = findMinAndMaxRotationDay(data, activeCrane, activeLevel);
		const t1 = performance.now();
		console.log(t1 - t0);
		expect(actual).toEqual(expected);
	});
});

describe('TEST filterTree function - MODE BASE PLAN', () => {
	const elements = {
		'32768957': {
			Id: 32768957,
			Crane: 2,
			Level: 'B03',
			Vertical: 'V',
			Day: 15,
			'Revit category': 'Walls',
			Comments: 'Ściana wewnętrzna',
			VCF_Realisation: 'Internal wall',
			Volume: 2.224910953,
			Length: 308.8114809,
			Area: 8.899643812,
		},
		'32768958': {
			Id: 32768958,
			Crane: 2,
			Level: 'L01',
			Vertical: 'V',
			Day: 80,
			'Revit category': 'Walls',
			Comments: 'Attyka',
			VCF_Realisation: 'Acroterion',
			Volume: 6.788374388,
			Length: 2282.218579,
			Area: 27.15349755,
		},
		'32768959': {
			Id: 32768959,
			Crane: 2,
			Level: 'B02',
			Vertical: 'V',
			Day: 45,
			'Revit category': 'Walls',
			Comments: 'Belka monolityczna',
			VCF_Realisation: 'Cast in situ beam',
			Volume: 2.504396367,
			Length: 780,
			Area: 4.173993945,
		},
	};

	test('should return proper objects', () => {
		const forge_elements = {
			'32768957': 123456,
			'32768958': 234567,
		};
		const actual_crane = '2';
		const actual_level = 'B03';
		const actual_day = 15;
		const t0 = performance.now();
		const { colored_elements, disabled_elements, hidden_elements, visible_elements, current_elements } = filterTree(
			elements,
			forge_elements,
			actual_crane,
			actual_level,
			actual_day,
		);
		const t1 = performance.now();
		console.log(t1 - t0);
		const expected_colored_elements = {
			123456: hexToRgba(
				config.ACCEPTANCE.MONOLITHIC.legend.active.color,
				config.ACCEPTANCE.MONOLITHIC.legend.active.alpha,
				true,
			),
			234567: hexToRgba(
				config.ACCEPTANCE.MONOLITHIC.legend.out_of.color,
				config.ACCEPTANCE.MONOLITHIC.legend.out_of.alpha,
				true,
			),
		};
		const expected_disabled_elements = [234567];
		const expected_hidden_elements = [];
		const expected_visible_elements = [123456, 234567];
		const expected_current_elements = ['32768957'];

		expect(colored_elements).toEqual(expected_colored_elements);
		expect(disabled_elements).toEqual(expected_disabled_elements);
		expect(hidden_elements).toEqual(expected_hidden_elements);
		expect(visible_elements).toEqual(expected_visible_elements);
		expect(current_elements).toEqual(expected_current_elements);
	});

	test('should return proper objects _ performance run', () => {
		const forge_elements = {
			'32768957': 123456,
			'32768958': 234567,
			'32823856': 345346234,
			'32823932': 134123986,
			'32823933': 987657,
			'32824559': 125654321,
			'32824560': 2345676543,
			'32824561': 2354464,
			'32824562': 365756,
			'32824563': 86754,
			'32824564': 987654,
			'32824565': 354768765,
			'32824566': 9845677654,
			'32824567': 567876543,
			'32824568': 35466543,
		};
		const actual_crane = '2';
		const actual_level = 'B03';
		const actual_day = 15;
		const t0 = performance.now();
		const { colored_elements, disabled_elements, hidden_elements, visible_elements, current_elements } = filterTree(
			data,
			forge_elements,
			actual_crane,
			actual_level,
			actual_day,
		);
		const t1 = performance.now();
		console.log(t1 - t0);

		expect(true).toEqual(true);
	});
});
