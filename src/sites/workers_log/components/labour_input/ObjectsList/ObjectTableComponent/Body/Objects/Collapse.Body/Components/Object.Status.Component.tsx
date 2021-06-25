import React from 'react';
import { connect } from 'react-redux';
import { StatusesColor } from '../../../../../../settings';
import { Badge } from 'react-bootstrap';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import WorkersLog from '../../../../../../../../types';
import { RootState } from '../../../../../../../../../../store';

dayjs.extend(isSameOrBefore);

const mapStateToProps = (
	state: RootState,
	componentProps: { objectID: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'] },
) => ({
	object: state.WorkersLog.LabourInput.Objects.AllObjects
		? state.WorkersLog.LabourInput.Objects.AllObjects[componentProps.objectID]
		: null,
	actualDate: state.WorkersLog.LabourInput.General.ActualDate,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & { objectID: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'] };

function GetActualStatusID(object: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus, actualDate: string | Date) {
	const status = object.statuses.filter((x) => {
		return dayjs(x.date).isSameOrBefore(dayjs(actualDate));
	});
	if (status.length > 0) return status[status.length - 1].status;
	else return null;
}

function ObjectStatusComponent(props: Props) {
	if (props.object) {
		const objectStatus = GetActualStatusID(props.object, props.actualDate);
		if (objectStatus) {
			const color = StatusesColor[objectStatus];
			return (
				<Badge
					className={'p-1 small'}
					style={{
						backgroundColor: color,
						color: '#ffffff',
					}}>
					{objectStatus}
				</Badge>
			);
		}
	}

	return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectStatusComponent);
