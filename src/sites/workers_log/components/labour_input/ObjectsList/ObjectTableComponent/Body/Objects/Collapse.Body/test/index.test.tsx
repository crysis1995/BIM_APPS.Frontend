import React from 'react';
import { render } from '../../../../../../../../../../test/test-utils';
import ObjectsCollapsedListComponent from '../index';
import { RootState } from '../../../../../../../../../../store';
import { RecursivePartial } from '../../../../../../../../../../test/recursivePartial';
import WorkersLog from '../../../../../../../../types';

jest.mock('../Object.Single', () => ({ object }: { object: number }) => <div>single - {object}</div>);
jest.mock(
	'../Object.Group',
	() => ({ groupedObject }: { groupedObject: WorkersLog.LabourInput.Payload.Objects.WorkTimeGroupedObjects }) => (
		<div>grouped - {groupedObject.id}</div>
	),
);

describe('__test__ ObjectsCollapsedListComponent', function () {
	it('should return "Brak elementów" when no elements', function () {
		const initialState: RecursivePartial<RootState> = {
			WorkersLog: { LabourInput: { Objects: { ObjectsGroups: [] } } },
		};

		const component = render(
			<ObjectsCollapsedListComponent actualAccordion={'elements'} eventKey={'elements'} />,
			initialState,
		);

		expect(component.getByText('Brak elementów')).toBeTruthy();
	});
	it('should return valid single elements component', function () {
		const initialState: RecursivePartial<RootState> = {
			WorkersLog: { LabourInput: { Objects: { ObjectsGroups: [1, 2, 3] } } },
		};

		const component = render(
			<ObjectsCollapsedListComponent actualAccordion={'elements'} eventKey={'elements'} />,
			initialState,
		);
		expect(component.getAllByText(/single/i).length).toBe(3);
		expect(component.getAllByText(/single - 1/i).length).toBe(1);
		expect(component.getAllByText(/single - 2/i).length).toBe(1);
		expect(component.getAllByText(/single - 3/i).length).toBe(1);
	});
	it('should return valid multiple elements component', function () {
		const initialState: RecursivePartial<RootState> = {
			WorkersLog: {
				LabourInput: {
					Objects: {
						ObjectsGroups: [
							{ id: 'a', objects: [1, 2, 3], name: 'aaa' },
							{ id: 'b', objects: [4, 5, 6], name: 'bbb' },
						],
					},
				},
			},
		};

		const component = render(
			<ObjectsCollapsedListComponent actualAccordion={'elements'} eventKey={'elements'} />,
			initialState,
		);

		expect(component.getAllByText(/grouped/i).length).toBe(2);
		expect(component.getAllByText(/grouped - a/i).length).toBe(1);
		expect(component.getAllByText(/grouped - b/i).length).toBe(1);
	});
	it('should return valid single and multiple elements component', function () {
		const initialState: RecursivePartial<RootState> = {
			WorkersLog: {
				LabourInput: {
					Objects: {
						ObjectsGroups: [
							1,
							2,
							3,
							{ id: 'a', objects: [1, 2, 3], name: 'aaa' },
							{ id: 'b', objects: [4, 5, 6], name: 'bbb' },
						],
					},
				},
			},
		};

		const component = render(
			<ObjectsCollapsedListComponent actualAccordion={'elements'} eventKey={'elements'} />,
			initialState,
		);


		expect(component.getAllByText(/single/i).length).toBe(3);
		expect(component.getAllByText(/single - 1/i).length).toBe(1);
		expect(component.getAllByText(/single - 2/i).length).toBe(1);
		expect(component.getAllByText(/single - 3/i).length).toBe(1);


		expect(component.getAllByText(/grouped/i).length).toBe(2);
		expect(component.getAllByText(/grouped - a/i).length).toBe(1);
		expect(component.getAllByText(/grouped - b/i).length).toBe(1);
	});
});
