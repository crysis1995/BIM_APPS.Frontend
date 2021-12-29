import HideComponent from '../../../../../../../../components/HideComponent';
import React from 'react';
import { connect } from 'react-redux';

import UNITS from '../../../../../../../../components/Units';
import { CountSum } from './CountSum.Selector';
import { RootState } from '../../../../../../../../state';

type ComponentProps = {
	allowSelection: boolean;
	showStatuses: boolean;
};

const mapStateToProps = (state: RootState) => ({
	sumOfObjects: CountSum(state),
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
function ObjectsTableFooter(props: Props) {
	if (props.sumOfObjects.entities > 0)
		return (
			<tfoot>
				<tr>
					<HideComponent when={!props.allowSelection}>
						<td />
					</HideComponent>
					<td>Elementów: {props.sumOfObjects.entities}</td>
					<td>
						<UNITS.M3>{props.sumOfObjects.volume}</UNITS.M3>
					</td>
					<td />
					<td />
					<HideComponent when={!props.showStatuses}>
						<td />
					</HideComponent>
				</tr>
			</tfoot>
		);
	return <></>;
}
export default connect(mapStateToProps, mapDispatchToProps)(ObjectsTableFooter);
