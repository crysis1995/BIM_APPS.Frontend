import React from 'react';
import { Col, Form, Table } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { setDepartment, setTermByDepartment } from '../../redux/actions/terms_actions';
import { TERM_TYPE } from '../../redux/types/constans';

function TermsComponent(props) {
	const { jobs, terms, setTermByDepartment } = props;
	return (
		<>
			<Form.Row>
				<Col className="my-3">
					<Form.Label>Oddział</Form.Label>
					<Form.Control
						onChange={(event) => {
							props.setDepartment(event.target.value);
						}}
						as="select"
						value={props.terms.chosenDepartment}
						custom>
						<option value="">Wybierz...</option>
						{props.terms.byDepartment &&
							Object.keys(props.terms.byDepartment).map((key) => (
								<option key={v4()} value={key}>
									{props.terms.byDepartment[key].name}
								</option>
							))}
					</Form.Control>
				</Col>
			</Form.Row>
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
										<DayPickerInput
											onDayChange={(selectedDay) =>
												setTermByDepartment(
													TERM_TYPE.REAL_START,
													selectedDay,
													props.terms.chosenDepartment,
													job_id,
												)
											}
											value={term_data[TERM_TYPE.REAL_START] || ''}
										/>
									</td>
									<td>
										<DayPickerInput
											onDayChange={(selectedDay) =>
												setTermByDepartment(
													TERM_TYPE.PLANNED_FINISH,
													selectedDay,
													props.terms.chosenDepartment,
													job_id,
												)
											}
											value={term_data[TERM_TYPE.PLANNED_FINISH] || ''}
										/>
									</td>
									<td>
										<DayPickerInput
											onDayChange={(selectedDay) =>
												setTermByDepartment(
													TERM_TYPE.REAL_FINISH,
													selectedDay,
													props.terms.chosenDepartment,
													job_id,
												)
											}
											value={term_data[TERM_TYPE.REAL_FINISH] || ''}
										/>
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
