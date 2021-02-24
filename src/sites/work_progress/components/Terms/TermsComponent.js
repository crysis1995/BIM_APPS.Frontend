import React from 'react';
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { setDepartment, setTermByDepartment } from '../../redux/actions/terms_actions';
import { PERMISSION, TERM_TYPE } from '../../redux/types/constans';
import Selector from '../../../../components/Selector';
import Permissions from '../../../../components/Permissions';
import AccessFunction from '../../../../components/Permissions/AccessFunction';
function TermsComponent(props) {
	const { jobs, terms, setTermByDepartment, setDepartment } = props;
	return (
		<>
			<Selector
				classname={'my-3 mx-1'}
				label={'Oddział'}
				options={Object.keys(terms.byDepartment).map((key) => ({
					id: key,
					name: terms.byDepartment[key].name,
				}))}
				options_loaded={Object.keys(terms.byDepartment) > 0}
				value={terms.chosenDepartment}
				onChangeValue={setDepartment}
			/>
			<Table data-testid="TermsComponent" size={'sm'}>
				<thead>
					<tr>
						<th>Nazwa roboty</th>
						<OverlayTrigger
							key={v4()}
							placement="top"
							overlay={<Tooltip id={`tooltip-top`}>Data rzeczywistego rozpoczęcia</Tooltip>}>
							<th>DRR</th>
						</OverlayTrigger>
						<OverlayTrigger
							key={v4()}
							placement="top"
							overlay={<Tooltip id={`tooltip-top`}>Data planowanego zakończenia</Tooltip>}>
							<th>DPZ</th>
						</OverlayTrigger>
						<OverlayTrigger
							key={v4()}
							placement="top"
							overlay={
								<Tooltip id={`tooltip-top`}>Data planowanego zakończenia wg. planu bazowego</Tooltip>
							}>
							<th>DPZwPB</th>
						</OverlayTrigger>
						<OverlayTrigger
							key={v4()}
							placement="top"
							overlay={<Tooltip id={`tooltip-top`}>Data rzeczywistego zakończenia</Tooltip>}>
							<th>DRZ</th>
						</OverlayTrigger>
					</tr>
				</thead>
				<tbody>
					{props.terms.chosenDepartment &&
						Object.entries(terms.byDepartment[props.terms.chosenDepartment].byJobId).map(
							([job_id, term_data]) => (
								<tr key={v4()}>
									<td className={''}>{jobs[job_id].name}</td>
									<td>
										<Permissions
											condition={term_data[TERM_TYPE.REAL_START].permissions.includes(
												PERMISSION.VIEW,
											)}>
											<input
												data-testid="data-input-1"
												type={'date'}
												disabled={AccessFunction({
													condition: term_data[TERM_TYPE.REAL_START].permissions.includes(
														PERMISSION.CREATE,
													),
													success_callback: () => false,
													failure_callback: () => true,
												})}
												className="form-control form-control-sm"
												onChange={(selectedDay) =>
													AccessFunction({
														condition: term_data[TERM_TYPE.REAL_START].permissions.includes(
															PERMISSION.UPDATE,
														),
														success_callback: () =>
															setTermByDepartment(
																TERM_TYPE.REAL_START,
																selectedDay.target.value,
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
											<input
												data-testid="data-input-2"
												type={'date'}
												disabled={AccessFunction({
													condition: term_data[TERM_TYPE.PLANNED_FINISH].permissions.includes(
														PERMISSION.CREATE,
													),
													success_callback: () => false,
													failure_callback: () => true,
												})}
												className="form-control form-control-sm"
												onChange={(selectedDay) =>
													AccessFunction({
														condition: term_data[
															TERM_TYPE.PLANNED_FINISH
														].permissions.includes(PERMISSION.UPDATE),
														success_callback: () =>
															setTermByDepartment(
																TERM_TYPE.PLANNED_FINISH,
																selectedDay.target.value,
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
											<input
												data-testid="data-input-3"
												type={'date'}
												disabled={true}
												className="form-control form-control-sm"
												value={term_data[TERM_TYPE.REAL_FINISH].value || ''}
											/>
										</Permissions>
									</td>
									<td>
										<Permissions
											condition={term_data[TERM_TYPE.REAL_FINISH].permissions.includes(
												PERMISSION.VIEW,
											)}>
											<input
												data-testid="data-input-4"
												type={'date'}
												disabled={true}
												className="form-control form-control-sm"
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
