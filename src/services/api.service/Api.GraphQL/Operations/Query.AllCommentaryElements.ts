import { gql } from '@apollo/client';

export interface QueryAllCommentaryElementsInput {
	elementIds: number[];
	updatedAt: string;
}
export const QueryAllCommentaryElements = gql`
	query GetAllCommentaryElements($elementIds: [Int!], $updatedAt: DateTime!) {
		commentaryElements(
			where: { elementId: { in: $elementIds }, updatedAt: { gte: $updatedAt } }
		) {
			id
			elementId
			userId
			content
			updatedAt
		}
	}
`;
