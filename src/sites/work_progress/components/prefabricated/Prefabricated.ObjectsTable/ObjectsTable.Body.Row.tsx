import { style } from './index';
import Input from './Input.CheckBox';
import { Badge, Button, Spinner } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GetPrefabricatedObjectsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetPrefabObjects';
import { createSelector } from 'reselect';
import LocaleNameComponent from '../../../../../localisation/LocaleNameComponent';
import { Constants } from '../../../redux/constants';
import { GetPrefabObjectsStatusesType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetPrefabObjectsStatuses';
import PrefabricatedObjectsActions from '../../../redux/prefabricated/objects/actions';
import ObjectSelectors from '../../../redux/prefabricated/objects/selectors';
import { RootState } from '../../../../../state';

type ComponentProps = {
	object: GetPrefabricatedObjectsType.AcceptanceObject;
};

const isSelectedSelector = createSelector(
	ObjectSelectors.Selection,
	(state: RootState, componentProps: { revit_id: number }) => componentProps.revit_id,
	(selection, revit_id) => selection.includes(revit_id),
);

function CheckboxWithRedux(props: { revit_id: number }) {
	const isSelected = useSelector((state: RootState) => isSelectedSelector(state, props));
	const dispatch = useDispatch();
	function HandleSelect() {
		dispatch(PrefabricatedObjectsActions.SelectElements(props.revit_id));
	}
	return <Input OnClick={HandleSelect} checked={isSelected} />;
}

function ObjectsTableBodyRow(props: ComponentProps) {
	function HandleClick() {
		console.log(props.object.revit_id);
	}

	return (
		<tr className={'tr-class'}>
			<td style={style.input}>
				<CheckboxWithRedux revit_id={props.object.revit_id} />
			</td>
			<td style={style.revitID}>
				<Button className={'p-0 m-0'} onClick={HandleClick} variant="link">
					{props.object.revit_id}
				</Button>
			</td>
			<td style={style.dipCode}>{props.object.DIPCode}</td>
			<td style={style.projectNumber}>{props.object.ProjectNumber}</td>
			<td style={style.status}>
				<Status revit_id={props.object.revit_id} />
			</td>
		</tr>
	);
}

export default React.memo(ObjectsTableBodyRow);

const isStatusLoadingSelector = createSelector(
	(state: RootState) => state.WorkProgress.Prefabricated.Objects.statuesLoadingByRevitID,
	(state: RootState, revitID: number) => revitID,
	(statuesLoadingByRevitID, revitID) => {
		return statuesLoadingByRevitID ? statuesLoadingByRevitID[revitID] : false;
	},
);
const StatusSelector = createSelector(
	(state: RootState) => state.WorkProgress.Prefabricated.Objects.statusesByRevitID,
	(state: RootState) => state.WorkProgress.Prefabricated.Objects.allStatuses,
	(state: RootState, revitID: number) => revitID,
	(statusesByRevitID, allStatuses, revitID) => {
		if (!statusesByRevitID || !allStatuses) return null;
		const statusesID = statusesByRevitID[revitID];
		if (!statusesID || statusesID.length === 0) return null;
		const currentStatusID = statusesID[statusesID.length - 1];
		return allStatuses[currentStatusID];
	},
);

const statusesMatcher = {
	[GetPrefabObjectsStatusesType.PrefabStatusEnum.Created]:
		Constants.WorkProgressPrefabricatedColorMap.wp_statuses_created,
	[GetPrefabObjectsStatusesType.PrefabStatusEnum.Approved]:
		Constants.WorkProgressPrefabricatedColorMap.wp_statuses_approved,
	[GetPrefabObjectsStatusesType.PrefabStatusEnum.Mounted]:
		Constants.WorkProgressPrefabricatedColorMap.wp_statuses_mounted,
};

function Status(props: { revit_id: number }) {
	const statusLoading = useSelector((state: RootState) => isStatusLoadingSelector(state, props.revit_id));
	const status = useSelector((state: RootState) => StatusSelector(state, props.revit_id));

	if (statusLoading)
		return (
			<Badge className={'p-1 small'} variant={'secondary'}>
				<Spinner animation="border" size="sm" variant="light" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Badge>
		);
	if (!status) return null;
	return (
		<Badge
			className={'p-1 small'}
			style={{ backgroundColor: statusesMatcher?.[status.status]?.color, color: '#ffffff' }}>
			<LocaleNameComponent value={status.status} />
		</Badge>
	);
}
