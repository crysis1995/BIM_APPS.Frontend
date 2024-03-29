import { RoundNumber } from '../RoundNumber';

describe('Round Number epic.__test__', () => {
	test('should round number properly', () => {
		var number = 12.123123124;
		var expected = 12.12;
		expect(RoundNumber(number)).toBe(expected);
	});

	test('should round number return 0', () => {
		var number = 0;
		var expected = 0;
		expect(RoundNumber(number)).toBe(expected);
	});
	test('should round number when precision is given', () => {
		var number = 12.345345;
		var expected = 12.3;
		expect(RoundNumber(number, 1)).toBe(expected);
	});
	test('should round number when precision is undefined', () => {
		var number = 12.345345;
		var expected = 12.35;
		expect(RoundNumber(number, undefined)).toBe(expected);
	});

	test('should round number properly with set step', () => {
		var number = 12.123123124;
		var expected = 12.0;
		expect(RoundNumber(number, 1, 0.5)).toBe(expected);
	});
	test('should round number properly with set step - other number', () => {
		var number = 12.513123124;
		var expected = 12.5;
		expect(RoundNumber(number, 1, 0.5)).toBe(expected);
	});
});

