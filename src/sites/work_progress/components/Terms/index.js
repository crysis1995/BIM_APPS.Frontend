import React from 'react';
import { Col } from 'react-bootstrap';
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
		return (
			<Col
				className="d-flex flex-column"
				style={{
					paddingLeft: 0,
					paddingRight: 0,
					overflowY: 'scroll',
				}}>
				<TermsComponent />
			</Col>
		);
	}
}

const mapStateToProps = (state) => ({
	ForgeViewer: state.ForgeViewer,
	Jobs: state.Odbiory.Jobs,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
