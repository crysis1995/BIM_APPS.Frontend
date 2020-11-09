import React, { useEffect, useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import UNITS from '../../../../components/Units';
import { sumOfArray } from '../../../../utils/sumOfArray';
import { handleSelectedElements } from '../../redux/actions/upgrading_actions';
import Checkbox from './Structural.Checkbox';
import { objectSelector } from './Structural.Results.Selector';

function ResultsTable({ objects, selectedElements }) {
	const [indeterminate] = useState(objects.length !== selectedElements.length);
	return (
		<Table size={'sm'}>
			<thead>
				<tr>
					<th>
						<input
							type="checkbox"
							onChange={(e) => console.log(e.target.checked)}
							checked={false}
							ref={(el) => el && (el.indeterminate = indeterminate)}
						/>
					</th>
					<th>Typ elementu</th>
					<th>Objętość</th>
					<th>Długość</th>
					<th>Powierzchnia</th>
					{/*<th>Status</th>*/}
				</tr>
			</thead>
			<tbody>
				{objects.map((obj) => {
					return (
						<tr key={v4()}>
							<td>
								<Checkbox id={obj.Id} />
							</td>
							<td>{obj.Comments || ''}</td>
							<td>{obj.Volume ? <UNITS.M3>{obj.Volume}</UNITS.M3> : '-'}</td>
							<td>{obj.Length ? <UNITS.CM>{obj.Length}</UNITS.CM> : '-'}</td>
							<td>{obj.Area ? <UNITS.M2>{obj.Area}</UNITS.M2> : '-'}</td>
						</tr>
					);
				})}
			</tbody>
			<tfoot>
				<tr>
					<td></td>
					<td>Elementów: {objects.length}</td>
					<td>
						<UNITS.M3>{sumOfArray(objects.map((e) => e.Volume || 0))}</UNITS.M3>
					</td>
					<td></td>
					<td></td>
				</tr>
			</tfoot>
		</Table>
	);
}

const mapStateToProps = (state) => ({
	objects: objectSelector(state),
	selectedElements: state.Odbiory.Upgrading.MONOLITHIC.selectedElements,
});

const mapDispatchToProps = {
	handleSelectedElements,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTable);
