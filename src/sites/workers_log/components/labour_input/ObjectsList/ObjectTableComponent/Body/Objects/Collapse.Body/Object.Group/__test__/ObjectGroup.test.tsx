import { render } from '@testing-library/react';
import ObjectGroup from '../index';
import WorkersLog from '../../../../../../../../../types';
import React from 'react';
import GroupHeader from '../Group.Header';

jest.mock('../Group.Header', () => {
	return {
		__esModule: true,
		default: jest.fn(() => <div>Header</div>),
	};
});
jest.mock('../Group.Body', () => () => <div>Body</div>);

afterEach(() => {
	jest.clearAllMocks();
});

describe('__test__ ObjectGroup component', function () {
	describe('should render GroupHeader', function () {
		it('should render default', function () {
			const groupedObject: WorkersLog.LabourInput.Payload.Objects.WorkTimeGroupedObjects = {
				id: '762c53c0-d6c7-431f-a8b3-60b60597a945',
				name: 'royalty',
				// @ts-ignore
				objects: [628, 765, 237, 819, 405],
			};
			const { getByText } = render(
				<ObjectGroup
					groupedObject={groupedObject}
					eventKey={'elements'}
					actualAccordion={null}
					setGroupedAccordion={() => {}}
					groupAccordion={null}
				/>,
			);
			expect(getByText(/header/i)).toBeTruthy();
			expect(getByText(/body/i)).toBeTruthy();
		});
		it('should render when actualAccordion is different than "element"', function () {
			const {} = render(
				<ObjectGroup
					// @ts-ignore
					groupedObject={{ id: '', objects: [], name: '' }}
					eventKey={'elements'}
					actualAccordion={null}
					setGroupedAccordion={() => {}}
					groupAccordion={null}
				/>,
			);

			expect(GroupHeader).toHaveBeenCalledWith(
				{
					groupedObject: { id: '', objects: [], name: '' },
					groupAccordion: null,
					setGroupedAccordion: () => {},
					show: false,
				},
				{},
			);
		});
	});

	it('should render GroupBody', function () {});

	it('should ', function () {});
});
