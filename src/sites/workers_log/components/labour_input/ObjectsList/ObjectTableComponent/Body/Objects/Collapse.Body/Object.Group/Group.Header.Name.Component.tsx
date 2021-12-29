import WorkersLog from '../../../../../../../../types';
import React from 'react';

import { objectGroupNameSelector } from './Selector.ObjectGroupName';
import LabourInputObjectsActions from '../../../../../../../../redux/labour_input/objects/actions';
import { connect } from 'react-redux';
import ShowComponent from '../../../../../../../../../../components/ShowComponent';
import ComponentObjectRevitID from '../Components/Component.Object.RevitID';
import { TooltipComponent } from '../../../../../../../../../../components/Tooltip';
import { RootState } from '../../../../../../../../../../state';

type ComponentProps = {
	groupedObject: WorkersLog.LabourInput.Payload.Objects.WorkTimeGroupedObjects;
};
const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	objectGroupName: objectGroupNameSelector(state, componentProps),
});

const mapDispatchToProps = {
	SelectObject: LabourInputObjectsActions.SelectObject,
	UngroupObjectsInit: LabourInputObjectsActions.UngroupObjectsInit,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
function GroupHeaderNameComponent(props: Props) {
	return (
		<span className={'ml-2'}>
			<TooltipComponent show={true} message={props.objectGroupName?.long || ''}>
				<>{props.objectGroupName?.short || 'Brak nazwy'}</>
			</TooltipComponent>
			<ShowComponent when={props.groupedObject.objects.length === 1}>
				<span className={'text-muted ml-2'}>
					<small>
						<u>
							[ <ComponentObjectRevitID objectID={props.groupedObject.objects[0].id} /> ]
						</u>
					</small>
				</span>
			</ShowComponent>
		</span>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupHeaderNameComponent);
