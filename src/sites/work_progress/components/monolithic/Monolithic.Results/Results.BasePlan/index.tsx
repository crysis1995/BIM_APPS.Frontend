import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { IsDataLoadingSelector } from './isDataLoading.Selector';
import ObjectsTable from '../Components/ObjectsTable';
import { RootState } from '../../../../../../state';

const mapStateToProps = (state: RootState) => ({
	isDataLoading: IsDataLoadingSelector(state),
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function ResultsBasePlan(props: Props) {
	return (
		<>
			<Col xs={12} className="h-100" style={{ overflowY: 'auto', maxHeight: '500px' }}>
				<ObjectsTable allowSelection={true} showStatuses={false} />
			</Col>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsBasePlan);
