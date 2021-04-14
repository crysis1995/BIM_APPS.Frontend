import WorkersLogActions from '../../types';
import { ICrewActions } from './types/actions';

const CrewActions: ICrewActions = {
	addCrew: () => ({ type: WorkersLogActions.WorkTimeEvidence.Crew.ADD }),
	chooseCrew: (crewId) => ({
		type: WorkersLogActions.WorkTimeEvidence.Crew.CHOOSE,
		payload: { crew: crewId },
	}),
	fetchCrewStart: () => ({ type: WorkersLogActions.WorkTimeEvidence.Crew.FETCH_START }),
	fetchCrewEnd: (crews) => ({ type: WorkersLogActions.WorkTimeEvidence.Crew.FETCH_END, payload: { crews } }),
	fetchCrewError: (error) => ({ type: WorkersLogActions.WorkTimeEvidence.Crew.FETCH_ERROR, payload: { error } }),
	fetchCrewSummariesStart: (data) => ({
		type: WorkersLogActions.WorkTimeEvidence.Crew.FETCH_CREW_SUMMARIES_START,
		payload: { data },
	}),
	fetchCrewSummariesEnd: (crew_summary) => ({
		type: WorkersLogActions.WorkTimeEvidence.Crew.FETCH_CREW_SUMMARIES_END,
		payload: { crew_summary },
	}),
	createCrewSummary: () => ({
		type: WorkersLogActions.WorkTimeEvidence.Crew.CREATE_CREW_SUMMARY,
	}),
	updateCrewSummary: (crew_summary) => ({
		type: WorkersLogActions.WorkTimeEvidence.Crew.UPDATE_CREW_SUMMARY,
		payload: { crew_summary },
	}),
	cleanSummary: () => ({ type: WorkersLogActions.WorkTimeEvidence.Crew.CLEAN_SUMMARY }),
};

export default CrewActions;
