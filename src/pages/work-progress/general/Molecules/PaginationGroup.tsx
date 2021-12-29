import React, { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { PaginationContext } from '../Organisms/ElementContainer';
import { GenerateValues } from '../Utils/GeneratePaginationValues';

export default function PaginationGroup() {
	const [value, setValue] = useContext(PaginationContext);
	function HandleClick(index: number) {
		setValue((prev) => ({ ...prev, currentPage: index }));
	}
	return (
		<Pagination>
			<Pagination.First onClick={() => HandleClick(0)} />
			<Pagination.Prev
				onClick={() => HandleClick(value.currentPage > 0 ? value.currentPage - 1 : 0)}
			/>
			{GenerateValues(value.currentPage, 0, value.pagesCount).map((index) =>
				index === null ? (
					<Pagination.Ellipsis />
				) : (
					<Pagination.Item
						active={index === value.currentPage}
						onClick={() => HandleClick(index)}>
						{index + 1}
					</Pagination.Item>
				),
			)}
			<Pagination.Next
				onClick={() =>
					HandleClick(
						value.currentPage < value.pagesCount
							? value.currentPage + 1
							: value.pagesCount,
					)
				}
			/>
			<Pagination.Last onClick={() => HandleClick(value.pagesCount)} />
		</Pagination>
	);
}
