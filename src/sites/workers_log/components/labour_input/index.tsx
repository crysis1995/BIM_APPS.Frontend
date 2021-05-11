import React, { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import UISelectorsComponent from './UISelectors';
import WorkTimeSummaryComponent from './WorkTimeSummary';
import { connect } from 'react-redux';
import LabourInputGeneralActions from '../../redux/labour_input/general/actions';
import ObjectsListComponent from './ObjectsList';

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
		<Col className={'p-3'}>
			<UISelectorsComponent />
			<WorkTimeSummaryComponent />
			<ObjectsListComponent />
		</Col>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(LabourInputComponent);
