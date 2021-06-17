import React from 'react';
import { connect } from 'react-redux';
import { CMSLoginType } from '../../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../../redux';
import { StatusesColor } from '../../../../settings';
import { Badge } from 'react-bootstrap';
import { LabourInput } from '../../../../../../redux/labour_input/types';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

const mapStateToProps = (
	state: {
		CMSLogin: CMSLoginType.Redux.Store;
		WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
	},
	componentProps: { objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'] },
) => ({
	Statuses: state.WorkersLog.LabourInput.General.Statuses,
	object: state.WorkersLog.LabourInput.Objects.AllObjects
		? state.WorkersLog.LabourInput.Objects.AllObjects[componentProps.objectID]
		: null,
	actualDate: state.WorkersLog.LabourInput.General.ActualDate,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & { objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'] };

function GetActualStatusID(object: LabourInput.Payload.Objects.ObjectWithStatus, actualDate: string | Date) {
	const status = object.statuses.filter((x) => {
		return dayjs(x.date).isSameOrBefore(dayjs(actualDate));
	});
	if (status.length > 0) return status[status.length - 1].status;
	else return null;
}

function ObjectStatusComponent(props: Props) {
	if (props.object && props.Statuses) {
		const objectStatus = GetActualStatusID(props.object, props.actualDate);
		if (objectStatus) {
			const statusName = props.Statuses[objectStatus].name.toLowerCase() as 'in progress' | 'finished';
			const color = StatusesColor[statusName];
			return (
				<Badge
					className={'p-1 small'}
					style={{
						backgroundColor: color,
						color: '#ffffff',
					}}>
					{statusName}
				</Badge>
			);
		}
	}

	return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectStatusComponent);
