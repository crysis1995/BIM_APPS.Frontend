import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import UNITS from '../../../../components/Units';
import { sumOfArray } from '../../../../utils/sumOfArray';
import { handleSelectedElements } from '../../redux/actions/upgrading_actions';
import { byRevitId, objectSelector, selectedElements } from './Structural.Results.Selector';
import Status from './Structural.Results.Status';

function ResultsTable({ objects, selected, handleSelectedElements, actualElements_length, allowSelection = true }) {
	return (
		<Table size={'sm'} >
			<thead>
				<tr>
					<th hidden={!allowSelection}>
						<input
							type="checkbox"
							checked={
								actualElements_length === selected.length &&
								actualElements_length > 0 &&
								selected.length > 0
							}
							onChange={() => handleSelectedElements(objects.map((object) => object.Id.toString()))}
							ref={(input) => {
								if (input) {
									input.indeterminate =
										actualElements_length !== selected.length &&
										actualElements_length > 0 &&
										selected.length > 0;
								}
							}}
						/>
					</th>
					<th>Typ elementu</th>
					<th>Objętość</th>
					<th>Długość</th>
					<th>Powierzchnia</th>
					<th hidden={!allowSelection}>Status</th>
				</tr>
			</thead>
			<tbody >
				{objects.map((obj) => {
					return (
						<tr key={v4()}>
							<td hidden={!allowSelection}>
								<input
									type="checkbox"
									checked={selected.includes(obj.Id.toString())}
									value={obj.Id}
									onChange={(e) => handleSelectedElements(e.target.value)}
								/>
							</td>
							<td>{obj.Comments || ''}</td>
							<td>{obj.Volume ? <UNITS.M3>{obj.Volume}</UNITS.M3> : '-'}</td>
							<td>{obj.Length ? <UNITS.CM>{obj.Length}</UNITS.CM> : '-'}</td>
							<td>{obj.Area ? <UNITS.M2>{obj.Area}</UNITS.M2> : '-'}</td>
							<td hidden={!allowSelection} className="text-center">
								<Status revit_id={obj.Id.toString()} />
							</td>
						</tr>
					);
				})}
			</tbody>
			{objects.length > 0 && (
				<tfoot>
					<tr>
						<td hidden={!allowSelection}></td>
						<td>Elementów: {objects.length}</td>
						<td>
							<UNITS.M3>{sumOfArray(objects.map((e) => e.Volume || 0))}</UNITS.M3>
						</td>
						<td></td>
						<td></td>
						<td hidden={!allowSelection}></td>
					</tr>
				</tfoot>
			)}
		</Table>
	);
}

const mapStateToProps = (state) => ({
	objects: objectSelector(state),
	selected: selectedElements(state),
	actualElements_length: state.Odbiory.Upgrading.MONOLITHIC.actualElements.length,
});

const mapDispatchToProps = {
	handleSelectedElements,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsTable);
