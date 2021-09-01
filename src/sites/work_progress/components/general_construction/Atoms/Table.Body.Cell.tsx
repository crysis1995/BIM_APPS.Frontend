import React from 'react';
import { QueryAcceptanceObjectsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/QueryAcceptanceObjects';
import UNITS from '../../../../../components/Units';
import Status from './Status';

type ComponentProps = {
	item: QueryAcceptanceObjectsType.AcceptanceObject;
	header: { key?: string; description: string } | { key: string; description?: string };
};
export function CellContent({ item, header }: ComponentProps) {
	if (header.key) {
		const key = header.key as keyof QueryAcceptanceObjectsType.AcceptanceObject;
		switch (key) {
			case 'revit_id' || 'vertical':
				return item?.[key];
			case 'area':
				const areaValue = item?.[key];
				return areaValue ? <UNITS.M2 children={areaValue} /> : null;
			case 'volume':
				const volumeValue = item?.[key];
				return volumeValue ? <UNITS.M3 children={volumeValue} /> : null;
			case 'running_meter':
				const runningMetreValue = item?.[key];
				return runningMetreValue ? <UNITS.CM children={runningMetreValue} /> : null;
			case 'statuses':
				const revit_id = item.revit_id;
				return revit_id ? <Status item={revit_id} /> : null;
			default:
				return null;
		}
	}
	if (header.description) return item.details?.[header.description];
	return null;
}
