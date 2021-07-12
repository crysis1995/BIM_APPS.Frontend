import WorkersLog from '../../../../../../../../types';
import classNames from 'classnames';
import React from 'react';
import { RootState } from '../../../../../../../../../../store';
import { isCheckedSelector } from '../Object.Single/Selector.IsChecked';
import LabourInputObjectsActions from '../../../../../../../../redux/labour_input/objects/actions';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ObjectStatusComponent from '../Components/Object.Status.Component';

type ComponentProps = { show: boolean; object: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'] };

const objectSelector = createSelector(
	(state: RootState) => state.WorkersLog.LabourInput.Objects.AllObjects,
	(state: RootState, componentProps: ComponentProps) => componentProps.object,
	(allObjects, object) => {
		if (allObjects && allObjects[object]) return allObjects[object];
	},
);

const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	isChecked: isCheckedSelector(state, componentProps),
	objectData: objectSelector(state, componentProps),
});
const mapDispatchToProps = {
	SelectObject: LabourInputObjectsActions.SelectObject,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function GroupBodyRow(props: Props) {
	function handleSelect() {
		props.SelectObject(props.object);
	}
	return (
		<tr
			className={classNames({
				collapse: true,
				show: props.show,
			})}>
			<td className={'pl-4'} colSpan={2}>
				<small>
					<input className={'mr-2'} type="checkbox" checked={props.isChecked} onClick={handleSelect} />
					{props.objectData ? (
						<>
							<span className={'mr-1'}>{props.objectData.VCF_Realisation}</span>
							<span className={'text-muted'}>
								<small>
									<u>[ {props.objectData.revit_id} ]</u>
								</small>
							</span>
						</>
					) : (
						props.object
					)}
				</small>
			</td>
			<td colSpan={2}>
				<ObjectStatusComponent objectID={props.object} />
			</td>
		</tr>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupBodyRow);
