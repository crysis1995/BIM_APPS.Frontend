import * as classnames from 'classnames';
import React from 'react';
import { Col, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import Loader from '../../../../components/Loader';
import Permissions from '../../../../components/Permissions';
import { initSetTermsByGroup } from '../../redux/actions/terms_actions';
import { MONOLITHIC } from '../../redux/types/constans';
import { parseDate } from '../../redux/utils/terms_utils';


const Terms = ({ active_crane, cranes, active_level, levels, terms, initSetTermsByGroup, terms_loading }) => {
	let crane = '';
	let level = '';
	let terms_data;
	if (!!active_crane && !!active_level && !terms_loading) {
		terms_data = terms.byCrane[cranes[active_crane].crane.name].byLevel[levels[active_level].name].byGroup;
		crane = cranes[active_crane].crane.name;
		level = levels[active_level].name;
	} else terms_data = {};
	return (
		<Col xs={12} className="h-100">
			{terms_loading ? (
				<Loader height={'100px'} />
			) : (
				<>
					<div className={'py-4 text-center'}>
						<h6>Planowane i rzeczywiste terminy realizacji elementów</h6>
					</div>
					<Table data-testid="ComponentTermsTable" size={'sm'}>
						<thead>
							<tr>
								<th>Grupa elementów</th>
								<OverlayTrigger
									key={v4()}
									placement="top"
									overlay={
										<Tooltip id={'88510d1a-9abd-4dd7-8218-64b1eb66e3ad'}>
											Data planowanego rozpoczęcia wg. planu bazowego
										</Tooltip>
									}>
									<th>Data planowanego rozpoczęcia wg. PB</th>
								</OverlayTrigger>
								<OverlayTrigger
									key={v4()}
									placement="top"
									overlay={
										<Tooltip id={'c8737d54-cf8b-47c3-a2a6-b69802f044ae'}>
											Data rzeczywistego rozpoczęcia
										</Tooltip>
									}>
									<th>Data rzeczywistego rozpoczęcia</th>
								</OverlayTrigger>
								<OverlayTrigger
									key={v4()}
									placement="top"
									overlay={
										<Tooltip id={'cdd9d5eb-d2a1-4aea-b7a0-985a256f55c1'}>
											Data planowanego zakończenia wg. planu bazowego
										</Tooltip>
									}>
									<th>Data planowanego zakończenia wg. PB</th>
								</OverlayTrigger>
								<OverlayTrigger
									key={v4()}
									placement="top"
									overlay={
										<Tooltip id={'3d6879f7-e5ae-4198-805b-2c11041c1d08'}>
											Planowana data zakończenia
										</Tooltip>
									}>
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
														value={parseDate(
															terms_data[element_key][
																MONOLITHIC.TERM_TYPE.PLANNED_START_BP.id
															],
														)}
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
																		MONOLITHIC.TERM_TYPE.PLANNED_START_BP.id
																	],
																) <
																new Date(
																	terms_data[element_key][
																		MONOLITHIC.TERM_TYPE.REAL_START.id
																	],
																),
															'border-success':
																new Date(
																	terms_data[element_key][
																		MONOLITHIC.TERM_TYPE.PLANNED_START_BP.id
																	],
																) >
																new Date(
																	terms_data[element_key][
																		MONOLITHIC.TERM_TYPE.REAL_START.id
																	],
																),
														})}
														onChange={(selectedDay) =>
															initSetTermsByGroup(
																crane,
																level,
																element_key,
																MONOLITHIC.TERM_TYPE.REAL_START.id,
																new Date(selectedDay.target.value).toISOString(),
															)
														}
														value={parseDate(
															terms_data[element_key][MONOLITHIC.TERM_TYPE.REAL_START.id]
																? terms_data[element_key][
																		MONOLITHIC.TERM_TYPE.REAL_START.id
																  ]
																: terms_data[element_key][
																		MONOLITHIC.TERM_TYPE.PLANNED_START.id
																  ],
														)}
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
														value={parseDate(
															terms_data[element_key][
																MONOLITHIC.TERM_TYPE.PLANNED_FINISH_BP.id
															],
														)}
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
																terms_data[element_key][
																	MONOLITHIC.TERM_TYPE.PLANNED_FINISH.id
																] &&
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
																terms_data[element_key][
																	MONOLITHIC.TERM_TYPE.PLANNED_FINISH.id
																] &&
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
															initSetTermsByGroup(
																crane,
																level,
																element_key,
																MONOLITHIC.TERM_TYPE.PLANNED_FINISH.id,
																new Date(selectedDay.target.value).toISOString(),
															)
														}
														value={parseDate(
															terms_data[element_key][
																MONOLITHIC.TERM_TYPE.PLANNED_FINISH.id
															],
														)}
													/>
												</Permissions>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
				</>
			)}
		</Col>
	);
};
const mapStateToProps = ({ Odbiory }) => ({
	active_crane: Odbiory.OdbioryComponent.MONOLITHIC.active_crane,
	cranes: Odbiory.OdbioryComponent.MONOLITHIC.cranes,
	active_level: Odbiory.OdbioryComponent.MONOLITHIC.active_level,
	levels: Odbiory.OdbioryComponent.MONOLITHIC.levels,
	terms: Odbiory.Terms.MONOLITHIC.terms,
	terms_loading: Odbiory.Terms.MONOLITHIC.loading,
});

const mapDispatchToProps = { initSetTermsByGroup };

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
