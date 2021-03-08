import { checkObjectsTerms } from '../epics/upgrading_epics';

describe('upgrading_epics.js', () => {
	describe('method checkObjectsTerms', () => {
		test('should properly handle case when REAL_START date set needed', () => {
			const actualGroupedRevitIds = ['1', '2', '3'];
			const byRevitId = {
				1: { id: '12' },
				2: { id: '22' },
				3: { id: '32' },
			};
			const allElementsInGroup = ['1', '2', '3', '4', '5'];
			const termsObject = {
				id: 735,
				REAL_START: null,
				PLANNED_FINISH: null,
				REAL_FINISH: null,
				PLANNED_START_BP: null,
				PLANNED_FINISH_BP: null,
				PLANNED_START: null,
				objects: [],
			};
			const expected = {
				...termsObject,
				REAL_START: new Date().toISOString(),
				objects: ['12', '22', '32'],
			};

			const result = checkObjectsTerms(actualGroupedRevitIds, byRevitId, allElementsInGroup, termsObject);

			expect(result.needUpgradeTermState).toBeTruthy();
			expect(result.termsObject).toEqual(expected);
		});
		test('should properly handle case when REAL_FINISH date set needed', () => {
			const actualGroupedRevitIds = ['4', '5'];
			const byRevitId = {
				4: { id: '4' },
				5: { id: '5' },
			};
			const allElementsInGroup = ['1', '2', '3', '4', '5'];
			const termsObject = {
				id: 735,
				REAL_START: null,
				PLANNED_FINISH: null,
				REAL_FINISH: null,
				PLANNED_START_BP: null,
				PLANNED_FINISH_BP: null,
				PLANNED_START: null,
				objects: [{ id: '1' }, { id: '2' }, { id: '3' }],
			};
			const expected = {
				...termsObject,
				REAL_FINISH: new Date().toISOString(),
				objects: ['1', '2', '3', '4', '5'],
			};

			const result = checkObjectsTerms(actualGroupedRevitIds, byRevitId, allElementsInGroup, termsObject);

			expect(result.needUpgradeTermState).toBeTruthy();
			expect(result.termsObject).toEqual(expected);
		});
		test('should properly handle case when no update is needed', () => {
			const actualGroupedRevitIds = ['4'];
			const byRevitId = {
				4: { id: '4' },
				5: { id: '5' },
			};
			const allElementsInGroup = ['1', '2', '3', '4', '5'];
			const termsObject = {
				id: 735,
				REAL_START: null,
				PLANNED_FINISH: null,
				REAL_FINISH: null,
				PLANNED_START_BP: null,
				PLANNED_FINISH_BP: null,
				PLANNED_START: null,
				objects: [{ id: '1' }, { id: '2' }, { id: '3' }],
			};
			const expected = {
				...termsObject,
				objects: ['1', '2', '3', '4'],
			};

			const result = checkObjectsTerms(actualGroupedRevitIds, byRevitId, allElementsInGroup, termsObject);

			expect(result.needUpgradeTermState).toBeTruthy();
			expect(result.termsObject).toEqual(expected);
		});
	});
});
