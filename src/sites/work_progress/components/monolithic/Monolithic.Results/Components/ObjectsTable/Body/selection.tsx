import React from 'react';
import { RootState } from '../../../../../../../../store';
import { connect } from 'react-redux';
import WorkProgressMonolithicUpgradingActions from '../../../../../../redux/monolithic/upgrading/actions';
import { createSelector } from 'reselect';
import { Constants } from '../../../../../../redux/constants';

const isElementSelectedSelector = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.selectedElements,
	(state: RootState, componentProps: ComponentProps) => componentProps.revitID,
	(selectedElements, revitID) => selectedElements.includes(revitID),
);
const isSelectionDisabledSelector = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.byRevitIdWithStatuses,
	(state: RootState, componentProps: ComponentProps) => componentProps.revitID,
	(byRevitIdWithStatuses, revitID) => {
		if (byRevitIdWithStatuses && revitID && byRevitIdWithStatuses[revitID]) {
			const data = byRevitIdWithStatuses[revitID];
			if (data === Constants.WorkProgressElementStatus.Finished) return true;
		}
		return false;
	},
);

type ComponentProps = {
	revitID: number;
};
const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	isSelected: isElementSelectedSelector(state, componentProps),
	isDisabled: isSelectionDisabledSelector(state, componentProps),
});
const mapDispatchToProps = {
	SelectElements: WorkProgressMonolithicUpgradingActions.SelectElements,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function Selection(props: Props) {
	const handleSelect = () => {
		props.SelectElements(props.revitID);
	};

	return (
		<input
			type="checkbox"
			checked={props.isSelected}
			disabled={props.isDisabled}
			value={props.revitID}
			onChange={handleSelect}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
