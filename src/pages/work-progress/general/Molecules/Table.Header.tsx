import React, { useContext } from 'react';
import TableHeaderCell from '../Atoms/Table.Header.Cell';
// import { HeaderSelectionCell } from './Table.Header.SelectionCell';
// import { useSelector } from 'react-redux';
// import ObjectSelectors from '../../../redux/general_construction/objects/selectors';
// import { UserProjectsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/UserProjects';
// import { QueryAcceptanceObjectsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/QueryAcceptanceObjects';
// import { RootState } from '../../../../../state';
import { CustomParams } from '../../../../generated/graphql';
// import { Context } from '../Pages/Page.Index';
import { HeaderSelectionCell } from './Table.Header.SelectionCell';

// type Header =
// 	| { key?: string; description: string; valueTypes?: UserProjectsType.ValueType[] }
// 	| { key: string; description?: string; valueTypes?: UserProjectsType.ValueType[] };
// type HeaderList = CustomParams[];

export type ComponentProps = {
	columns: CustomParams[];
};
const defaultProps: ComponentProps = {
	columns: [],
};

// function SummaryCell(props: { header: Header }) {
// 	const selectedCount = useSelector((state: RootState) =>
// 		ObjectSelectors.ObjectsSumBy(
// 			state,
// 			props.header.key as keyof QueryAcceptanceObjectsType.AcceptanceObject,
// 		),
// 	);
// 	if (
// 		!['revit_id', null, undefined].includes(props.header.key) &&
// 		props.header.valueTypes?.includes(UserProjectsType.ValueType.Number)
// 	) {
// 		return <>{selectedCount}</>;
// 	}
// 	return <></>;
// }

// function SummaryRow(props: ComponentProps) {
// 	const selectedCount = useSelector(ObjectSelectors.ObjectsSelectedCount);
// 	if (!(selectedCount > 0)) return null;
// 	return (
// 		<tr className={'tr_GC'}>
// 			<th style={{ width: 50 }} />
// 			{props.headerList.map((header, index) => (
// 				<th key={index}>
// 					<SummaryCell header={header} />
// 				</th>
// 			))}
// 		</tr>
// 	);
// }

function TableHeader(props: ComponentProps) {
	// const value = useContext(Context);
	return (
		<thead>
			<tr style={{ width: '10%' }} className={'small'}>
				<HeaderSelectionCell />
				{props.columns.map((header, index) => (
					<TableHeaderCell key={index} header={header} />
				))}
				<th className={'text-right'}>Comments</th>
				{/*<th/>*/}
			</tr>
			{/*<SummaryRow columns={props.columns} />*/}
		</thead>
	);
}
TableHeader.defaultProps = defaultProps;

export default TableHeader;
