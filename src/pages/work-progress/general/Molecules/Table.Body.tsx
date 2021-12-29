import React, { useContext } from 'react';
// import Loader from '../../../../../components/Loader';
import './hover.scss';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Loader from '../../../../components/Loader';
import { WorkProgress } from '../../../../state/WorkProgress';
import { ComponentProps } from './Table.Header';
import { PaginationContext, PaginationContextType } from '../Organisms/ElementContainer';
import { createSelector } from 'reselect';
import { RootState } from '../../../../state';
import { TableBodyRow } from './Table.Body.Row';

function TableBody(props: ComponentProps) {
	const isLoadingStore = useSelector(
		WorkProgress.Selectors.Elements.IsElementsLoading,
		_.isEqual,
	);
	if (isLoadingStore)
		return (
			<tbody>
				<tr>
					<td colSpan={props.columns.length}>
						<Loader />
					</td>
				</tr>
			</tbody>
		);
	return <TableBodyElementList columns={props.columns} />;
}

const paginatedDataSelector = createSelector(
	WorkProgress.Selectors.Elements.GetAllElementsByIdAsList,
	(state: RootState, asd: PaginationContextType) => asd,
	(data, { currentPage, pageSize }) => {
		const startIndex = currentPage * pageSize;
		const endIndex = startIndex + pageSize;
		return data.slice(startIndex, endIndex);
	},
);

function TableBodyElementList(props: ComponentProps) {
	const [value, setter] = useContext(PaginationContext);

	const data = useSelector((state: RootState) => paginatedDataSelector(state, value), _.isEqual);

	return (
		<tbody className={'small'}>
			{data.map((item, index) => (
				<TableBodyRow item={item} key={index} />
			))}
		</tbody>
	);
}

export default TableBody;
