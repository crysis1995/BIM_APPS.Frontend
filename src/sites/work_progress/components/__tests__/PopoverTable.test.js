import PopoverTable from '../PopoverTable';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
const labels = ['Pomieszczenie', 'Wartości robót'];
describe('Test PopoverTable Component', () => {
	test('should render properly values', () => {
		render(<PopoverTable content={[[['1.111'], ['warstwa 1', 'warstwa 2']]]} labels={labels} />);
		expect(screen.getByText('1.111')).toBeInTheDocument();
		expect(screen.getByText('warstwa 1')).toBeInTheDocument();
		expect(screen.getByText('warstwa 2')).toBeInTheDocument();
		expect(screen.getByText('Pomieszczenie')).toBeInTheDocument();
		expect(screen.getByText('Wartości robót')).toBeInTheDocument();
	});
	test('should render properly without values', async () => {
		render(<PopoverTable content={[[[], []]]} labels={labels} />);

		expect(screen.getByText('Pomieszczenie')).toBeInTheDocument();
		expect(screen.getByText('Wartości robót')).toBeInTheDocument();
	});
});
