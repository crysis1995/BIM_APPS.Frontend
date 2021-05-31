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

describe('Testing Summary Component', () => {
	test('if exist', () => {});
	test('render crew name component', () => {});
	test('render CurrentWorkedTimeComponent with CurrentSummaryWorkTime and variant', () => {});
	test('render SummaryWorkedTimeComponent with LabourSummaryWorkTime and variant', () => {});
	test('render DifferenceWorkedTimeComponent with TimeDifference and variant', () => {});
	test('change variant while props changed (LabourSummaryWorkTime | CurrentSummaryWorkTime)', () => {});
	test('render three tooltips', () => {});
});
