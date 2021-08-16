import { gql } from 'apollo-boost';

const GetAllDelacCauses = gql`
	query GetAllDelacCauses {
		acceptanceDelayCauses {
			id
			name
			parent {
				id
			}
			is_main
		}
	}
`;

export default GetAllDelacCauses;

export namespace GetAllDelacCausesType {
	export type Response = { acceptanceDelayCauses: AcceptanceDelayCause[] };
	export type Request = {};

	export interface AcceptanceDelayCause {
		id: string;
		name: string;
		parent: Parent | null;
		is_main: boolean;
	}

	export interface Parent {
		id: string;
	}
}
