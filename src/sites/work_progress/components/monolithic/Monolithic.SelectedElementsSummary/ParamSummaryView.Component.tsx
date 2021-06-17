import { ObjectParams } from '../../../redux/utils/ObjectGroupClassifier';
import UNITS from '../../../../../components/Units';
import React from 'react';

export function ParamSummaryView(props: { paramType: ObjectParams; paramValue: number | undefined }) {
	switch (props.paramType) {
		case 'volume':
			return <UNITS.M3>{props.paramValue || 0}</UNITS.M3>;
		case 'area':
			return <UNITS.M2>{props.paramValue || 0}</UNITS.M2>;
		case 'running_meter':
			return <UNITS.CM>{props.paramValue || 0}</UNITS.CM>;
		default:
			return null;
	}
}