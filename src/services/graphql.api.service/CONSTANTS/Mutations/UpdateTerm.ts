import { gql } from 'apollo-boost';

const UPDATE_TERM = gql`
	mutation updateTerms($i: ID!, $RS: DateTime, $PF: DateTime, $RF: DateTime, $PS: DateTime, $obj: [ID]) {
		updateAcceptanceTerm(
			input: {
				data: { REAL_START: $RS, PLANNED_FINISH: $PF, REAL_FINISH: $RF, PLANNED_START: $PS, objects: $obj }
				where: { id: $i }
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
		REAL_START_Date?: Date;
		PLANNED_FINISH_Date?: Date;
		REAL_FINISH_Date?: Date;
		PLANNED_START_Date?: Date;
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
		vertical: VERTICAL;
		REAL_START: null | string;
		PLANNED_FINISH: null | string;
		REAL_FINISH: null | string;
		PLANNED_START_BP: null | string;
		PLANNED_FINISH_BP: null | string;
		PLANNED_START: null | string;
	}

	export enum VERTICAL {
		H = 'H',
		V = 'V',
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
