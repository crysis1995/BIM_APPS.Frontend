import React from 'react';
import { connect } from 'react-redux';
import { Badge } from 'react-bootstrap';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import WorkersLog from '../../../../../../../../types';
import { RootState } from '../../../../../../../../../../store';
import LocaleNameComponent from '../../../../../../../../../../localisation/LocaleNameComponent';
import { ActualStatusSelector } from './Selector.ActualStatus';
import { WorkersLogLabourInputColorMap } from '../../../../../../../../redux/labour_input/utils/Constants';

dayjs.extend(isSameOrBefore);

interface ComponentProps {
	objectID: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'];
}

const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	status: ActualStatusSelector(state, componentProps),
});

const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
function ObjectStatusComponent(props: Props) {
	if (props.status) {
		const color = WorkersLogLabourInputColorMap.default?.[props.status]?.color;
		return (
			<Badge
				className={'p-1 small'}
				style={{
					backgroundColor: color,
					color: '#ffffff',
				}}>
				<LocaleNameComponent value={props.status} />
			</Badge>
		);
	}
	return <></>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectStatusComponent);
