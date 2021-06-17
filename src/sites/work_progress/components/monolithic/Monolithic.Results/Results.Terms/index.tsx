import React from 'react';
import { RootState } from '../../../../../../store';
import { connect } from 'react-redux';
import LoaderComponent from '../../../../../../components/Loader/LoaderComponent';
import { isTermsLoading } from './Selector.isTermsLoading';
import ComponentTermsTable from './Component.TermsTable';

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
