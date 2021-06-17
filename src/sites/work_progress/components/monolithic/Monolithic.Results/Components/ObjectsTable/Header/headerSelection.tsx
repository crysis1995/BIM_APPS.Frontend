import React, { useEffect, useState } from 'react';
import { RootState } from '../../../../../../../../store';
import { connect } from 'react-redux';
import WorkProgressMonolithicUpgradingActions from '../../../../../../redux/monolithic/upgrading/actions';
import { createSelector } from 'reselect';
import { Constants } from '../../../../../../redux/constants';

const GetElementsToSelect = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.byRevitIdWithStatuses,
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.actualElements,
	(byRevitIdWithStatuses, actualElements) => {
		return actualElements.filter(
			(revitID) => byRevitIdWithStatuses?.[revitID] !== Constants.WorkProgressElementStatus.Finished,
		);
	},
);

const mapStateToProps = (state: RootState) => ({
	selectedElements: state.WorkProgress.Monolithic.Upgrading.selectedElements,
	elementsToSelect: GetElementsToSelect(state),
});

const mapDispatchToProps = {
	SelectElements: WorkProgressMonolithicUpgradingActions.SelectElements,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function HeaderSelection(props: Props) {
	const [isSelect, setIsSelect] = useState(false);
	const ref = React.useRef<HTMLInputElement>(null);

	function handleSelectAll() {
		if (props.selectedElements.length < props.elementsToSelect.length) props.SelectElements(props.elementsToSelect);
		else props.SelectElements([]);
	}

	useEffect(() => {
		if (props.selectedElements.length === props.elementsToSelect.length && props.selectedElements.length !== 0) {
			setIsSelect(true);
			ref.current && (ref.current.indeterminate = false);
		} else {
			if (props.selectedElements.length === 0) ref.current && (ref.current.indeterminate = false);
			else ref.current && (ref.current.indeterminate = true);
			setIsSelect(false);
		}
	}, [props.selectedElements, props.elementsToSelect]);

	return <input type="checkbox" checked={isSelect} onChange={handleSelectAll} ref={ref} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSelection);
