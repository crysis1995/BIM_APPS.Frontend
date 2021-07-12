import { ArrowIcon } from '../../OtherWork/Utils/ArrowIcon';
import { EDirection } from '../../types/EDirection';
import LocaleNameComponent from '../../../../../../../../../localisation/LocaleNameComponent';
import React from 'react';
import { RootState } from '../../../../../../../../../store';
import { connect } from 'react-redux';
import LabourInputObjectsActions from '../../../../../../../redux/labour_input/objects/actions';
import { isGroupCreatorDisabledSelector } from './Selector.IsGroupCreatorDisabled';
import ShowComponent from '../../../../../../../../../components/ShowComponent';
import { summaryWorkedTimeSelector } from './Selector.SummaryWorkedTime';
import { GroupButton } from './Utils/Group.Button';
import { SelectButton } from './Utils/Select.Button';

type ComponentProps = {
	eventKey: 'elements';
	setAccordion: (value: ((prevState: string | null) => string | null) | string | null) => void;
	actualAccordion: string | null;
};

const mapStateToProps = (state: RootState) => ({
	isGroupCreatorDisabled: isGroupCreatorDisabledSelector(state),
	Selection: state.WorkersLog.LabourInput.Objects.Selection,
	FilteredObjects: state.WorkersLog.LabourInput.Objects.FilteredObjects,
	summaryWorkedTime: summaryWorkedTimeSelector(state),
});

const mapDispatchToProps = {
	GroupObjectsInit: LabourInputObjectsActions.GroupObjectsInit,
	SelectObject: LabourInputObjectsActions.SelectObject,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function ObjectsHeaderComponent(props: Props) {
	const decoratedOnClick = () => props.setAccordion((prev) => (prev === props.eventKey ? null : props.eventKey));
	function HandleGroupCreate() {
		props.GroupObjectsInit(props.Selection);
	}

	function HandleSelection() {
		props.SelectObject(props.Selection.length > 0 ? [] : props.FilteredObjects);
	}
	return (
		<tr>
			<th colSpan={2}>
				<ArrowIcon
					onClick={decoratedOnClick}
					direction={props.actualAccordion === props.eventKey ? EDirection.Down : EDirection.Up}
				/>
				<span className={'ml-2'}>
					<LocaleNameComponent value={props.eventKey} />
				</span>
			</th>
			<th>
				<ShowComponent when={props.actualAccordion === props.eventKey}>
					<GroupButton groupCreatorDisabled={props.isGroupCreatorDisabled} onClick={HandleGroupCreate} />
					<SelectButton selectionDisabled={false} onClick={HandleSelection} />
				</ShowComponent>
			</th>
			<th>{props.summaryWorkedTime}</th>
		</tr>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectsHeaderComponent);
