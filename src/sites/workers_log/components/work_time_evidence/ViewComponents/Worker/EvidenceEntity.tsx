import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CrewState } from '../../../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../../../redux/work_time_evidence/worker/types/state';
import { EditingMode, TimeEvidenceState } from '../../../../redux/work_time_evidence/time_evidence/types/state';
import { GeneralState } from '../../../../redux/work_time_evidence/general/types/state';
import classNames from 'classnames';
import TimeEvidenceActions from '../../../../redux/work_time_evidence/time_evidence/actions';
import { isEditableTimeEvidence } from '../../Selectors/IsEditableTimeEvidence.Selector';
import EditableCell from './EditableCell';

const mapStateToProps = (
	state: {
		WorkersLog: {
			WorkTimeEvidence: {
				Crews: CrewState;
				Workers: WorkersState;
				TimeEvidence: TimeEvidenceState;
				General: GeneralState;
			};
		};
	},
	componentProps: { workerID: string; date: { date: string; is_holiday: boolean } },
) => ({
	all_evidences: state.WorkersLog.WorkTimeEvidence.TimeEvidence.all,
	evidence_entity:
		state.WorkersLog.WorkTimeEvidence.TimeEvidence.work_evidence?.by_worker[componentProps.workerID]?.by_date?.[
			componentProps.date.date
		],
	isEditable: isEditableTimeEvidence(state, componentProps),
});
const mapDispatchToProps = {
	editingStart: TimeEvidenceActions.editingStart,
	editingCancel: TimeEvidenceActions.editingCancel,
	editingWorkedTime: TimeEvidenceActions.editingWorkedTimeInit,
};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & { workerID: string; date: { date: string; is_holiday: boolean } };

function EvidenceEntity(props: Props) {
	const [color, setColor] = useState('#ffffff');

	const handleOver = () => setColor('#eee');
	const handleLeave = () => setColor('#fff');
	if (props.evidence_entity && props.all_evidences) {
		if (props.isEditable) {
			return (
				<td
					style={{ maxWidth: 40, minWidth: 40, margin: 0, padding: 0, backgroundColor: color }}
					onMouseOver={handleOver}
					onMouseLeave={handleLeave}>
					<EditableCell
						handleChange={(value) => props.editingWorkedTime(props.workerID, props.date.date, value)}
						handleBlur={props.editingCancel}
						value={props.all_evidences[props.evidence_entity].worked_time}
					/>
				</td>
			);
		} else {
			return (
				<td
					onMouseOver={handleOver}
					onMouseLeave={handleLeave}
					className={classNames({
						'text-center': true,
					})}
					style={{ backgroundColor: color }}
					onClick={() =>
						props.editingStart({
							mode: EditingMode.BY_BOTH,
							coordinates: { date: props.date.date, worker: props.workerID },
						})
					}>
					{props.all_evidences[props.evidence_entity].worked_time}
				</td>
			);
		}
	} else {
		if (props.isEditable) {
			return (
				<td
					onMouseOver={handleOver}
					onMouseLeave={handleLeave}
					className={classNames({
						'text-center': true,
					})}
					style={{ maxWidth: 40, minWidth: 40, margin: 0, padding: 0, backgroundColor: color }}>
					<EditableCell
						handleChange={(value) => props.editingWorkedTime(props.workerID, props.date.date, value)}
						handleBlur={props.editingCancel}
						value={0}
					/>
				</td>
			);
		} else {
			return (
				<td
					onMouseOver={handleOver}
					onMouseLeave={handleLeave}
					className={classNames({
						'text-center': true,
					})}
					style={{ backgroundColor: color }}
					onClick={(e) =>
						props.editingStart({
							mode: EditingMode.BY_BOTH,
							coordinates: { date: props.date.date, worker: props.workerID },
						})
					}
				/>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EvidenceEntity);
