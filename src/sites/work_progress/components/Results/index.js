import React from 'react';
import { connect } from 'react-redux';
import Loader from '../../../../components/Loader';
import ResultsListComponent from './Results';

function ResultComponent({ Results, Jobs, ForgeViewer }) {
	if (!Jobs.jobs_fetched || Results.loading) {
		return <Loader height={'100%'} />;
	} else if (!ForgeViewer.current_sheet) {
		return (
			<div className="p-3 text-center">
				<p>Wybierz kondygnacje</p>
			</div>
		);
	} else {
		return <ResultsListComponent />;
	}
}
const mapStateToProps = (state) => ({
	ForgeViewer: state.ForgeViewer,
	Results: state.Odbiory.Results,
	Jobs: state.Odbiory.Jobs,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResultComponent);
