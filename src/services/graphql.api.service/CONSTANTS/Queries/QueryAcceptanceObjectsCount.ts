import { gql } from 'apollo-boost';
import { GetObjectsByLevelType } from './GetObjectsByLevel';

export const QueryAcceptanceObjects = gql`
	query QueryAcceptanceObjects(
		$area: Boolean = false
		$volume: Boolean = false
		$running_meter: Boolean = false
		$vertical: Boolean = false
		$revit_id: Boolean = false
		$VCF_Realisation: Boolean = false
		$details: Boolean = false
		$statuses: Boolean = false
	) {
		acceptanceObjects {
			id
			area @include(if: $area)
			volume @include(if: $volume)
			running_meter @include(if: $running_meter)
			vertical @include(if: $vertical)
			revit_id @include(if: $revit_id)
			VCF_Realisation @include(if: $VCF_Realisation)
			details @include(if: $details)
			statuses @include(if: $statuses) {
				status
				date
			}
		}
	}
`;

export namespace QueryAcceptanceObjectsType {
	export type Response = { acceptanceObjects: AcceptanceObject[] };
	export type Request = DataType & QueryType;

	export type DataType = {
		area?: boolean;
		volume?: boolean;
		running_meter?: boolean;
		vertical?: boolean;
		revit_id?: boolean;
		VCF_Realisation?: boolean;
		details?: boolean;
		statuses?: boolean;
	};

	export type QueryType = {
		start?: number;
		limit?: number;
	};

	export type AcceptanceObject = {
		id?: string;
		area?: number | null;
		volume?: number | null;
		running_meter?: number | null;
		vertical?: GetObjectsByLevelType.Vertical | null;
		revit_id?: number;
		statuses?: GetObjectsByLevelType.Status[];
		VCF_Realisation?: string | null;
	};
}
