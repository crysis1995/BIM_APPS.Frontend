import { gql } from 'apollo-boost';
import { GetAllAcceptanceTermsType } from '../Queries/GetAcceptanceTerms';

const UPDATE_TERM = gql`
	mutation updateTerms(
		$term_id: ID!
		$REAL_START_Date: Date
		$PLANNED_FINISH_Date: Date
		$REAL_FINISH_Date: Date
		$PLANNED_START_Date: Date
		$object_ids: [ID]
	) {
		updateAcceptanceTerm(
			input: {
				data: {
					REAL_START: $REAL_START_Date
					PLANNED_FINISH: $PLANNED_FINISH_Date
					REAL_FINISH: $REAL_FINISH_Date
					PLANNED_START: $PLANNED_START_Date
					objects: $object_ids
				}
				where: { id: $term_id }
			}
		) {
			acceptanceTerm {
				id
				objects {
					id
				}
				level {
					id
					name
				}
				crane {
					id
					name
				}
				vertical
				REAL_START
				PLANNED_FINISH
				REAL_FINISH
				PLANNED_START_BP
				PLANNED_FINISH_BP
				PLANNED_START
			}
		}
	}
`;

export default UPDATE_TERM;

export namespace UpdateTermType {
	export type Response = { updateAcceptanceTerm: UpdateAcceptanceTerm };
	export type Request = {
		term_id: string;
		REAL_START_Date?: string;
		PLANNED_FINISH_Date?: string;
		REAL_FINISH_Date?: string;
		PLANNED_START_Date?: string;
		object_ids?: string[];
	};

	export interface UpdateAcceptanceTerm {
		acceptanceTerm: AcceptanceTerm;
	}

	export interface AcceptanceTerm {
		id: string;
		objects: Objects[];
		level: null | Level;
		crane: null | Crane;
		vertical: GetAllAcceptanceTermsType.Vertical;
		REAL_START: null | string;
		PLANNED_FINISH: null | string;
		REAL_FINISH: null | string;
		PLANNED_START_BP: null | string;
		PLANNED_FINISH_BP: null | string;
		PLANNED_START: null | string;
	}

	export interface Objects {
		id: string;
	}
	export interface Level {
		id: string;
		name: string;
	}
	export interface Crane {
		id: string;
		name: string;
	}
}
