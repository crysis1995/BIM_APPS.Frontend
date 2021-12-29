import { v4 } from 'uuid';
import HideComponent from '../../../../../../../../components/HideComponent';
import Selection from './selection';
import React from 'react';
import UNITS from '../../../../../../../../components/Units';
import { connect } from 'react-redux';

import { ObjectsSelector } from './objects.Selector';
import LocaleNameComponent from '../../../../../../../../localisation/LocaleNameComponent';
import { Constants } from '../../../../../../redux/constants';
import ComponentStatus from './Component.Status';
import { RootState } from '../../../../../../../../state';

type ComponentProps = {
	allowSelection: boolean;
	showStatuses: boolean;
};
const mapStateToProps = (state: RootState) => ({
	objects: ObjectsSelector(state),
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function ObjectsTableBody(props: Props) {
	return (
		<tbody>
			{props.objects.map((obj) => {
				return (
					!!obj && (
						<tr key={v4()}>
							<HideComponent when={!props.allowSelection}>
								<td>
									<Selection revitID={obj.revit_id} />
								</td>
							</HideComponent>
							<td>
								<LocaleNameComponent value={obj.VCF_Realisation as Constants.MonolithicTabs} />
							</td>
							<td>{obj.volume ? <UNITS.M3>{obj.volume}</UNITS.M3> : '-'}</td>
							<td>{obj.running_meter ? <UNITS.CM>{obj.running_meter}</UNITS.CM> : '-'}</td>
							<td>{obj.area ? <UNITS.M2>{obj.area}</UNITS.M2> : '-'}</td>
							<HideComponent when={!props.showStatuses}>
								<td className="text-center">
									<ComponentStatus revitID={obj.revit_id} />
								</td>
							</HideComponent>
						</tr>
					)
				);
			})}
		</tbody>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectsTableBody);
