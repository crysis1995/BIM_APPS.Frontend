import React from 'react';
import { connect } from 'react-redux';

import Loader from '../../../../components/Loader';
import TermsComponent from './TermsComponent';

function Terms({ Jobs, ForgeViewer }) {
	if (!Jobs.jobs_fetched || Jobs.jobs_loading) {
		return <Loader height={'100%'} />;
	} else if (!ForgeViewer.current_sheet) {
		return (
			<div className="p-3 text-center">
				<p>Wybierz kondygnacje</p>
			</div>
		);
	} else {
		return <TermsComponent />;
	}
}

const mapStateToProps = (state) => ({
	ForgeViewer: state.ForgeViewer,
	Jobs: state.Odbiory.Jobs,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
