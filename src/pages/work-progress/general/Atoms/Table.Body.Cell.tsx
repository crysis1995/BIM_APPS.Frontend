// import React from 'react';
// import { QueryAcceptanceObjectsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/QueryAcceptanceObjects';
// import { EUnit, Units } from '../../../../../components/Units';
// import Status from './Status';
//
// type ComponentProps = {
// 	item: QueryAcceptanceObjectsType.AcceptanceObject;
// 	header: { key?: string; description: string } | { key: string; description?: string };
// };
//
// const KeyToComponentMap: {
// 	[K in keyof QueryAcceptanceObjectsType.AcceptanceObject]?: (
// 		item: QueryAcceptanceObjectsType.AcceptanceObject,
// 	) => React.ReactElement;
// } = {
// 	revit_id: (item) => {
// 		return <>{item?.revit_id}</>;
// 	},
// 	VCF_Realisation: (item) => <>{item?.VCF_Realisation}</>,
// 	vertical: (item) => <>{item?.vertical}</>,
// 	area: (item) => {
// 		const areaValue = item?.area;
// 		return areaValue ? <Units unit={EUnit.M2}>{areaValue}</Units> : <></>;
// 	},
// 	volume: (item) => {
// 		const volumeValue = item?.volume;
// 		return volumeValue ? <Units unit={EUnit.M3}>{volumeValue}</Units> : <></>;
// 	},
// 	running_meter: (item) => {
// 		const runningMetreValue = item?.running_meter;
// 		return runningMetreValue ? <Units unit={EUnit.CM}>{runningMetreValue}</Units> : <></>;
// 	},
// 	statuses: (item) => {
// 		const revit_id = item.revit_id;
// 		return revit_id ? <Status item={revit_id} /> : <></>;
// 	},
// };
//
// export function CellContent({ item, header }: ComponentProps) {
// 	if (header.key) {
// 		const key = header.key as keyof QueryAcceptanceObjectsType.AcceptanceObject;
// 		return KeyToComponentMap[key]?.(item);
// 	}
// 	if (header.description) return item.details?.[header.description];
// 	return null;
// }

export {}