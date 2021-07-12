import Reducer, { INITIAL_STATE } from '../reducers';
import WorkersLog from '../../../../types';

describe('test Labour Input Objects Reducer', function () {
	it('should return initial state', function () {
		expect(Reducer(undefined, {} as WorkersLog.LabourInput.Redux.Objects.Actions)).toEqual(INITIAL_STATE);
	});

	it('should handle SET INITIAL action from GENERAL REDUCER', function () {
		const state: WorkersLog.LabourInput.Redux.Objects.Store = {
			ByRevitID: {},
			AllObjects: {},
			Selection: [1, 2, 30],
			ObjectsGroups: [1, 2, 3],
			FilteredObjects: [1, 2, 3],
			Loading: true,
		};
		expect(Reducer(state, { type: WorkersLog.LabourInput.Redux.General.Types.SET_INITIAL })).toEqual(INITIAL_STATE);
	});

	it('should handle FETCH_OBJECTS_START action', function () {
		const state: WorkersLog.LabourInput.Redux.Objects.Store = {
			...INITIAL_STATE,
			Loading: false,
		};

		expect(Reducer(state, { type: WorkersLog.LabourInput.Redux.Objects.Types.FETCH_OBJECTS_START })).toEqual({
			...INITIAL_STATE,
			Loading: true,
		});
	});

	it('should handle FETCH_OBJECTS_END action', function () {
		const state: WorkersLog.LabourInput.Redux.Objects.Store = {
			...INITIAL_STATE,
			Loading: true,
		};

		const objects: { [p: string]: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus } = {
			'1': {
				id: 123,
				revit_id: 1233,
				statuses: [],
				VCF_Realisation: null,
				area: 14561,
				level: 1,
				running_meter: 12,
				volume: 5484,
			},
		};
		expect(
			Reducer(state, { type: WorkersLog.LabourInput.Redux.Objects.Types.FETCH_OBJECTS_END, payload: objects }),
		).toEqual({
			...INITIAL_STATE,
			Loading: false,
			ByRevitID: {
				'1233': 123,
			},
			AllObjects: objects,
		});
	});

	it('should handle SET_FILTERED_OBJECTS action', function () {
		const state: WorkersLog.LabourInput.Redux.Objects.Store = {
			...INITIAL_STATE,
		};

		const filteredObjects = [1, 2, 3];

		expect(
			Reducer(state, {
				type: WorkersLog.LabourInput.Redux.Objects.Types.SET_FILTERED_OBJECTS,
				payload: filteredObjects,
			}),
		).toEqual({
			...INITIAL_STATE,
			FilteredObjects: filteredObjects,
		});
	});

	describe('handle SELECT_OBJECT action', function () {
		it('should select single element - State.Selection is empty', function () {
			const state: WorkersLog.LabourInput.Redux.Objects.Store = {
				...INITIAL_STATE,
				Selection: [],
			};
			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.SELECT_OBJECT,
					payload: 1,
				}),
			).toEqual({
				...INITIAL_STATE,
				Selection: [1],
			});
		});
		it('should select single element', function () {
			const state: WorkersLog.LabourInput.Redux.Objects.Store = {
				...INITIAL_STATE,
				Selection: [1, 2],
			};
			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.SELECT_OBJECT,
					payload: 3,
				}),
			).toEqual({
				...INITIAL_STATE,
				Selection: [1, 2, 3],
			});
		});

		it('should unselect single element', function () {
			const state: WorkersLog.LabourInput.Redux.Objects.Store = {
				...INITIAL_STATE,
				Selection: [1, 2, 3],
			};
			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.SELECT_OBJECT,
					payload: 1,
				}),
			).toEqual({
				...INITIAL_STATE,
				Selection: [2, 3],
			});
		});

		it('should add many element - State.Selection is empty', function () {
			const state: WorkersLog.LabourInput.Redux.Objects.Store = {
				...INITIAL_STATE,
				Selection: [],
			};
			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.SELECT_OBJECT,
					payload: [1, 2, 3],
				}),
			).toEqual({
				...INITIAL_STATE,
				Selection: [1, 2, 3],
			});
		});

		it('should unselect many element - state is not empty', function () {
			const state: WorkersLog.LabourInput.Redux.Objects.Store = {
				...INITIAL_STATE,
				Selection: [1, 2, 3],
			};
			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.SELECT_OBJECT,
					payload: [1, 2, 3],
				}),
			).toEqual({
				...INITIAL_STATE,
				Selection: [],
			});
		});

		it('should select many element - state is not empty', function () {
			const state: WorkersLog.LabourInput.Redux.Objects.Store = {
				...INITIAL_STATE,
				Selection: [1, 2, 3],
			};
			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.SELECT_OBJECT,
					payload: [3, 4],
				}),
			).toEqual({
				...INITIAL_STATE,
				Selection: [1, 2, 3, 4],
			});
		});
		it('should unselect all element', function () {
			const state: WorkersLog.LabourInput.Redux.Objects.Store = {
				...INITIAL_STATE,
				Selection: [1, 2, 3],
			};
			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.SELECT_OBJECT,
					payload: [],
				}),
			).toEqual({
				...INITIAL_STATE,
				Selection: [],
			});
		});
	});

	describe('handle HANDLE_SELECT_OBJECT action', function () {
		it('should handle empty action.payload', function () {
			const state: WorkersLog.LabourInput.Redux.Objects.Store = {
				...INITIAL_STATE,
				Selection: [1, 2, 3],
			};
			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.HANDLE_SELECT_OBJECT,
					payload: [],
				}),
			).toEqual({
				...INITIAL_STATE,
				Selection: [],
			});
		});

		it('should add one element', function () {
			const state: WorkersLog.LabourInput.Redux.Objects.Store = {
				...INITIAL_STATE,
				Selection: [1, 2, 3],
				ByRevitID: {
					'111': 1,
					'222': 2,
					'333': 3,
				},
			};
			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.HANDLE_SELECT_OBJECT,
					payload: [111],
				}),
			).toEqual({
				...INITIAL_STATE,
				...state,
				Selection: [1],
			});
		});
		it('should add many element', function () {
			const state: WorkersLog.LabourInput.Redux.Objects.Store = {
				...INITIAL_STATE,
				Selection: [3],
				ByRevitID: {
					'111': 1,
					'222': 2,
					'333': 3,
				},
			};
			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.HANDLE_SELECT_OBJECT,
					payload: [111, 222],
				}),
			).toEqual({
				...INITIAL_STATE,
				...state,
				Selection: [3, 1, 2],
			});
		});
	});

	describe('handle GROUP_OBJECTS action', function () {
		it('should clean selection', function () {
			const state: WorkersLog.LabourInput.Redux.Objects.Store = {
				...INITIAL_STATE,
				Selection: [1, 2, 3],
			};
			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.GROUP_OBJECTS,
					payload: [],
				}),
			).toEqual({
				...INITIAL_STATE,
				Selection: [],
			});
		});

		it('should delete grouped objects from state', function () {
			const state: WorkersLog.LabourInput.Redux.Objects.Store = {
				...INITIAL_STATE,
				ObjectsGroups: [1, 2, 3],
			};

			/*
			 * 		empty list to group
			 * */
			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.GROUP_OBJECTS,
					payload: [],
				}),
			).toEqual({
				...INITIAL_STATE,
				ObjectsGroups: [1, 2, 3],
			});
			/*
			 *		existing object to group
			 * */
			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.GROUP_OBJECTS,
					payload: [1, 2],
				}),
			).toEqual({
				...INITIAL_STATE,
				ObjectsGroups: [3],
			});
		});
	});

	describe('handle UNGROUP_OBJECTS action', function () {
		it('should handle action while payload is empty', function () {
			const state: WorkersLog.LabourInput.Redux.Objects.Store = {
				...INITIAL_STATE,
				ObjectsGroups: [1, 2, 3],
			};

			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.UNGROUP_OBJECTS,
					payload: [],
				}),
			).toEqual({
				...INITIAL_STATE,
				ObjectsGroups: [1, 2, 3],
			});
		});
		it('should add objects to store', function () {
			const state: WorkersLog.LabourInput.Redux.Objects.Store = {
				...INITIAL_STATE,
				ObjectsGroups: [1, 2, 3],
			};

			expect(
				Reducer(state, {
					type: WorkersLog.LabourInput.Redux.Objects.Types.UNGROUP_OBJECTS,
					payload: [4, 5],
				}),
			).toEqual({
				...INITIAL_STATE,
				ObjectsGroups: [1, 2, 3, 4, 5],
			});
		});
	});
	it('should handle TimeEvidence FETCH_ALL_OBJECTS_TIME_EVIDENCE_END action', function () {
		const state: WorkersLog.LabourInput.Redux.Objects.Store = {
			...INITIAL_STATE,
			FilteredObjects: [1, 2, 3, 4, 5, 6],
		};

		expect(
			Reducer(state, {
				type: WorkersLog.LabourInput.Redux.TimeEvidence.Types.FETCH_ALL_OBJECTS_TIME_EVIDENCE_END,
				payload: [
					{ id: '1', worked_time: 2, objects: [{ id: '1' }, { id: '2' }] },
					{ id: '2', worked_time: 31, objects: [{ id: '3' }, { id: '4' }] },
				],
			}),
		).toEqual({
			...INITIAL_STATE,
			...state,
			ObjectsGroups: [5, 6],
		});
	});
});
