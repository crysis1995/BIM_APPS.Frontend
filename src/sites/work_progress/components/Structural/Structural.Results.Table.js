import React from 'react';
import { connect } from 'react-redux';
import { useTable, useSortBy, useRowSelect } from 'react-table';
import { v4 } from 'uuid';
import UNITS from '../../../../components/Units';
import { Table } from 'react-bootstrap';
import { RoundNumber } from '../../../../utils/RoundNumber';
import { objectSelector } from './Structural.Results.Selector';

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = React.useRef();
	const resolvedRef = ref || defaultRef;

	React.useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			<input type="checkbox" ref={resolvedRef} {...rest} />
		</>
	);
});

function ResultsTable(props) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		rows,
		prepareRow,
		selectedFlatRows,
		state: { selectedRowIds },
	} = useTable(
		{
			columns: props.columns,
			data: props.objects,
		},
		useSortBy,
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => [
				// Let's make a column for selection
				{
					id: 'selection',
					// The header can use the table's getToggleAllRowsSelectedProps method
					// to render a checkbox
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
						</div>
					),
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
					Cell: ({ row }) => (
						<div>
							<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
						</div>
					),
				},
				...columns,
			]);
		},
	);

	return (
		// <Table size={'sm'}>
		// 	<tr>
		// 		{/*<th data-index="Id">Revit ID</th>*/}
		// 		{/*<th data-index="Revit category">Revit category</th>*/}
		// 		<th data-index="Comments">Typ elementu</th>
		// 		{/*<th data-index="Vertical">Wertykalność</th>*/}
		// 		<th data-index="Volume">Objętość</th>
		// 		<th data-index="Length">Długość</th>
		// 		<th data-index="Area">Powierzchnia</th>
		// 	</tr>
		// 	{props.objects.length > 0 &&
		// 		props.objects.map((item) => (
		// 			<tr key={v4()}>
		// 				{['Comments', 'Volume', 'Length', 'Area'].map((key) => (
		// 					<td>
		// 						{(key === 'Area' && item[key] && <UNITS.M2>{item[key]}</UNITS.M2>) ||
		// 							(key === 'Volume' && item[key] && <UNITS.M3>{item[key]}</UNITS.M3>) ||
		// 							(key === 'Length' && item[key] && <UNITS.CM>{item[key]}</UNITS.CM>) ||
		// 							(item[key] && item[key]) ||
		// 							'-'}
		// 					</td>
		// 				))}
		// 			</tr>
		// 		))}
		// </Table>
		<Table size={'sm'} {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps(column.getSortByToggleProps())}>
								{column.render('Header')}
								{/* Add a sort direction indicator */}
								<span>
									{column.isSorted ? (
										column.isSortedDesc ? (
											<svg
												width="1em"
												height="1em"
												viewBox="0 0 16 16"
												className="bi bi-arrow-down-short"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg">
												<path
													fill-rule="evenodd"
													d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
												/>
											</svg>
										) : (
											<svg
												width="1em"
												height="1em"
												viewBox="0 0 16 16"
												class="bi bi-arrow-up-short"
												fill="currentColor"
												xmlns="http://www.w3.org/2000/svg">
												<path
													fill-rule="evenodd"
													d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
												/>
											</svg>
										)
									) : (
										''
									)}
								</span>
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row, i) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
			<tfoot>
				{footerGroups.map((group) => (
					<tr {...group.getFooterGroupProps()}>
						{group.headers.map((column) => (
							<td {...column.getFooterProps()}>{column.render('Footer')}</td>
						))}
					</tr>
				))}
			</tfoot>
		</Table>
	);
}

const mapStateToProps = (state) => ({
	objects: objectSelector(state),
	columns: [
		{
			Header: 'Typ elementu',
			accessor: 'Comments',
			Footer: (info) => {
				// Only calculate total visits if rows change
				const total = React.useMemo(() => RoundNumber(info.rows.reduce((sum) => 1 + sum, 0)), [info.rows]);

				return <>Elementów: {total}</>;
			},
		},
		{
			Header: 'Objętość',
			accessor: 'Volume',
			Footer: (info) => {
				// Only calculate total visits if rows change
				const total = React.useMemo(
					() => RoundNumber(info.rows.reduce((sum, row) => row.values.Volume + sum, 0)),
					[info.rows],
				);

				return <>Suma: {total}</>;
			},
		},
		{
			Header: 'Długość',
			accessor: 'Length',
		},
		{
			Header: 'Powierzchnia',
			accessor: 'Area',
		},
	],
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTable);
