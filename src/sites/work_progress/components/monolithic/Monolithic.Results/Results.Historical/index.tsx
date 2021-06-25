import React from 'react';
import { Col } from 'react-bootstrap';
import { RootState } from '../../../../../../store';
import ObjectsTable from '../Components/ObjectsTable';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function ResultsHistorical(props: Props) {
	const variant = 'light';
	return (
		<>
			<Col xs={12} className="h-100" style={{ overflowY: 'auto', maxHeight: 500 }}>
				<ObjectsTable allowSelection={false} showStatuses={true} />
			</Col>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsHistorical);
