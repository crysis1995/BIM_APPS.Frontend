import React from 'react';
import { Table } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { TERM_TYPE } from '../../redux/types/constans';
import { setTermByDepartment, setTermByJob } from '../../redux/actions/terms_actions';

function TermsComponent(props) {
	const onClickHandler = (e) => {
		const hiddenElements = window.document.getElementsByName(e.currentTarget.dataset.parentid);
		hiddenElements.forEach((hiddenElement) =>
			hiddenElement.className.includes('show')
				? hiddenElement.classList.remove('show')
				: hiddenElement.classList.add('show'),
		);
	};

	return (
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
				{Object.entries(props.terms).map(([job_id, terms]) => (
					<React.Fragment key={v4()}>
						<tr>
							<td data-parentid={job_id} onClick={onClickHandler}>
								{props.jobs[job_id].name}
							</td>
							<td>
								<DayPickerInput
									onDayChange={(selectedDay) =>
										props.setTermByJob(TERM_TYPE.REAL_START, selectedDay, job_id)
									}
									value={terms[TERM_TYPE.REAL_START] || ''}
								/>
							</td>
							<td>
								<DayPickerInput
									onDayChange={(selectedDay) =>
										props.setTermByJob(TERM_TYPE.REAL_START, selectedDay, job_id)
									}
									value={terms[TERM_TYPE.PLANNED_FINISH] || ''}
								/>
							</td>
							<td>
								<DayPickerInput
									onDayChange={(selectedDay) =>
										props.setTermByJob(TERM_TYPE.REAL_START, selectedDay, job_id)
									}
									value={terms[TERM_TYPE.REAL_FINISH] || ''}
								/>
							</td>
						</tr>
						{terms.byDepartment &&
							Object.entries(terms.byDepartment).map(([dep_id, dep]) => (
								<tr name={job_id} key={v4()} className="collapse table-secondary">
									<td>{dep.name}</td>
									<td>
										<DayPickerInput
											onDayChange={(selectedDay) =>
												props.setTermByDepartment(
													TERM_TYPE.REAL_START,
													selectedDay,
													dep_id,
													job_id,
												)
											}
											value={dep[TERM_TYPE.REAL_START] || ''}
										/>
									</td>
									<td>
										<DayPickerInput
											onDayChange={(selectedDay) =>
												props.setTermByDepartment(
													TERM_TYPE.PLANNED_FINISH,
													selectedDay,
													dep_id,
													job_id,
												)
											}
											value={dep[TERM_TYPE.PLANNED_FINISH] || ''}
										/>
									</td>
									<td>
										<DayPickerInput
											onDayChange={(selectedDay) =>
												props.setTermByDepartment(
													TERM_TYPE.REAL_FINISH,
													selectedDay,
													dep_id,
													job_id,
												)
											}
											value={dep[TERM_TYPE.REAL_FINISH] || ''}
										/>
									</td>
								</tr>
							))}
					</React.Fragment>
				))}
			</tbody>
		</Table>
	);
}

const mapStateToProps = (state) => ({
	jobs: state.Odbiory.Jobs.jobs,
	terms: state.Odbiory.Terms.byJobId,
});

const mapDispatchToProps = { setTermByDepartment, setTermByJob };

export default connect(mapStateToProps, mapDispatchToProps)(TermsComponent);
