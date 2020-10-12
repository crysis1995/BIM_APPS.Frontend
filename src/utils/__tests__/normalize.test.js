import { normalize } from '../normalize';

var data = [
	{
		id: '26372',
	},
	{
		id: '26373',
	},
];
var expected = {
	26372: {
		id: '26372',
	},
	26373: {
		id: '26373',
	},
};

var data2 = [
	{ id: '111', data: { name: 'test' } },
	{ id: '222', data: { name: 'test2' } },
	{ id: '333', data: { name: 'test3' } },
];

var expected2 = {
	test: { id: '111', data: { name: 'test' } },
	test2: { id: '222', data: { name: 'test2' } },
	test3: { id: '333', data: { name: 'test3' } },
};

describe('test normalize function', () => {
	test('normalize object', () => {
		expect(normalize(data)).toEqual(expected);
	});
	test('should normalize object with key longer than 1', () => {
		expect(normalize(data2, "data.name")).toEqual(expected2);
	});
});
