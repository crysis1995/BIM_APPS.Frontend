import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';

import { Constants } from '../../../redux/constants';
import ResultsBasePlan from './Results.BasePlan';
import ResultsRealisation from './Results.Realisation';
import ResultsHistorical from './Results.Historical';
import ResultsTerms from './Results.Terms';
import ResultsDelayCreate from './Results.Delay.Create';
import ResultsDelayList from './Results.Delay.List';
import { RootState } from '../../../../../state';

const mapStateToProps = (state: RootState) => ({
	active_tab: state.WorkProgress.Monolithic.General.active_tab,
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function MonolithicResults(props: Props) {
	switch (props.active_tab) {
		case Constants.MonolithicTabs.SCHEDULED:
			return (
				<Row>
					<ResultsBasePlan />
				</Row>
			);
		case Constants.MonolithicTabs.CURRENT:
			return (
				<Row>
					<ResultsRealisation />
				</Row>
			);
		case Constants.MonolithicTabs.HISTORICAL:
			return (
				<Row>
					<ResultsHistorical />
				</Row>
			);
		case Constants.MonolithicTabs.TERMS:
			return (
				<Row>
					<ResultsTerms />
				</Row>
			);
		case Constants.MonolithicTabs.DELAY_CREATE:
			return (
				<Row>
					<ResultsDelayCreate />
				</Row>
			);
		case Constants.MonolithicTabs.DELAY_LIST:
			return (
				<Row>
					<ResultsDelayList />
				</Row>
			);
		default:
			return <></>;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MonolithicResults);
