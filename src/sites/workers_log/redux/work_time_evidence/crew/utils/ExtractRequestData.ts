import { RootState } from '../epics';
export interface CrewSummariesData {
	crew_id: string;
	start_date: string;
	end_date: string;
	user_id: string;
	project_id: string;
}

export function ExtractRequestData(state: RootState) {
	let requestData: CrewSummariesData | null = null;

	const crew_id = state.WorkersLog.WorkTimeEvidence.Crews.actual;
	const user_id = state.CMSLogin.user?.id;
	const project_id = state.CMSLogin.actual_project?.id;
	const start_date = state.WorkersLog.WorkTimeEvidence.General.calendar.view_range?.start;
	const end_date = state.WorkersLog.WorkTimeEvidence.General.calendar.view_range?.end;

	if (crew_id && user_id && project_id && start_date && end_date) {
		requestData = { crew_id, user_id, project_id, start_date, end_date };
	}
	return requestData;
}
