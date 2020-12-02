import { delaysGenerateTree } from '../utils/delay_utils';
import data from '../__MOCK__/MONOLITHIC.delays.json';
describe('delaysGenerateTree test', () => {
	test('should gen properly tree', () => {
		const delays = delaysGenerateTree(data);
		console.log(delays);
	});
});
