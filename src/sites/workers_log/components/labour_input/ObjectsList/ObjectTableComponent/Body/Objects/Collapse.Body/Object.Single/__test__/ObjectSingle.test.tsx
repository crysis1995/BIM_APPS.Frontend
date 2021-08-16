import React from 'react';
import ObjectSingle from '../index';
import { render } from '../../../../../../../../../../../test/test-utils';
import { isCheckedSelector } from '../Selector.IsChecked';
import userEvent from '@testing-library/user-event';
import LabourInputObjectsActions from '../../../../../../../../../redux/labour_input/objects/actions';

jest.mock(
	'../../../../OtherWork/Utils/ActualEventKeyRowViewer',
	() => ({ show, children }: { show: boolean; children: React.ReactChildren }) =>
		show ? <>{children}</> : <div>hidden</div>,
);
jest.mock('../../Components/Object.Name.Component', () => ({ objectID }: { objectID: number }) => (
	<div>name - {objectID}</div>
));
jest.mock('../../Components/Object.TimeInput.Component', () => ({ objectID }: { objectID: number }) => (
	<div>timeinput - {objectID}</div>
));
jest.mock('../Selector.IsChecked', () => ({
	isCheckedSelector: jest.fn(),
}));

jest.mock('../../../../../../../../../redux/labour_input/objects/actions', () => ({
	SelectObject: jest.fn((data) => ({ type: 'test', payload: data })),
}));

describe('__test__ ObjectSingle component', function () {
	it('should do not render component while show is false', function () {
		const initialState = {};

		const component = render(<ObjectSingle show={false} object={1} />, initialState);

		expect(component.getByText(/hidden/i)).toBeTruthy();
	});
	describe('render shown component ', function () {
		it('should render unchecked element', function () {
			(isCheckedSelector as jest.MockedFunction<any>)?.mockReturnValue(false);
			const initialState = {};

			const component = render(<ObjectSingle show={true} object={1} />, initialState);
			expect(component.getByRole('checkbox')).toBeTruthy();
			expect(component.getByText(/name - 1/)).toBeTruthy();

			expect((component.getByRole('checkbox') as HTMLInputElement)?.checked).toBeFalsy();
		});
		it('should render checked element', function () {
			(isCheckedSelector as jest.MockedFunction<any>)?.mockReturnValue(true);
			const initialState = {};

			const component = render(<ObjectSingle show={true} object={1} />, initialState);
			expect(component.getByRole('checkbox')).toBeTruthy();
			expect(component.getByText(/name - 1/)).toBeTruthy();

			expect((component.getByRole('checkbox') as HTMLInputElement)?.checked).toBeTruthy();
		});

		it('should fire onChange event', async function () {
			const initialState = {};

			const component = render(<ObjectSingle show={true} object={1} />, initialState);
			expect(component.getByRole('checkbox')).toBeTruthy();
			expect(component.getByText(/name - 1/)).toBeTruthy();
			userEvent.click(component.getByRole('checkbox'));

			expect(LabourInputObjectsActions.SelectObject).toHaveBeenCalledWith(1);
		});
	});
});
