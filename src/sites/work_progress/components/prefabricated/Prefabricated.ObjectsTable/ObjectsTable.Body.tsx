import React from 'react';
import { connect } from 'react-redux';

import ObjectsTableBodyRow from './ObjectsTable.Body.Row';
import ObjectSelectors from '../../../redux/prefabricated/objects/selectors';
import { RootState } from '../../../../../state';

const mapStateToProps = (state: RootState) => ({
	objects: ObjectSelectors.ByRevitID_Objects(state),
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function ObjectsTableBody(props: Props) {
	return (
		<tbody className={'tbody-class'}>
			{props.objects.map((value, ind) => (
				<ObjectsTableBodyRow object={value} key={ind} />
			))}
		</tbody>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(ObjectsTableBody);
