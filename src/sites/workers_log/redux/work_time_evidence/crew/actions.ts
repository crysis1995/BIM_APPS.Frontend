
import WorkersLog from '../../../types';

const CrewActions: WorkersLog.WorkTimeEvidence.Crew.Redux.IActions = {
	addCrew: () => ({ type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.ADD }),
	chooseCrew: (crewId) => ({
		type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.CHOOSE,
		payload: { crew: crewId },
	}),
	fetchCrewStart: () => ({ type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_START }),
	fetchCrewEnd: (crews) => ({ type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_END, payload: { crews } }),
	fetchCrewError: (error) => ({ type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_ERROR, payload: { error } }),
	fetchCrewSummariesStart: (data) => ({
		type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_CREW_SUMMARIES_START,
		payload: { data },
	}),
	fetchCrewSummariesEnd: (crew_summary) => ({
		type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.FETCH_CREW_SUMMARIES_END,
		payload: { crew_summary },
	}),
	createCrewSummary: () => ({
		type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.CREATE_CREW_SUMMARY,
	}),
	updateCrewSummary: (crew_summary) => ({
		type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.UPDATE_CREW_SUMMARY,
		payload: { crew_summary },
	}),
	cleanSummary: () => ({ type: WorkersLog.WorkTimeEvidence.Crew.Redux.Types.CLEAN_SUMMARY }),
};

export default CrewActions;
