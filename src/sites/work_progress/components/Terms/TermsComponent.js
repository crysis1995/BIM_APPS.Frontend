import React from 'react';
import { Table } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { connect } from 'react-redux';
import { v4 } from 'uuid';


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
				{Object.entries(props.jobs)
					.map(([job_id, job]) => (
						<React.Fragment key={v4()}>
							<tr>
								<td data-parentid={job_id} onClick={onClickHandler}>
									{job.name}
								</td>
								<td>
									<DayPickerInput />
								</td>
								<td>
									<DayPickerInput />
								</td>
								<td>
									<DayPickerInput />
								</td>
							</tr>
							<tr name={job_id} className="collapse table-secondary">
								<td></td>
								<td>
									<DayPickerInput />
								</td>
								<td>
									<DayPickerInput />
								</td>
								<td>
									<DayPickerInput />
								</td>
							</tr>
						</React.Fragment>
					))}
			</tbody>
		</Table>
	);
}

const mapStateToProps = (state) => ({
	jobs: state.Odbiory.Jobs.jobs,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TermsComponent);
