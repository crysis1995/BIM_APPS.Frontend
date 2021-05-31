import React, { useEffect } from 'react';
import UISelectorsComponent from './UISelectors';
import WorkTimeSummaryComponent from './WorkTimeSummary';
import { connect } from 'react-redux';
import LabourInputGeneralActions from '../../redux/labour_input/general/actions';
import TimeInputsCollector from './ObjectsList';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
	SetInitial: LabourInputGeneralActions.SetInitial,
	InitializeComponent: LabourInputGeneralActions.InitializeComponent,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function LabourInputComponent(props: Props) {
	useEffect(() => {
		return () => {
			props.SetInitial();
		};
	}, []);
	props.InitializeComponent();
	return (
		<div className={'p-3 d-flex flex-column w-100'}>
			<UISelectorsComponent />
			<WorkTimeSummaryComponent />
			<TimeInputsCollector />
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(LabourInputComponent);
