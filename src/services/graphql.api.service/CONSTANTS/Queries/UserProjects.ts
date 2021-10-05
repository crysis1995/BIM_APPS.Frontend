import { gql } from 'apollo-boost';

const USER_PROJECTS = gql`
	query getWarbudUserProjects($user_id: ID!) {
		warbudProjUserRoles(where: { user: $user_id }) {
			project_role {
				id
				name
			}
			warbud_apps {
				name
			}
			project {
				id
				name
				webcon_code
				bim_models {
					model_urn
                    defaultViewName
				}
                params
				crane_ranges {
					crane {
						id
						name
					}
					levels {
						id
						name
					}
				}
			}
		}
	}
`;

export default USER_PROJECTS;

export namespace UserProjectsType {
	export type Response = {
		warbudProjUserRoles: WarbudProjUserRole[];
	};
	export type Request = { user_id: string };

	export interface WarbudProjUserRole {
		project_role: ProjectRole;
		warbud_apps: WarbudApp[];
		project: Project;
	}

	export interface Project {
		id: string;
		name: string;
		webcon_code: string;
		bim_models: BimModel[];
		crane_ranges: CraneRange[];
		params: Param[] | null;
	}

	export interface BimModel {
		model_urn: string;
		defaultViewName:string | null
	}

	export interface CraneRange {
		crane: null | Crane;
		levels: Level[];
	}

	export interface Crane {
		id: string;
		name: string;
	}

	export interface Level {
		id: string;
		name: string;
	}

	export interface ProjectRole {
		id: string;
		name: string;
	}

	export interface WarbudApp {
		name: string;
	}

	export interface Param {
		key?:         string;
		valueTypes:   ValueType[];
		description?: string;
	}

	export enum ValueType {
		Null = "null",
		Number = "number",
		String = "string",
	}

}
