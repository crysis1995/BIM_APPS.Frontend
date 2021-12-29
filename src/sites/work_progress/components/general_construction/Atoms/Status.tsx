import React from 'react';
import { useSelector } from 'react-redux';
import { Badge, Spinner } from 'react-bootstrap';
import LocaleNameComponent from '../../../../../localisation/LocaleNameComponent';
import ObjectSelectors from '../../../redux/general_construction/objects/selectors';
import _ from 'lodash';
import { Constants } from '../../../redux/constants';
import { GetObjectsByLevelType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import { RootState } from '../../../../../state';

type ComponentProps = {
	item: number;
};

const statusesMatcher = {
	[GetObjectsByLevelType.StatusEnum.InProgress]:
		Constants.WorkProgressGeneralConstructionColorMap.wp_statuses_in_progress,
	[GetObjectsByLevelType.StatusEnum.Finished]: Constants.WorkProgressGeneralConstructionColorMap.wp_statuses_finished,
};

function Status(props: ComponentProps) {
	const statusLoading = useSelector((state: RootState) => ObjectSelectors.ObjectStatusIsLoading(state, props));
	const status = useSelector((state: RootState) => ObjectSelectors.ObjectStatus(state, props), _.isEqual);
	if (statusLoading)
		return (
			<Badge className={'p-1 small'} variant={'secondary'}>
				<Spinner animation="border" size="sm" variant="light" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Badge>
		);

	if (status)
		return (
			<Badge
				className={'p-1 small'}
				// @ts-ignore
				style={{ backgroundColor: statusesMatcher?.[status.status]?.color, color: '#ffffff' }}>
				<LocaleNameComponent value={status.status} />
			</Badge>
		);
	return null;
}

export default Status;
