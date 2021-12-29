import React from 'react';
import TableBodySelectionCell from './Table.Body.SelectionCell';
import { EUnit, Units } from '../../../../components/Units';
import { Element } from '../../../../generated/graphql';
import { CommentsCounter } from './Table.Cell.ElementCommentsCounter';

type ComponentProps = {
	// headerList: ({ key?: string; description: string } | { key: string; description?: string })[];
	item: Element;
};

export function TableBodyRow(props: ComponentProps) {
	return (
		<>
			<tr>
				<TableBodySelectionCell element={props.item} />
				<td className={'text-right'}>{props.item.revitId}</td>
				<td className={'text-right'}>{props.item.craneId}</td>
				<td className={'text-right'}>{props.item.levelId}</td>
				<td className={'text-center'}>{props.item.vertical}</td>
				<td className={'text-right'}>{props.item.rotationDay}</td>
				<td className={'text-center'}>{props.item.realisationMode}</td>
				<td className={'text-right'}>
					<Units unit={EUnit.M3}>{props.item.volume}</Units>
				</td>
				<td className={'text-right'}>
					<Units unit={EUnit.CM}>{props.item.runningMetre}</Units>
				</td>
				<td className={'text-right'}>
					<Units unit={EUnit.M2}>{props.item.area}</Units>
				</td>
				<CommentsCounter element={props.item} />
			</tr>
		</>
	);
}
