import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { MONOLITHIC } from '../../redux/types/constans';
import BasePlan from './Structural.Results.BasePlan';
import Historical from './Structural.Results.Historical';
import Log from './Structural.Results.Log';
import Realisation from './Structural.Results.Realisation';
import Terms from './Structural.Results.Terms';
import Delay from './Delay';

function StructuralResults({ active_tab }) {
	return (
		<Row>
			{(active_tab === MONOLITHIC.TABS.SCHEDULED && <BasePlan />) ||
				(active_tab === MONOLITHIC.TABS.ACTUAL && <Realisation />) ||
				(active_tab === MONOLITHIC.TABS.HISTORICAL && <Historical />) ||
				(active_tab === MONOLITHIC.TABS.TERMS && <Terms />) ||
				(active_tab === MONOLITHIC.TABS.DELAY_CREATE && <Delay.CreateDelay />) ||
				(active_tab === MONOLITHIC.TABS.DELAY_LIST && <Delay.ListDelay />) ||
				(active_tab === MONOLITHIC.TABS.LOG && <Log />)}
		</Row>
	);
}

const mapStateToProps = (state) => ({
	active_tab: state.Odbiory.OdbioryComponent.MONOLITHIC.active_tab,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StructuralResults);
