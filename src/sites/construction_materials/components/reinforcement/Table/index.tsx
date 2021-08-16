import React from 'react';
import { Table } from 'react-bootstrap';
import { Column, useExpanded, useGroupBy, usePagination, useTable } from 'react-table';
import { RowData } from '../index';

function TableComponent({ columns, data }: { columns: Column<RowData>[]; data: RowData[] }) {
	const {
		getTableProps,
		headerGroups,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		prepareRow,
		getTableBodyProps,
		state: { pageSize, pageIndex },
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: 0,
				pageSize: 20,
			},
		},
		useGroupBy,
		useExpanded,
		usePagination,
	);

	return (
		<div>
			<Table striped hover size={'sm'} {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>
									{column.canGroupBy && (
										<span {...column.getGroupByToggleProps()}>
											{column.isGrouped ? '🛑 ' : '👊 '}
										</span>
									)}
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<td
										{...cell.getCellProps()}
										style={{
											background: cell.isGrouped
												? '#0aff0082'
												: cell.isAggregated
												? '#ffa50078'
												: cell.isPlaceholder
												? '#ff000042'
												: 'white',
										}}>
										{cell.isGrouped ? (
											// If it's a grouped cell, add an expander and row count
											<>
												<span {...row.getToggleRowExpandedProps()}>
													{row.isExpanded ? '👇' : '👉'}
												</span>{' '}
												{cell.render('Cell')} ({row.subRows.length})
											</>
										) : cell.isAggregated ? (
											// If the cell is aggregated, use the Aggregated
											// renderer for cell
											cell.render('Aggregated')
										) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
											// Otherwise, just render the regular cell
											cell.render('Cell')
										)}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</Table>
			<div className="pagination">
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{'<<'}
				</button>{' '}
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
					{'<'}
				</button>{' '}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{'>'}
				</button>{' '}
				<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
					{'>>'}
				</button>{' '}
				<span>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>
				<span>
					| Go to page:{' '}
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							gotoPage(page);
						}}
						style={{ width: '100px' }}
					/>
				</span>{' '}
				<select
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}>
					{[10, 20, 30].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

export default TableComponent;
