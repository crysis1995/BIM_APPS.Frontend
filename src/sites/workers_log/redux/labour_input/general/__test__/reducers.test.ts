import Reducer, { INITIAL_STATE } from '../reducers';
import WorkersLog from '../../../../types';
import dayjs from 'dayjs';
import {
	OTHER_WORK_TYPE,
	WORKERS_LOG__WORKERS_TYPE,
} from '../../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';

describe('__test__ Labour Input General Reducer', function () {
	it('should return initial state', function () {
		const state = Reducer(INITIAL_STATE, {} as WorkersLog.LabourInput.Redux.General.Actions);

		expect(state).toEqual(INITIAL_STATE);
	});

	it('should handle INITIALIZE action', function () {
		expect(Reducer(INITIAL_STATE, {} as WorkersLog.LabourInput.Redux.General.Actions).IsActive).toEqual(false);
		expect(
			Reducer(INITIAL_STATE, { type: WorkersLog.LabourInput.Redux.General.Types.INITIALIZE, payload: true }),
		).toEqual({
			...INITIAL_STATE,
			IsActive: true,
		});

		expect(
			Reducer(INITIAL_STATE, { type: WorkersLog.LabourInput.Redux.General.Types.INITIALIZE, payload: false }),
		).toEqual({
			...INITIAL_STATE,
			IsActive: false,
		});
	});

	it('should handle SET INITIAL action', function () {
		const state = {
			IsActive: true,
			ActiveLevel: { id: '1', name: 'test' },
			ActualDate: '2020-05-06',
			ActualCrew: null,
			ActiveWorkType: null,
			OtherWorks: {},
			OtherWorksLoading: true,
		};
		expect(Reducer(state, { type: WorkersLog.LabourInput.Redux.General.Types.SET_INITIAL })).toEqual(INITIAL_STATE);
	});

	it('should handle CHOOSE LEVEL action', function () {
		const state = {
			IsActive: true,
			ActiveLevel: null,
			ActualDate: '2020-05-06',
			ActualCrew: null,
			ActiveWorkType: null,
			OtherWorks: {},
			OtherWorksLoading: true,
		};
		const level = { id: '1', name: 'test' };

		// add new level properly
		expect(
			Reducer(state, { type: WorkersLog.LabourInput.Redux.General.Types.CHOOSE_LEVEL, payload: level }),
		).toEqual({
			...state,
			ActiveLevel: level,
		});

		// add new level as null
		expect(
			Reducer(state, { type: WorkersLog.LabourInput.Redux.General.Types.CHOOSE_LEVEL, payload: null }),
		).toEqual({
			...state,
			ActiveLevel: null,
		});
	});

	it('should handle SET DATE action', function () {
		const state = {
			IsActive: true,
			ActiveLevel: null,
			ActualDate: '2020-01-01',
			ActualCrew: null,
			ActiveWorkType: null,
			OtherWorks: {},
			OtherWorksLoading: true,
		};

		expect(
			Reducer(state, { type: WorkersLog.LabourInput.Redux.General.Types.SET_DATE, payload: dayjs('2021-01-01') }),
		).toEqual({
			...state,
			ActualDate: '2021-01-01',
		});
	});

	it('should handle SELECT_WORKER_TYPE action', function () {
		const state = {
			IsActive: true,
			ActiveLevel: null,
			ActualDate: '2020-01-01',
			ActualCrew: null,
			ActiveWorkType: null,
			OtherWorks: {},
			OtherWorksLoading: true,
		};

		// add workType value as WORKERS_LOG__WORKERS_TYPE
		expect(
			Reducer(state, {
				type: WorkersLog.LabourInput.Redux.General.Types.SELECT_WORKER_TYPE,
				payload: { data: WORKERS_LOG__WORKERS_TYPE.STEEL_FIXER },
			}),
		).toEqual({
			...state,
			ActiveWorkType: WORKERS_LOG__WORKERS_TYPE.STEEL_FIXER,
		});

		// add workType as null
		expect(
			Reducer(state, {
				type: WorkersLog.LabourInput.Redux.General.Types.SELECT_WORKER_TYPE,
				payload: { data: null },
			}),
		).toEqual({
			...state,
			ActiveWorkType: null,
		});
	});

	it('should handle SELECT_CREW action', function () {
		const state = {
			IsActive: true,
			ActiveLevel: null,
			ActualDate: '2020-01-01',
			ActualCrew: null,
			ActiveWorkType: null,
			OtherWorks: {},
			OtherWorksLoading: true,
		};

		expect(
			Reducer(state, {
				type: WorkersLog.LabourInput.Redux.General.Types.SELECT_CREW,
				payload: { data: '1' },
			}),
		).toEqual({
			...state,
			ActualCrew: '1',
		});

		expect(
			Reducer(state, {
				type: WorkersLog.LabourInput.Redux.General.Types.SELECT_CREW,
				payload: { data: null },
			}),
		).toEqual({
			...state,
			ActualCrew: null,
		});
	});

	it('should handle FETCH_OTHER_WORKS_OPTIONS_START', function () {
		const state = {
			IsActive: true,
			ActiveLevel: null,
			ActualDate: '2020-01-01',
			ActualCrew: null,
			ActiveWorkType: null,
			OtherWorks: {},
			OtherWorksLoading: false,
		};

		expect(
			Reducer(state, {
				type: WorkersLog.LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_START,
			}),
		).toEqual({
			...state,
			OtherWorksLoading: true,
		});
	});

	it('should handle FETCH_OTHER_WORK_OPTIONS_END', function () {
		const state = {
			IsActive: true,
			ActiveLevel: null,
			ActualDate: '2020-01-01',
			ActualCrew: null,
			ActiveWorkType: null,
			OtherWorks: {},
			OtherWorksLoading: false,
		};

		const workOptions: { [p: string]: WorkersLog.LabourInput.Payload.General.OtherWorksData } = {
			'1': {
				id: '1',
				name: 'name',
				work_type: OTHER_WORK_TYPE.ADDITIONAL,
				crew_type: WORKERS_LOG__WORKERS_TYPE.STEEL_FIXER,
			},
			'2': {
				id: '2',
				name: 'name2',
				crew_type: null,
				work_type: OTHER_WORK_TYPE.ADDITIONAL,
			},
		};

		expect(
			Reducer(state, {
				type: WorkersLog.LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_END,
				payload: workOptions,
			}),
		).toEqual({
			...state,
			OtherWorksLoading: false,
			OtherWorks: workOptions,
		});
	});
});
