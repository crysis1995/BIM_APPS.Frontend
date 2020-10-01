import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import Selector from '../Selector';

describe('SELECTOR TEST', () => {
	test('render SELECTOR without crashing', () => {
		const { getByText } = render(<Selector isDisabled={false} label={'TEST'} options_loaded={false} />);
		expect(getByText('TEST')).toBeInTheDocument();
	});
	test('render properly SELECTOR with options', () => {
		const { getAllByTestId, getAllByText } = render(
			<Selector
				isDisabled={false}
				label={'TEST'}
				options_loaded={true}
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
		const { getByDisplayValue } = render(
			<Selector
				value={'1'}
				isDisabled={false}
				label={'TEST'}
				options_loaded={true}
				options={[
					{ id: '1', name: 'test 1' },
					{ id: '2', name: 'test 2' },
					{ id: '3', name: 'test 3' },
				]}
			/>,
		);

		expect(getByDisplayValue('test 1')).toEqual('test');
	});
});
