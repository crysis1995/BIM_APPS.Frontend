import * as classnames from 'classnames';
import React from 'react';
import { Col, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import Permissions from '../../../../components/Permissions';
import { setTermByGroup } from '../../redux/actions/terms_actions';
import { MONOLITHIC } from '../../redux/types/constans';

const Terms = ({ active_crane, cranes, active_level, levels, terms, setTermByGroup }) => {
	let crane = '';
	let level = '';
	let terms_data;
	if (!!active_crane && !!active_level) {
		terms_data = terms.byCrane[cranes[active_crane].name].byLevel[levels[active_level].name].byGroup;
		crane = cranes[active_crane].name;
		level = levels[active_level].name;
	} else terms_data = {};
	return (
		<Col xs={12} className="h-100">
			<div className={'py-4 text-center'}>
				<h6>Planowane i rzeczywiste terminy realizacji elementów</h6>
			</div>
			<Table data-testid="TermsComponent" size={'sm'}>
				<thead>
					<tr>
						<th>Grupa elementów</th>
						<OverlayTrigger
							key={v4()}
							placement="top"
							overlay={
								<Tooltip id={`tooltip-top`}>Data planowanego rozpoczęcia wg. planu bazowego</Tooltip>
							}>
							<th>Data planowanego rozpoczęcia wg. PB</th>
						</OverlayTrigger>
						<OverlayTrigger
							key={v4()}
							placement="top"
							overlay={<Tooltip id={`tooltip-top`}>Data rzeczywistego rozpoczęcia</Tooltip>}>
							<th>Data rzeczywistego rozpoczęcia</th>
						</OverlayTrigger>
						<OverlayTrigger
							key={v4()}
							placement="top"
							overlay={
								<Tooltip id={`tooltip-top`}>Data planowanego zakończenia wg. planu bazowego</Tooltip>
							}>
							<th>Data planowanego zakończenia wg. PB</th>
						</OverlayTrigger>
						<OverlayTrigger
							key={v4()}
							placement="top"
							overlay={<Tooltip id={`tooltip-top`}>Planowana data zakończenia</Tooltip>}>
							<th>Planowana data zakończenia</th>
						</OverlayTrigger>
					</tr>
				</thead>
				<tbody>
					{Object.keys(terms_data).length > 0 &&
						Object.keys(MONOLITHIC.ELEMENT_TYPE).map((element_key) => {
							return (
								<tr key={v4()}>
									<td>{MONOLITHIC.ELEMENT_TYPE[element_key].name}</td>
									<td>
										<Permissions condition={true}>
											<input
												data-testid="data-input-1"
												type={'date'}
												disabled={true}
												className="form-control form-control-sm"
												value={new Date(
													terms_data[element_key][MONOLITHIC.TERM_TYPE.PLANNED_START_BP.id],
												).toLocaleDateString('en-CA')}
											/>
										</Permissions>
									</td>
									<td>
										<Permissions condition={true}>
											<input
												data-testid="data-input-1"
												type={'date'}
												// disabled={AccessFunction({
												// 	condition: term_data[TERM_TYPE.REAL_START].permissions.includes(
												// 		PERMISSION.CREATE,
												// 	),
												// 	success_callback: () => false,
												// 	failure_callback: () => true,
												// })}
												className={classnames('form-control form-control-sm', {
													'border-danger':
														new Date(
															terms_data[element_key][
																MONOLITHIC.TERM_TYPE.PLANNED_START_BP.id
															],
														) <
														new Date(
															terms_data[element_key][MONOLITHIC.TERM_TYPE.REAL_START.id],
														),
													'border-success':
														new Date(
															terms_data[element_key][
																MONOLITHIC.TERM_TYPE.PLANNED_START_BP.id
															],
														) >
														new Date(
															terms_data[element_key][MONOLITHIC.TERM_TYPE.REAL_START.id],
														),
												})}
												onChange={(selectedDay) =>
													setTermByGroup(
														crane,
														level,
														element_key,
														MONOLITHIC.TERM_TYPE.REAL_START.id,
														new Date(selectedDay.target.value).toISOString(),
													)
												}
												value={new Date(
													terms_data[element_key][MONOLITHIC.TERM_TYPE.REAL_START.id],
												).toLocaleDateString('en-CA')}
											/>
										</Permissions>
									</td>
									<td>
										<Permissions condition={true}>
											<input
												data-testid="data-input-1"
												type={'date'}
												disabled={true}
												className={'form-control form-control-sm'}
												// onChange={(selectedDay) =>
												// 	console.log(selectedDay)
												// }
												value={new Date(
													terms_data[element_key][MONOLITHIC.TERM_TYPE.PLANNED_FINISH_BP.id],
												).toLocaleDateString('en-CA')}
											/>
										</Permissions>
									</td>
									<td>
										<Permissions condition={true}>
											<input
												data-testid="data-input-1"
												type={'date'}
												className={classnames('form-control form-control-sm', {
													'border-danger':
														new Date(
															terms_data[element_key][
																MONOLITHIC.TERM_TYPE.PLANNED_FINISH_BP.id
															],
														) <
														new Date(
															terms_data[element_key][
																MONOLITHIC.TERM_TYPE.PLANNED_FINISH.id
															],
														),
													'border-success':
														new Date(
															terms_data[element_key][
																MONOLITHIC.TERM_TYPE.PLANNED_FINISH_BP.id
															],
														) >
														new Date(
															terms_data[element_key][
																MONOLITHIC.TERM_TYPE.PLANNED_FINISH.id
															],
														),
												})}
												onChange={(selectedDay) =>
													setTermByGroup(
														crane,
														level,
														element_key,
														MONOLITHIC.TERM_TYPE.PLANNED_FINISH.id,
														selectedDay.target.value,
													)
												}
												value={terms_data[element_key][MONOLITHIC.TERM_TYPE.PLANNED_FINISH.id]}
											/>
										</Permissions>
									</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
		</Col>
	);
};
const mapStateToProps = ({ Odbiory }) => ({
	active_crane: Odbiory.OdbioryComponent.MONOLITHIC.active_crane,
	cranes: Odbiory.OdbioryComponent.MONOLITHIC.cranes,
	active_level: Odbiory.OdbioryComponent.MONOLITHIC.active_level,
	levels: Odbiory.OdbioryComponent.MONOLITHIC.levels,
	terms: Odbiory.Terms.MONOLITHIC.terms,
});

const mapDispatchToProps = { setTermByGroup };

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
