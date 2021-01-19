import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import UNITS from '../../../../components/Units';
import { sumOfArray } from '../../../../utils/sumOfArray';
import { handleSelectedElements } from '../../redux/actions/upgrading_actions';
import { MONOLITHIC } from '../../redux/types/constans';
import { objectSelector, selectedElements } from './Structural.Results.Selector';
import Status from './Structural.Results.Status';

function ResultsTable({ objects, selected, handleSelectedElements, actualElements_length, allowSelection = true }) {
	return (
		<Table size={'sm'}>
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
							onChange={() => handleSelectedElements(objects.map((object) => object.revit_id.toString()))}
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
			<tbody>
				{objects.map((obj) => {
					return (
						<tr key={v4()}>
							<td hidden={!allowSelection}>
								<input
									type="checkbox"
									checked={selected.includes(obj.revit_id.toString())}
									value={obj.revit_id}
									onChange={(e) => handleSelectedElements(e.target.value)}
								/>
							</td>
							<td>{MONOLITHIC.PL_Description[obj.VCF_Realisation]}</td>
							<td>{obj.volume ? <UNITS.M3>{obj.volume}</UNITS.M3> : '-'}</td>
							<td>{obj.running_meter ? <UNITS.CM>{obj.running_meter}</UNITS.CM> : '-'}</td>
							<td>{obj.area ? <UNITS.M2>{obj.area}</UNITS.M2> : '-'}</td>
							<td hidden={!allowSelection} className="text-center">
								<Status revit_id={obj.revit_id.toString()} />
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
							<UNITS.M3>{sumOfArray(objects.map((e) => e.volume || 0))}</UNITS.M3>
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
