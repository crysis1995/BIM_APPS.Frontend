import HideComponent from '../../../../../../../../components/HideComponent';
import HeaderSelection from './headerSelection';
import React from 'react';

type ComponentProps = {
	allowSelection: boolean;
	showStatuses: boolean;
};
export function ObjectsTableHeader(props: ComponentProps) {
	return (
		<thead>
			<tr>
				<HideComponent when={!props.allowSelection}>
					<th>
						<HeaderSelection />
					</th>
				</HideComponent>
				<th>Typ elementu</th>
				<th>Objętość</th>
				<th>Długość</th>
				<th>Powierzchnia</th>
				<HideComponent when={!props.showStatuses}>
					<th>Status</th>
				</HideComponent>
			</tr>
		</thead>
	);
}
