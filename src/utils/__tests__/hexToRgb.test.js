import { hexToRgba } from '../hexToRgb';


describe('TEST hexToRgb function', () => {
	test('should return rgba values', () => {
		const t0 = performance.now();
		const actual = hexToRgba('#ffffff', 1);
		const t1 = performance.now();
		console.log(t1 - t0);
		const expected = { r: 255, g: 255, b: 255, a: 1 };
		expect(actual).toEqual(expected);
	});

	test('should return normalized rgba values', () => {
		const t0 = performance.now();
		const actual = hexToRgba('#ffffff', 1, true);
		const t1 = performance.now();

		console.log(t1 - t0);
		const expected = { r: 1, g: 1, b: 1, a: 1 };
		expect(actual).toEqual(expected);
	});
});
