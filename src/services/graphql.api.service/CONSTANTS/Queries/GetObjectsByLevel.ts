import { gql } from 'apollo-boost';

const GetObjectsByLevel = gql`
    query GetObjectsByLevel($project_id: ID, $start: Int, $limit: Int, $level_id: ID) {
        acceptanceObjects(where: { project: $project_id, level: $level_id }, start: $start, limit: $limit) {
            id
            area
            volume
            running_meter
            vertical
            revit_id
            level {
                id
            }
            crane {
                id
            }
            VCF_Realisation
            rotation_day {
                id
                rotation_day
            }
            statuses(sort: "date:DESC") {
                status
                date
            }
        }
    }
`;
export default GetObjectsByLevel;

export namespace GetObjectsByLevelType {
	export type Response = { acceptanceObjects: AcceptanceObject[] };
	export type Request = { project_id: string; start: number; limit: number; level_id: string };

	export interface AcceptanceObject {
		id: string;
		area: number | null;
		volume: number;
		running_meter: number | null;
		vertical: Vertical;
		revit_id: number;
		level: Crane | null;
		crane: Crane | null;
		rotation_day: RotationDay | null;
		statuses: Status[];
		VCF_Realisation: string | null;
	}

	export interface Crane {
		id: string;
	}

	export interface RotationDay {
		id: string;
		rotation_day: number;
	}

	export interface Status {
		status: StatusEnum;
		date: string;
	}

	export enum StatusEnum{
		InProgress = "in_progress",
		Finished = "finished",
	}

	export enum Vertical {
		H = 'H',
		V = 'V',
	}
}
