import WorkersLogActions from '../../../types';
import { CrewPayload, CrewSummary } from './payload';
import { ReturnTypeFromInterface } from '../../worker/types/actions';
import { CrewSummariesData } from '../utils/ExtractRequestData';

export interface ICrewActions {
	addCrew: () => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Crew.ADD;
	};
	chooseCrew: (
		crew: CrewPayload['id'],
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Crew.CHOOSE;
		payload: { crew: typeof crew };
	};
	fetchCrewStart: () => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Crew.FETCH_START;
	};
	fetchCrewEnd: (crews: {
		[key: string]: CrewPayload;
	}) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Crew.FETCH_END;
		payload: {
			crews: typeof crews;
		};
	};
	fetchCrewError: (
		error: string,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Crew.FETCH_ERROR;
		payload: { error: typeof error };
	};
	fetchCrewSummariesStart: (
		data: CrewSummariesData,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Crew.FETCH_CREW_SUMMARIES_START;
		payload: { data: typeof data };
	};
	fetchCrewSummariesEnd: (
		crew_summary: CrewSummary | null,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Crew.FETCH_CREW_SUMMARIES_END;
		payload: { crew_summary: typeof crew_summary };
	};
	updateCrewSummary: (
		crew_summary: CrewSummary | null,
	) => {
		type: typeof WorkersLogActions.WorkTimeEvidence.Crew.UPDATE_CREW_SUMMARY;
		payload: { crew_summary: typeof crew_summary };
	};
}

export type CrewActionsTypes = ReturnTypeFromInterface<ICrewActions>;
