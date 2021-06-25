import WorkersLog from '../../../../../../../../types';
import classNames from 'classnames';
import React from 'react';
import { RootState } from '../../../../../../../../../../store';
import { isCheckedSelector } from '../Object.Single/Selector.IsChecked';
import LabourInputObjectsActions from '../../../../../../../../redux/labour_input/objects/actions';
import { connect } from 'react-redux';

type ComponentProps = { show: boolean; object: WorkersLog.LabourInput.Payload.Objects.SingleObject };

const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	isChecked: isCheckedSelector(state, componentProps),
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
			<td className={'pl-4'} colSpan={4}>
				<small>
					<input className={'mr-2'} type="checkbox" checked={props.isChecked} onClick={handleSelect} />
					{props.object}
				</small>
			</td>
		</tr>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupBodyRow);
