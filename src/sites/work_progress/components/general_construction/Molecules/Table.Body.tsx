import React from 'react';
import Loader from '../../../../../components/Loader';
import { useSelector } from 'react-redux';
import ObjectSelectors from '../../../redux/general_construction/objects/selectors';
import { TableBodyRow } from './Table.Body.Row';

type ComponentProps = {
	headerList: ({ key?: string; description: string } | { key: string; description?: string })[];
};

function TableBody(props: ComponentProps) {
	const isDataLoading = useSelector(ObjectSelectors.ObjectsIsLoading);
	const DataList = useSelector(ObjectSelectors.Objects);

	if (isDataLoading)
		return (
			<tbody>
				<tr>
					<td colSpan={props.headerList.length}>
						<Loader />
					</td>
				</tr>
			</tbody>
		);
	return (
		<tbody>
			{DataList.map((item, index) => (
				<TableBodyRow key={index} headerList={props.headerList} item={item} />
			))}
		</tbody>
	);
}

export default TableBody;
