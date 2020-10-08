import React from 'react';
import { Table } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { setDepartment, setTermByDepartment } from '../../redux/actions/terms_actions';
import { PERMISSION, TERM_TYPE } from '../../redux/types/constans';
import Selector from '../Selector';
import Permissions from '../../../../components/Permissions';
import AccessFunction from '../../../../components/Permissions/AccessFunction';
function TermsComponent(props) {
	const { jobs, terms, setTermByDepartment, setDepartment } = props;
	return (
		<>
			<Selector
				label={'Oddział'}
				options={Object.keys(terms.byDepartment).map((key) => ({
					id: key,
					name: terms.byDepartment[key].name,
				}))}
				options_loaded={Object.keys(terms.byDepartment) > 0}
				value={terms.chosenDepartment}
				onChangeValue={setDepartment}
			/>
			<Table data-testid="TermsComponent">
				<thead>
					<tr>
						<th>Nazwa roboty</th>
						<th>Data rzeczywistego rozpoczęcia</th>
						<th>Data planowanego zakończenia</th>
						<th>Data rzeczywistego zakończenia</th>
					</tr>
				</thead>
				<tbody>
					{props.terms.chosenDepartment &&
						Object.entries(terms.byDepartment[props.terms.chosenDepartment].byJobId).map(
							([job_id, term_data]) => (
								<tr key={v4()}>
									<td>{jobs[job_id].name}</td>
									<td>
										<Permissions
											condition={term_data[TERM_TYPE.REAL_START].permissions.includes(
												PERMISSION.VIEW,
											)}>
											<DayPickerInput
												inputProps={AccessFunction({
													condition: term_data[TERM_TYPE.REAL_START].permissions.includes(
														PERMISSION.CREATE,
													),
													success_callback: () => ({ disabled: false }),
													failure_callback: () => ({ disabled: true }),
												})}
												onDayChange={(selectedDay) =>
													AccessFunction({
														condition: term_data[TERM_TYPE.REAL_START].permissions.includes(
															PERMISSION.UPDATE,
														),
														success_callback: () =>
															setTermByDepartment(
																TERM_TYPE.REAL_START,
																selectedDay,
																props.terms.chosenDepartment,
																job_id,
															),
													})
												}
												value={term_data[TERM_TYPE.REAL_START].value || ''}
											/>
										</Permissions>
									</td>
									<td>
										<Permissions
											condition={term_data[TERM_TYPE.PLANNED_FINISH].permissions.includes(
												PERMISSION.VIEW,
											)}>
											<DayPickerInput
												inputProps={AccessFunction({
													condition: term_data[TERM_TYPE.PLANNED_FINISH].permissions.includes(
														PERMISSION.CREATE,
													),
													success_callback: () => ({ disabled: false }),
													failure_callback: () => ({ disabled: true }),
												})}
												onDayChange={(selectedDay) =>
													AccessFunction({
														condition: term_data[TERM_TYPE.REAL_START].permissions.includes(
															PERMISSION.UPDATE,
														),
														success_callback: () =>
															setTermByDepartment(
																TERM_TYPE.PLANNED_FINISH,
																selectedDay,
																props.terms.chosenDepartment,
																job_id,
															),
													})
												}
												value={term_data[TERM_TYPE.PLANNED_FINISH].value || ''}
											/>
										</Permissions>
									</td>
									<td>
										<Permissions
											condition={term_data[TERM_TYPE.REAL_FINISH].permissions.includes(
												PERMISSION.VIEW,
											)}>
											<DayPickerInput
												inputProps={{ disabled: true }}
												onDayChange={(selectedDay) =>
													setTermByDepartment(
														TERM_TYPE.REAL_FINISH,
														selectedDay,
														props.terms.chosenDepartment,
														job_id,
													)
												}
												value={term_data[TERM_TYPE.REAL_FINISH].value || ''}
											/>
										</Permissions>
									</td>
								</tr>
							),
						)}
				</tbody>
			</Table>
		</>
	);
}

const mapStateToProps = (state) => ({
	jobs: state.Odbiory.Jobs.jobs,
	terms: state.Odbiory.Terms,
});

const mapDispatchToProps = { setTermByDepartment, setDepartment };

export default connect(mapStateToProps, mapDispatchToProps)(TermsComponent);
