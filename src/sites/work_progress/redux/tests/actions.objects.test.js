import { fetchObjectsEnd, fetchObjectsError, fetchObjectsSetData, fetchObjectsStart, setObjectInitial } from '../actions/objects_actions';
import * as types from '../types';


describe('TEST OBJECTS ACTION', () => {
	test('should create a fetchObjectsStart action', () => {
		const expected = {
			type: types.OBJECTS_LOADING_START,
		};

		expect(fetchObjectsStart()).toEqual(expected);
	});
	test('should create a fetchObjectsError action', () => {
		const expected = {
			type: types.OBJECTS_LOADING_ERROR,
			errors: 'error',
		};

		expect(fetchObjectsError('error')).toEqual(expected);
	});
	test('should create a fetchObjectsEnd action', () => {
		const expected = {
			type: types.OBJECTS_LOADING_END,
		};

		expect(fetchObjectsEnd()).toEqual(expected);
	});
	test('should create a setObjectInitial action', () => {
		const expected = {
			type: types.OBJECTS_SET_INITIAL,
		};

		expect(setObjectInitial()).toEqual(expected);
	});
	test('should create a fetchObjectsSetData action', () => {
		const expected = {
			type: types.OBJECTS_SET_DATA,
			objects: [1, 2, 3],
		};

		expect(fetchObjectsSetData([1, 2, 3])).toEqual(expected);
	});
});
