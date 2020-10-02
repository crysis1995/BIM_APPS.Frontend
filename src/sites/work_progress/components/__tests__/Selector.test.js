import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Selector from '../Selector';

describe('SELECTOR TEST', () => {
	test('render SELECTOR without crashing', () => {
		const { getByText } = render(<Selector isDisabled={false} label={'TEST'} />);
		expect(getByText('TEST')).toBeInTheDocument();
	});
	test('render properly SELECTOR with options', () => {
		const { getAllByTestId, getAllByText } = render(
			<Selector
				isDisabled={false}
				label={'TEST'}
				options={[
					{ id: '1', name: 'test 1' },
					{ id: '2', name: 'test 2' },
					{ id: '3', name: 'test 3' },
				]}
			/>,
		);
		expect(getAllByTestId('options').length).toBe(3);
		expect(getAllByText('test 1').length).toBe(1);
		expect(getAllByText('test 2').length).toBe(1);
		expect(getAllByText('test 3').length).toBe(1);
	});
	test('render properly SELECTOR with value', () => {
		const { getByRole } = render(
			<Selector
				value={'1'}
				isDisabled={false}
				label={'TEST'}
				options={[
					{ id: '1', name: 'test 1' },
					{ id: '2', name: 'test 2' },
					{ id: '3', name: 'test 3' },
				]}
			/>,
		);
		expect(getByRole('combobox')).toHaveValue('1');
	});
	test('handle onChangeEvent', () => {
		const onChange = jest.fn(() => {});
		const { getByTestId } = render(
			<Selector
				value={'1'}
				onChangeValue={onChange}
				isDisabled={false}
				label={'TEST'}
				options={[
					{ id: '1', name: 'test 1' },
					{ id: '2', name: 'test 2' },
					{ id: '3', name: 'test 3' },
				]}
			/>,
		);
		expect(getByTestId('Selector')).toHaveValue('1');
		fireEvent.select(getByTestId('Selector'), { target: { value: '2' } });
		expect(getByTestId('Selector')).toHaveValue('2');
	});

	test('handle onChangeEvent with disabled', () => {
		const onChange = jest.fn(() => {});
		const { getByTestId } = render(
			<Selector
				value={'1'}
				onChangeValue={onChange}
				isDisabled={true}
				label={'TEST'}
				options={[
					{ id: '1', name: 'test 1' },
					{ id: '2', name: 'test 2' },
					{ id: '3', name: 'test 3' },
				]}
			/>,
		);
		expect(getByTestId('Selector')).toHaveValue('1');
		expect(getByTestId('Selector')).toBeDisabled();
	});
});
