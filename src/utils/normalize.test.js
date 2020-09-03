import { normalize } from './normalize';

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

test('normalize object', () => {
	expect(normalize(data)).toStrictEqual(expected);
});
