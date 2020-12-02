import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import UNITS from '../../../../components/Units';
import { initSetStatus } from '../../redux/actions/upgrading_actions';
import { MONOLITHIC } from '../../redux/types/constans';
import Selector from '../Selector';
import { selectedItemsParamsSummary } from './Structural.Results.Selector';

function SetStatus({ selectedItemsParamsSummary, selectedElements, initSetStatus, rotation_day, statuses_options }) {
	return (
		<div className="p-2">
			<h5>
				Wybrano {selectedElements.length} element
				{selectedElements.length === 0 || selectedElements.length >= 5
					? 'ów'
					: selectedElements.length > 1 && selectedElements.length < 5
					? 'y'
					: ''}
			</h5>
			{selectedElements.length > 0 && (
				<>
					<hr />
					<Row>
						{Object.keys(selectedItemsParamsSummary).map((key) => (
							<Col className="py-3" xs={6} key={v4()}>
								<h6>{key}</h6>
								{Object.keys(selectedItemsParamsSummary[key]).map((e) => (
									<div key={v4()} className="">
										<span className="mr-3">{MONOLITHIC.PARAMETERS[e]}</span>
										{'volume' === e ? (
											<UNITS.M3>{selectedItemsParamsSummary[key][e]}</UNITS.M3>
										) : 'area' === e ? (
											<UNITS.M2>{selectedItemsParamsSummary[key][e]}</UNITS.M2>
										) : 'running_meter' === e ? (
											<UNITS.CM>{selectedItemsParamsSummary[key][e]}</UNITS.CM>
										) : null}
									</div>
								))}
							</Col>
						))}
					</Row>
					<hr />
					<Row>
						<Col>
							<Selector
								classname={''}
								isDisabled={false}
								label={'Ustaw status wybranych elementów'}
								options={statuses_options.map((e) => ({
									id: e.name,
									name: MONOLITHIC.STATUS[e.name].name,
								}))}
								value={undefined}
								onChangeValue={(e) => initSetStatus(selectedElements, e, rotation_day)}
							/>
						</Col>
					</Row>
				</>
			)}
		</div>
	);
}

const mapStateToProps = (state) => ({
	selectedItemsParamsSummary: selectedItemsParamsSummary(state, undefined, { isFiltered: false }),
	selectedElements: state.Odbiory.Upgrading.MONOLITHIC.selectedElements,
	rotation_day: state.Odbiory.OdbioryComponent.MONOLITHIC.rotation_day,
	statuses_options: Object.values(state.Odbiory.OdbioryComponent.MONOLITHIC.statuses),
});

const mapDispatchToProps = { initSetStatus };

export default connect(mapStateToProps, mapDispatchToProps)(SetStatus);
