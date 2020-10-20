import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from 'redux-mock-store';
import { rootReducer } from '../../../../reducers';
import { PERMISSION, TERM_TYPE } from '../../redux/types/constans';
import TermsComponent from '../Terms/TermsComponent';

const mockStore = configureStore([]);

const renderWithRedux = (component, { initialState, store = createStore(rootReducer, initialState) } = {}) => {
	return {
		...render(<Provider store={store}>{component}</Provider>),
		store,
	};
};

describe('TESTING TERMS COMPONENT', () => {
	afterEach(() => {
		cleanup();
	});

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
		expect(getAllByRole('columnheader').length).toBe(5);
		expect(getByText('Nazwa roboty')).toBeInTheDocument();
		expect(getByText('DRR')).toBeInTheDocument();
		expect(getByText('DPZ')).toBeInTheDocument();
		expect(getByText('DPZwPB')).toBeInTheDocument();
		expect(getByText('DRZ')).toBeInTheDocument();
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
					Terms: {
						chosenDepartment: '22',
						byDepartment: {
							'22': {
								name: 'pierwszy',
								byJobId: {
									'1': {
										[TERM_TYPE.REAL_START]: { value: new Date(2020, 0, 1), permissions: [] },
										[TERM_TYPE.PLANNED_FINISH]: { value: new Date(2020, 1, 1), permissions: [] },
										[TERM_TYPE.REAL_FINISH]: { value: new Date(2020, 2, 1), permissions: [] },
									},
									'2': {
										[TERM_TYPE.REAL_START]: { value: new Date(2020, 0, 1), permissions: [] },
										[TERM_TYPE.PLANNED_FINISH]: { value: new Date(2020, 1, 1), permissions: [] },
										[TERM_TYPE.REAL_FINISH]: { value: new Date(2020, 2, 1), permissions: [] },
									},
									'3': {
										[TERM_TYPE.REAL_START]: { value: new Date(2020, 0, 1), permissions: [] },
										[TERM_TYPE.PLANNED_FINISH]: { value: new Date(2020, 1, 1), permissions: [] },
										[TERM_TYPE.REAL_FINISH]: { value: new Date(2020, 2, 1), permissions: [] },
									},
									'4': {
										[TERM_TYPE.REAL_START]: { value: new Date(2020, 0, 1), permissions: [] },
										[TERM_TYPE.PLANNED_FINISH]: { value: new Date(2020, 1, 1), permissions: [] },
										[TERM_TYPE.REAL_FINISH]: { value: new Date(2020, 2, 1), permissions: [] },
									},
								},
							},
							'33': {
								name: 'drugi',
								byJobId: {
									'1': {},
									'2': {},
									'3': {},
									'4': {},
								},
							},
						},
					},
				},
			},
		});
		expect(getAllByRole('cell').length).toBe(20);
		expect(getByText('pierwszy')).toBeInTheDocument();
		expect(getByText('drugi')).toBeInTheDocument();
		expect(getByText('malowanie stropów, słupów, ścian nad sufitem podwieszanym')).toBeInTheDocument();
		expect(getByText('Otwarcie ścian GK')).toBeInTheDocument();
		expect(getByText('Wykonanie podkładów betonowych')).toBeInTheDocument();
		expect(getByText('Tynk - GK')).toBeInTheDocument();
	});
	test('should render jobs with data inputs', () => {
		const { container, getByTestId } = renderWithRedux(<TermsComponent />, {
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
					Terms: {
						chosenDepartment: '1',
						byDepartment: {
							'1': {
								name: 'test1',
								byJobId: {
									'1': {
										[TERM_TYPE.REAL_START]: {
											value: new Date(2020, 0, 1),
											permissions: [PERMISSION.VIEW],
										},
										[TERM_TYPE.PLANNED_FINISH]: {
											value: new Date(2020, 1, 1),
											permissions: [PERMISSION.VIEW],
										},
										[TERM_TYPE.REAL_FINISH]: {
											value: new Date(2020, 2, 1),
											permissions: [PERMISSION.VIEW],
										},
									},
								},
							},
						},
					},
				},
			},
		});
		const date1 = new Date(2020, 0, 1).toString();
		const input1 = screen.getByTestId('data-input-1');
		const date2 = new Date(2020, 1, 1).toString();
		const input2 = screen.getByTestId('data-input-2');

		const input3 = screen.getByTestId('data-input-3');
		const date4 = new Date(2020, 2, 1).toString();
		const input4 = screen.getByTestId('data-input-4');

		expect(container.querySelectorAll('.form-control').length).toBe(4);
		expect(screen.getByText('test1')).toBeInTheDocument();

		expect(screen.getAllByTestId('data-input-1').length).toBe(1);
		expect(screen.getAllByTestId('data-input-2').length).toBe(1);
		expect(screen.getAllByTestId('data-input-3').length).toBe(1);
		expect(screen.getAllByTestId('data-input-4').length).toBe(1);

		expect(input1).toHaveAttribute('value', date1);
		expect(input2).toHaveAttribute('value', date2);
		expect(input3).toHaveAttribute('value', date4);
		expect(input4).toHaveAttribute('value', date4);
	});
	test('should handle change department', () => {
		const { getByTestId } = renderWithRedux(<TermsComponent />, {
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
					Terms: {
						chosenDepartment: '1',
						byDepartment: {
							'1': {
								name: 'test1',
								byJobId: {
									'1': {
										[TERM_TYPE.REAL_START]: {
											value: new Date(2020, 0, 1),
											permissions: [PERMISSION.VIEW],
										},
										[TERM_TYPE.PLANNED_FINISH]: {
											value: new Date(2020, 1, 1),
											permissions: [PERMISSION.VIEW],
										},
										[TERM_TYPE.REAL_FINISH]: {
											value: new Date(2020, 2, 1),
											permissions: [PERMISSION.VIEW],
										},
									},
								},
							},
							'2': {
								name: 'test2',
								byJobId: {
									'2': {
										[TERM_TYPE.REAL_START]: {
											value: new Date(2020, 0, 1),
											permissions: [PERMISSION.VIEW],
										},
										[TERM_TYPE.PLANNED_FINISH]: {
											value: new Date(2020, 1, 1),
											permissions: [PERMISSION.VIEW],
										},
										[TERM_TYPE.REAL_FINISH]: {
											value: new Date(2020, 2, 1),
											permissions: [PERMISSION.VIEW],
										},
									},
								},
							},
						},
					},
				},
			},
		});
		expect(screen.queryByText('malowanie stropów, słupów, ścian nad sufitem podwieszanym')).toBeInTheDocument();
		expect(screen.queryByText('Otwarcie ścian GK')).not.toBeInTheDocument();

		fireEvent.select(getByTestId('Selector'), { target: { value: '2' } });
		expect(getByTestId('Selector')).toHaveValue('2');
	});
});
