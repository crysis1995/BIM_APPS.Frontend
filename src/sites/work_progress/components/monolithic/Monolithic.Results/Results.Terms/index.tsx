import React from 'react';

import { connect } from 'react-redux';
import LoaderComponent from '../../../../../../components/Loader/LoaderComponent';
import { isTermsLoading } from './Selector.isTermsLoading';
import ComponentTermsTable from './Component.TermsTable';
import { RootState } from '../../../../../../state';

const mapStateToProps = (state: RootState) => ({
	isTermsLoading: isTermsLoading(state),
});

const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function ResultsTerms(props: Props) {
	return (
		<LoaderComponent loading={props.isTermsLoading}>
			<ComponentTermsTable />
		</LoaderComponent>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTerms);
