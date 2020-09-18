import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { rootReducer } from '../../../../reducers';
import TermsComponent from './TermsComponent';


const renderWithRedux = (component, { initialState, store = createStore(rootReducer, initialState) } = {}) => {
	return {
		...render(<Provider store={store}>{component}</Provider>),
		store,
	};
};

afterEach(cleanup);

describe('TESTING TERMS COMPONENT', () => {
	test('should render without creashing', () => {
		const { getByText, getByRole } = renderWithRedux(<TermsComponent />, {
			initialState: {},
		});
		expect(getByRole('table')).toBeInTheDocument();
	});

	test('should render thead properly', () => {
		const { getByText, getAllByRole } = renderWithRedux(<TermsComponent />, {
			initialState: {},
		});
		expect(getAllByRole('columnheader').length).toBe(4);

		expect(getByText('Nazwa roboty')).toBeInTheDocument();
		expect(getByText('Data rzeczywistego rozpoczęcia')).toBeInTheDocument();
		expect(getByText('Data planowanego zakończenia')).toBeInTheDocument();
		expect(getByText('Data rzeczywistego zakończenia')).toBeInTheDocument();
	});

	test('should render properly jobs and their names', () => {
		const { getByText, getAllByRole } = renderWithRedux(<TermsComponent />, {
			initialState: {
				Odbiory: {
					Jobs: {
						jobs: {
							'1': {
								id: '1',
								name: 'malowanie stropów, słupów, ścian nad sufitem podwieszanym',
								hidden: false,
							},
							'2': {
								id: '2',
								name: 'Otwarcie ścian GK',
								hidden: false,
							},
							'3': {
								id: '3',
								name: 'Wykonanie podkładów betonowych',
								hidden: false,
							},
							'4': {
								id: '4',
								name: 'Tynk - GK',
								hidden: false,
							},
						},
					},
				},
			},
		});
		expect(getAllByRole('cell').length).toBe(32);

		expect(getByText('malowanie stropów, słupów, ścian nad sufitem podwieszanym')).toBeInTheDocument();
		expect(getByText('Otwarcie ścian GK')).toBeInTheDocument();
		expect(getByText('Wykonanie podkładów betonowych')).toBeInTheDocument();
		expect(getByText('Tynk - GK')).toBeInTheDocument();
	});

	test('should render jobs with hidden filter', () => {
		const { getByText, getAllByRole } = renderWithRedux(<TermsComponent />, {
			initialState: {
				Odbiory: {
					Jobs: {
						jobs: {
							'1': {
								id: '1',
								name: 'malowanie stropów, słupów, ścian nad sufitem podwieszanym',
								hidden: false,
							},
							'2': {
								id: '2',
								name: 'Otwarcie ścian GK',
								hidden: false,
							},
							'3': {
								id: '3',
								name: 'Wykonanie podkładów betonowych',
								hidden: false,
							},
							'4': {
								id: '4',
								name: 'Tynk - GK',
								hidden: true,
							},
						},
					},
				},
			},
		});
		expect(getAllByRole('cell').length).toBe(32);

		expect(getByText('malowanie stropów, słupów, ścian nad sufitem podwieszanym')).toBeInTheDocument();
		expect(getByText('Otwarcie ścian GK')).toBeInTheDocument();
		expect(getByText('Wykonanie podkładów betonowych')).toBeInTheDocument();
		expect(getByText('Tynk - GK')).toBeInTheDocument();
	});

	test('should render table rows as accordion', () => {
		const { getByText, getAllByRole, container } = renderWithRedux(<TermsComponent />, {
			initialState: {
				Odbiory: {
					Jobs: {
						jobs: {
							'1': {
								id: '1',
								name: 'malowanie stropów, słupów, ścian nad sufitem podwieszanym',
								hidden: false,
							},
							'2': {
								id: '2',
								name: 'Otwarcie ścian GK',
								hidden: false,
							},
						},
					},
				},
			},
		});
		expect(getAllByRole('cell').length).toBe(16);
		expect(container.querySelectorAll('[data-parentid="1"]').length).toBe(1);
		expect(container.querySelectorAll('[name="1"]').length).toBe(1);
		expect(getByText('malowanie stropów, słupów, ścian nad sufitem podwieszanym')).toBeInTheDocument();

		fireEvent.click(getByText('malowanie stropów, słupów, ścian nad sufitem podwieszanym'));
		expect(container.querySelector('[name="1"]').className).toBe("collapse table-secondary show");
	});
});
