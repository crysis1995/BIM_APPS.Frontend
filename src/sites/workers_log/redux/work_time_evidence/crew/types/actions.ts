import WorkersLogActions from '../../../types';
import { CrewPayload } from './payload';
import { ReturnTypeFromInterface } from '../../worker/types/actions';

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
}

export type CrewActionsTypes = ReturnTypeFromInterface<ICrewActions>;
