import {
	FORGE_VIEWER_COLORED_ELEMENTS_ADD,
	FORGE_VIEWER_COLORED_ELEMENTS_CLEAN,
	FORGE_VIEWER_COLORED_ELEMENTS_REMOVE,
	FORGE_VIEWER_SELECTED_ELEMENTS_ADD,
	FORGE_VIEWER_SELECTED_ELEMENTS_CLEAN,
	FORGE_VIEWER_SELECTED_ELEMENTS_REMOVE,
} from './actions';
import ForgeViewerReducer from './reducers';

describe('TEST FORGE VIEWER REDUCER', () => {
	const initialState = {
		model_view: '',
		viewer: null,
		sheets: [],
		sheets_loaded: false,
		sheets_error: false,
		current_sheet: '',
		viewer_isInitialized: false,
		selected_element: [],
		visible_element: [],
		colored_element: [],
		/*
		 */
		selected_elements: [],
		colored_elements: [],
		disabled_elements: [],
		hidden_elements: [],
		visible_elements: [],
		/*
		 */

		color: false,
		model_rooms: null,
		model_rooms_loading: false,
		model_elements: null,
		model_elements_loading: false,
	};
	describe('TEST SIMPLE ACTIONS', () => {
		test('INITIAL STATE', () => {
			expect(ForgeViewerReducer(initialState, {})).toEqual(initialState);
		});
		test('FORGE_VIEWER_SELECTED_ELEMENTS_ADD - add to empty array', () => {
			const action = {
				type: FORGE_VIEWER_SELECTED_ELEMENTS_ADD,
				elements: [123123, 123456],
			};
			const state = {
				...initialState,
			};
			expect(ForgeViewerReducer(state, action)).toEqual({
				...state,
				selected_elements: [123123, 123456],
			});
		});
		test('FORGE_VIEWER_SELECTED_ELEMENTS_ADD - add to array with some objects', () => {
			const action = {
				type: FORGE_VIEWER_SELECTED_ELEMENTS_ADD,
				elements: [111111, 999999],
			};
			const state = {
				...initialState,
				selected_elements: [123123, 123456],
			};
			expect(ForgeViewerReducer(state, action)).toEqual({
				...state,
				selected_elements: [123123, 123456, 111111, 999999],
			});
		});
		test('FORGE_VIEWER_SELECTED_ELEMENTS_ADD - add array with duplication', () => {
			const action = {
				type: FORGE_VIEWER_SELECTED_ELEMENTS_ADD,
				elements: [111111, 999999],
			};
			const state = {
				...initialState,
				selected_elements: [123123, 111111],
			};
			expect(ForgeViewerReducer(state, action)).toEqual({
				...state,
				selected_elements: [123123, 111111, 999999],
			});
		});
		test('FORGE_VIEWER_SELECTED_ELEMENTS_REMOVE - remove single item', () => {
			const action = {
				type: FORGE_VIEWER_SELECTED_ELEMENTS_REMOVE,
				elements: 111111,
			};
			const state = {
				...initialState,
				selected_elements: [123123, 123456, 111111],
			};
			expect(ForgeViewerReducer(state, action)).toEqual({
				...state,
				selected_elements: [123123, 123456],
			});
		});
		test('FORGE_VIEWER_SELECTED_ELEMENTS_REMOVE - remove many items', () => {
			const action = {
				type: FORGE_VIEWER_SELECTED_ELEMENTS_REMOVE,
				elements: [111111, 222222],
			};
			const state = {
				...initialState,
				selected_elements: [123123, 123456, 111111, 222222],
			};
			expect(ForgeViewerReducer(state, action)).toEqual({
				...state,
				selected_elements: [123123, 123456],
			});
		});
		test('FORGE_VIEWER_SELECTED_ELEMENTS_CLEAN', () => {
			const action = {
				type: FORGE_VIEWER_SELECTED_ELEMENTS_CLEAN,
			};
			const state = {
				...initialState,
				selected_elements: [123123, 123456, 111111, 222222],
			};
			expect(ForgeViewerReducer(state, action)).toEqual({
				...state,
				selected_elements: [],
			});
		});
		test('FORGE_VIEWER_COLORED_ELEMENTS_ADD - add one element to empty array', () => {
			const action = {
				type: FORGE_VIEWER_COLORED_ELEMENTS_ADD,
				elements: [{ element: '123123', color: { r: 1, g: 1, b: 1 } }],
			};
			const state = {
				...initialState,
				colored_elements: [],
			};
			expect(ForgeViewerReducer(state, action)).toEqual({
				...state,
				colored_elements: [{ element: '123123', color: { r: 1, g: 1, b: 1 } }],
			});
		});
		test('FORGE_VIEWER_COLORED_ELEMENTS_ADD - add one element to array with some elements', () => {
			const action = {
				type: FORGE_VIEWER_COLORED_ELEMENTS_ADD,
				elements: [{ element: '111111', color: { r: 1, g: 1, b: 1 } }],
			};
			const state = {
				...initialState,
				colored_elements: [{ element: '123123', color: { r: 1, g: 1, b: 1 } }],
			};
			expect(ForgeViewerReducer(state, action)).toEqual({
				...state,
				colored_elements: [
					{ element: '123123', color: { r: 1, g: 1, b: 1 } },
					{ element: '111111', color: { r: 1, g: 1, b: 1 } },
				],
			});
		});
		test('FORGE_VIEWER_COLORED_ELEMENTS_ADD - add many element to array with some elements', () => {
			const action = {
				type: FORGE_VIEWER_COLORED_ELEMENTS_ADD,
				elements: [
					{ element: '123123', color: { r: 1, g: 1, b: 1 } },
					{ element: '111111', color: { r: 1, g: 1, b: 1 } },
				],
			};
			const state = {
				...initialState,
				colored_elements: [{ element: '100000', color: { r: 1, g: 1, b: 1 } }],
			};
			expect(ForgeViewerReducer(state, action)).toEqual({
				...state,
				colored_elements: [
					{ element: '100000', color: { r: 1, g: 1, b: 1 } },
					{ element: '123123', color: { r: 1, g: 1, b: 1 } },
					{ element: '111111', color: { r: 1, g: 1, b: 1 } },
				],
			});
		});
		test('FORGE_VIEWER_COLORED_ELEMENTS_ADD - add many element to array with duplication', () => {
			const action = {
				type: FORGE_VIEWER_COLORED_ELEMENTS_ADD,
				elements: [
					{ element: '100000', color: { r: 1, g: 0, b: 0 } },
					{ element: '111111', color: { r: 0, g: 1, b: 1 } },
				],
			};
			const state = {
				...initialState,
				colored_elements: [
					{ element: '100000', color: { r: 1, g: 1, b: 1 } },
					{ element: '111111', color: { r: 1, g: 1, b: 1 } },
				],
			};
			expect(ForgeViewerReducer(state, action)).toEqual({
				...state,
				colored_elements: [
					{ element: '100000', color: { r: 1, g: 0, b: 0 } },
					{ element: '111111', color: { r: 0, g: 1, b: 1 } },
				],
			});
		});
		test('FORGE_VIEWER_COLORED_ELEMENTS_REMOVE - remove one element from array', () => {
			const action = {
				type: FORGE_VIEWER_COLORED_ELEMENTS_REMOVE,
				elements: '111111',
			};
			const state = {
				...initialState,
				colored_elements: [
					{ element: '100000', color: { r: 1, g: 1, b: 1 } },
					{ element: '123123', color: { r: 1, g: 1, b: 1 } },
					{ element: '111111', color: { r: 1, g: 1, b: 1 } },
				],
			};
			expect(ForgeViewerReducer(state, action)).toEqual({
				...state,
				colored_elements: [
					{ element: '100000', color: { r: 1, g: 1, b: 1 } },
					{ element: '123123', color: { r: 1, g: 1, b: 1 } },
				],
			});
		});
		test('FORGE_VIEWER_COLORED_ELEMENTS_REMOVE - remove many element from array', () => {
			const action = {
				type: FORGE_VIEWER_COLORED_ELEMENTS_REMOVE,
				elements: ['111111', '123123'],
			};
			const state = {
				...initialState,
				colored_elements: [
					{ element: '100000', color: { r: 1, g: 1, b: 1 } },
					{ element: '111111', color: { r: 1, g: 1, b: 1 } },
				],
			};
			expect(ForgeViewerReducer(state, action)).toEqual({
				...state,
				colored_elements: [{ element: '100000', color: { r: 1, g: 1, b: 1 } }],
			});
		});
		test('FORGE_VIEWER_COLORED_ELEMENTS_CLEAN', () => {
			const action = {
				type: FORGE_VIEWER_COLORED_ELEMENTS_CLEAN,
			};
			const state = {
				...initialState,
				colored_elements: [
					{ element: '100000', color: { r: 1, g: 1, b: 1 } },
					{ element: '123123', color: { r: 1, g: 1, b: 1 } },
					{ element: '111111', color: { r: 1, g: 1, b: 1 } },
				],
			};
			expect(ForgeViewerReducer(state, action)).toEqual({
				...state,
				colored_elements: [],
			});
		});
	});
});
