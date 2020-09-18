import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { rootReducer } from '../../../../reducers';
import Terms from '../Terms/index';

import '@testing-library/jest-dom/extend-expect';

const renderWithRedux = (component, { initialState, store = createStore(rootReducer, initialState) } = {}) => {
	return {
		...render(<Provider store={store}>{component}</Provider>),
		store,
	};
};

afterEach(cleanup);

describe('TESTING TERMS COMPONENT', () => {
	test('should render loading component', () => {
		const { getByText } = renderWithRedux(<Terms />, {
			initialState: {
				ForgeViewer: { current_sheet: '' },
				Odbiory: { Jobs: { jobs_fetched: true, jobs_loading: true } },
			},
		});
		expect(getByText('Loading...')).toBeInTheDocument();
	});

	test('should render loading component when jobs is downloading', () => {
		const { getByText } = renderWithRedux(<Terms />, {
			initialState: {
				ForgeViewer: { current_sheet: '' },
				Odbiory: { Jobs: { jobs_fetched: false, jobs_loading: true } },
			},
		});
		expect(getByText('Loading...')).toBeInTheDocument();
	});

	test('should render info for user to select sth', () => {
		const { getByText } = renderWithRedux(<Terms />, {
			initialState: {
				ForgeViewer: { current_sheet: '' },
				Odbiory: { Jobs: { jobs_fetched: true, jobs_loading: false } },
			},
		});
		expect(getByText('Wybierz kondygnacje')).toBeInTheDocument();
	});

	test('should render Terms Component', () => {
		const { getByTestId } = renderWithRedux(<Terms />, {
			initialState: {
				ForgeViewer: { current_sheet: 'asdasd' },
				Odbiory: { Jobs: { jobs_fetched: true, jobs_loading: false, jobs: {} } },
			},
		});
		expect(getByTestId('TermsComponent')).toBeInTheDocument();
	});
});
