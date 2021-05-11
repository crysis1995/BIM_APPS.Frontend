import React from 'react';
import { LabourInput } from '../../../../../redux/labour_input/types';
import ObjectSelectionComponent from './Object.Selection.Component';
import ObjectTimeInputComponent from './Object.TimeInput.Component';
import ObjectStatusComponent from './Object.Status.Component';
import ObjectNameComponent from './Object.Name.Component';

function RowObjectComponent(props: { objectID: LabourInput.Payload.Objects.ObjectWithStatus['id'] }) {
	// const [status, setStatus] = useState<number | null>(null);
	// useEffect(() => {
	// 	function GetActualStatusID(object: LabourInput.Payload.Objects.ObjectWithStatus) {
	// 		const status = object.statuses.filter((x) => {
	// 			return dayjs(x.date).isSameOrBefore(dayjs(props.ActualDate));
	// 		});
	// 		if (status.length > 0) setStatus(status[status.length - 1].status);
	// 	}
	// 	GetActualStatusID(props.object);
	// }, [props.ActualDate]);

	console.count('ItemComponent');
	return (
		<tr>
			<td>
				<ObjectSelectionComponent objectID={props.objectID} />
			</td>
			<td>
				<ObjectNameComponent objectID={props.objectID} />
			</td>
			<td>
				<ObjectStatusComponent objectID={props.objectID} />
			</td>
			<ObjectTimeInputComponent objectID={props.objectID} />
		</tr>
	);
}

export default RowObjectComponent;
