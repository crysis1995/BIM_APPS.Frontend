import { render } from '../../../../../../../../test/test-utils';
import React from 'react';
import TableBodyComponent from '../index';

describe('epic.test TableBodyComponent', () => {
	test('hidden when on initialState', () => {
		const { getByRole } = render(<TableBodyComponent />, {});
		expect(getByRole("div")).toBeFalsy()
	});
});
