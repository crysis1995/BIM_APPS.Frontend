import WorkersLogActions from "../../types";
import { ICrewActions } from "./types/actions";

const CrewActions: ICrewActions = {
	addCrew: () => ({ type: WorkersLogActions.WorkTimeEvidence.Crew.ADD }),
	chooseCrew: (crewId) => ({
		type: WorkersLogActions.WorkTimeEvidence.Crew.CHOOSE,
		payload: { crew: crewId },
	}),
	fetchCrewStart: () => ({ type: WorkersLogActions.WorkTimeEvidence.Crew.FETCH_START }),
	fetchCrewEnd: (crews) => ({ type: WorkersLogActions.WorkTimeEvidence.Crew.FETCH_END, payload: { crews } }),
	fetchCrewError: (error) => ({ type: WorkersLogActions.WorkTimeEvidence.Crew.FETCH_ERROR, payload: { error } }),

};

export default CrewActions;
