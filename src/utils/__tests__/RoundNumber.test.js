import { RoundNumber } from '../RoundNumber';

describe('Round Number test', () => {
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
});
