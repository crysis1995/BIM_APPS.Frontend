import React from 'react';
import Loader from '../../../../../components/Loader';
import { useSelector } from 'react-redux';
import ObjectSelectors from '../../../redux/general_construction/objects/selectors';
import { TableBodyRow } from './Table.Body.Row';
import _ from 'lodash';

type ComponentProps = {
	headerList: ({ key?: string; description: string } | { key: string; description?: string })[];
};

function TableBody(props: ComponentProps) {
	const isLoadingStore = useSelector(ObjectSelectors.ObjectsIsLoading, _.isEqual);
	if (isLoadingStore)
		return (
			<tbody>
				<tr>
					<td colSpan={props.headerList.length}>
						<Loader />
					</td>
				</tr>
			</tbody>
		);
	return <TableBodyElementList headerList={props.headerList} />;
}

function TableBodyElementList(props: ComponentProps) {
	const dataList = useSelector(ObjectSelectors.SortedObjectsSelector, _.isEqual);

	return (
		<tbody className={'tbody_GC'}>
			{dataList.map((item, index) => (
				<TableBodyRow key={index} headerList={props.headerList} data={item} />
			))}
		</tbody>
	);
}

export default TableBody;
