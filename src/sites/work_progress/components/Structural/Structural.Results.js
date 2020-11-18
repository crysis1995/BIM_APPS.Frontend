import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { initialiseModal } from '../../../../components/Modal/redux/actions';
import { MONOLITHIC } from '../../redux/types/constans';
import BasePlan from './Structural.Results.BasePlan';
import Realisation from './Structural.Results.Realisation';
import Terms from './Structural.Results.Terms';

function StructuralResults({ active_tab }) {
	return (
		// <Row className="d-flex flex-column w-100" >
		<Row>
			{(active_tab === MONOLITHIC.TABS.SCHEDULED && <BasePlan />) ||
				(active_tab === MONOLITHIC.TABS.ACTUAL && <Realisation />) ||
				(active_tab === MONOLITHIC.TABS.TERMS && <Terms />)}
		</Row>
	);
}

const mapStateToProps = (state) => ({
	active_tab: state.Odbiory.OdbioryComponent.MONOLITHIC.active_tab,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StructuralResults);
