import React from 'react';
import { RootState } from '../../../../../../store';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import ComponentTermsTableBodyRow from './Component.TermsTable.Body.Row';
import { selectTerms } from './Selector.SelectTerms';

const mapStateToProps = (state: RootState) => ({
	selectTerms: selectTerms(state),
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function ComponentTermsTableBody(props: Props) {
	return (
		<>
			{props.selectTerms.map((x) => (
				<ComponentTermsTableBodyRow key={v4()} objectId={x} />
			))}
		</>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(ComponentTermsTableBody);
