import React from 'react';
import { render } from '../../../../../../test/test-utils';
import WorkersLogRedux from '../../../../redux';
import { INITIAL_STATE as TimeEvidenceInitialState } from '../../../../redux/labour_input/time_evidence/reducers';
import { INITIAL_STATE as ObjectsInitialState } from '../../../../redux/labour_input/objects/reducers';
import WorkTimeSummaryComponent from '../index';
import { RecursivePartial } from '../../../../../../test/recursivePartial';

jest.mock('../summary', () => () => 'summary');

let initialState: RecursivePartial<{
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
}> = {
	WorkersLog: { LabourInput: { TimeEvidence: TimeEvidenceInitialState, Objects: ObjectsInitialState } },
};

describe('Testing WorkTimeSummary Component', () => {
	test('if component exist', () => {
		const state = { ...initialState };
		const { getByTestId } = render(<WorkTimeSummaryComponent />, state);
		expect(getByTestId('WorkTimeSummaryComponent')).toBeTruthy();
	});
	describe('if render loader on loading', () => {
		test('when loading LabourSummaryWorkTimeLoading', () => {
			const state = {
				...initialState,
				WorkersLog: { LabourInput: { TimeEvidence: { LabourSummaryWorkTimeLoading: true } } },
			};
			const { getByTestId } = render(<WorkTimeSummaryComponent />, state);
			expect(getByTestId('loading')).toBeTruthy();
		});
		test('when loading Objects', () => {
			const state = {
				...initialState,
				WorkersLog: { LabourInput: { Objects: { Loading: true } } },
			};
			const { getByTestId } = render(<WorkTimeSummaryComponent />, state);
			expect(getByTestId('loading')).toBeTruthy();
		});
		test('when loading ObjectsTimeEvidencesLoading', () => {
			const state = {
				...initialState,
				WorkersLog: {
					LabourInput: { TimeEvidence: { ObjectsTimeEvidencesLoading: { [123]: true, [321]: false } } },
				},
			};
			const { getByTestId } = render(<WorkTimeSummaryComponent />, state);
			expect(getByTestId('loading')).toBeTruthy();
		});
		test('when all loading', () => {
			const state = {
				...initialState,
				WorkersLog: {
					LabourInput: {
						Objects: { Loading: true },
						TimeEvidence: {
							LabourSummaryWorkTimeLoading: true,
							ObjectsTimeEvidencesLoading: { [123]: true, [321]: false },
						},
					},
				},
			};
			const { getByTestId } = render(<WorkTimeSummaryComponent />, state);
			expect(getByTestId('loading')).toBeTruthy();
		});
	});
	test('if render null when empty ActualCrew', async () => {
		// expect(false).toBeTruthy();
		const state = {
			...initialState,
		};
		const { queryByText } = render(<WorkTimeSummaryComponent />, state);
		expect(queryByText('summary')).toBeNull();
	});
	test('if render Summary when is ActualCrew', () => {
		const state = {
			...initialState,
			WorkersLog: {
				LabourInput: {
					General: { ActualCrew: '1' },
				},
			},
		};
		const { queryByText } = render(<WorkTimeSummaryComponent />, state);
		expect(queryByText('summary')).not.toBeNull();
	});
});
