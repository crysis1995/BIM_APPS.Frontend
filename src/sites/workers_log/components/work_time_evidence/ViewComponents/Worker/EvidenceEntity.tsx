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
import { CMSLoginType } from '../../../../../../components/CMSLogin/type';
import { TooltipComponent } from '../../../../../../components/Tooltip';
import { UserProjectsType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/UserProjects';

const mapStateToProps = (
	state: {
		CMSLogin: CMSLoginType.Redux.Store;
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
	projects: state.CMSLogin.projects,
	actual_project_id: state.CMSLogin.actual_project?.id,
});
const mapDispatchToProps = {
	editingStart: TimeEvidenceActions.editingStart,
	editingCancel: TimeEvidenceActions.editingCancel,
	editingWorkedTime: TimeEvidenceActions.editingWorkedTimeInit,
};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & { workerID: string; date: { date: string; is_holiday: boolean } };

function PrepareMessage(projects: { [p: string]: UserProjectsType.Project } | null, project_id: string | null) {
	if (!!projects && !!project_id) {
		return `Pracownik ma uzupełnione godziny na budowie - ${projects[project_id].name} | ${projects[project_id].webcon_code}`;
	}
	return 'Pracownik ma uzupełnione godziny na innej budowie';
}

function EvidenceEntity(props: Props) {
	if (props.evidence_entity && props.all_evidences) {
		const project_id = props.all_evidences[props.evidence_entity].project.id.toString();
		if (props.isEditable) {
			return (
				<TooltipComponent
					show={project_id !== props.actual_project_id}
					message={PrepareMessage(props.projects, project_id)}>
					<td style={{ maxWidth: 40, minWidth: 40, margin: 0, padding: 0 }}>
						<EditableCell
							classnames={classNames({
								'table-warning': project_id !== props.actual_project_id,
							})}
							handleChange={(value) => props.editingWorkedTime(props.workerID, props.date.date, value)}
							handleBlur={props.editingCancel}
							value={props.all_evidences[props.evidence_entity].worked_time.toString()}
						/>
					</td>
				</TooltipComponent>
			);
		} else {
			return (
				<TooltipComponent
					show={project_id !== props.actual_project_id}
					message={PrepareMessage(props.projects, project_id)}>
					<td
						className={classNames({
							'text-center': true,
							'table-warning': project_id !== props.actual_project_id,
						})}
						onClick={() =>
							props.editingStart({
								mode: EditingMode.BY_BOTH,
								coordinates: { date: props.date.date, worker: props.workerID },
							})
						}>
						{props.all_evidences[props.evidence_entity].worked_time}
					</td>
				</TooltipComponent>
			);
		}
	} else {
		if (props.isEditable) {
			return (
				<td
					className={classNames({
						'text-center': true,
					})}
					style={{ maxWidth: 40, minWidth: 40, margin: 0, padding: 0 }}>
					<EditableCell
						classnames={''}
						handleChange={(value) => props.editingWorkedTime(props.workerID, props.date.date, value)}
						handleBlur={props.editingCancel}
						value={''}
					/>
				</td>
			);
		} else {
			return (
				<td
					className={classNames({
						'text-center': true,
					})}
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
