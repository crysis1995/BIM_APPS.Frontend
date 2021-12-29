import { gql } from '@apollo/client';

export interface QueryGetAllElementsInput {
	projectId: number;
	updatedAt: string;
}

const QueryGetAllElements = gql`
	query GetAllElements($projectId: Int!, $updatedAt: DateTime!) {
		elements(where: { projectId: { eq: $projectId }, updatedAt: { gt: $updatedAt } }) {
			id
			craneId
			projectId
			area
			bimModelId
			comments {
				id
				userId
				content
			}
			levelId
			rotationDay
			realisationMode
			vertical
			revitId
			runningMetre
			volume
			updatedAt
			customParamValues {
				customParamsId
				value
			}
		}
	}
`;

export default QueryGetAllElements;
