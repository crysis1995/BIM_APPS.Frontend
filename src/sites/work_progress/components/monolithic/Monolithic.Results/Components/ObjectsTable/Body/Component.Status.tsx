import React from 'react';
import { Badge } from 'react-bootstrap';
import { RootState } from '../../../../../../../../store';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Constants } from '../../../../../../redux/constants';
import LocaleNameComponent from '../../../../../../../../localisation/LocaleNameComponent';

type ComponentProps = {
	revitID: number;
};
const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	status: StatusSelector(state, componentProps),
});

const StatusSelector = createSelector(
	(state: RootState) => state.WorkProgress.Monolithic.Upgrading.byRevitIdWithStatuses,
	(state: RootState, componentProps: ComponentProps) => componentProps.revitID,
	(state: RootState) => state.WorkProgress.Monolithic.General.active_tab,
	(byRevitIdWithStatuses, revitID, active_tab) => {
		if (byRevitIdWithStatuses) {
			const statusKey = byRevitIdWithStatuses[revitID] as Constants.WorkProgressElementStatus;
			return { statusColor: Constants.WorkProgressMonolithicColorMap[active_tab]?.[statusKey], statusKey };
		}
	},
);
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function ComponentStatus(props: Props) {
	return (
		<Badge className={'p-1 small'} style={{ backgroundColor: props.status?.statusColor?.color, color: '#ffffff' }}>
			{props.status && <LocaleNameComponent value={props.status.statusKey} />}
		</Badge>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentStatus);
