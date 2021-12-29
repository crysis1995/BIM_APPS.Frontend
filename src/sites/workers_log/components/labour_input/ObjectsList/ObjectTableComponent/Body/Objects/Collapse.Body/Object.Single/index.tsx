import React from 'react';
import ActualEventKeyRowViewer from '../../../OtherWork/Utils/ActualEventKeyRowViewer';
import WorkersLog from '../../../../../../../../types';
import ObjectTimeInputComponent from './Object.TimeInput.Component';
import { connect } from 'react-redux';
import LabourInputObjectsActions from '../../../../../../../../redux/labour_input/objects/actions';
import { isCheckedSelector } from './Selector.IsChecked';

import ObjectNameComponent from '../Components/Object.Name.Component';
import ObjectStatusComponent from '../Components/Object.Status.Component';
import { RootState } from '../../../../../../../../../../state';

export type ComponentProps = {
	object: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'];
	show: boolean;
};

const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	isChecked: isCheckedSelector(state, componentProps),
});
const mapDispatchToProps = {
	SelectObject: LabourInputObjectsActions.SelectObject,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function ObjectSingle(props: Props) {
	function HandleClick() {
		props.SelectObject(props.object);
	}

	return (
		<ActualEventKeyRowViewer show={props.show}>
			<td colSpan={2} className={'pl-3'}>
				<input className={'mr-2'} type="checkbox" checked={props.isChecked} onClick={HandleClick} />
				<ObjectNameComponent objectID={props.object} />
			</td>
			<td>
				<ObjectStatusComponent objectID={props.object} />
			</td>
			<ObjectTimeInputComponent objectID={props.object} />
		</ActualEventKeyRowViewer>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectSingle);
