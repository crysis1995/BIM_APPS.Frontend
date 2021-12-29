import { gql } from '@apollo/client';

export const MutationCreateCommentaryElement = gql`
	mutation CreateCommentaryElement($input: CreateCommentaryElementDtoInput!) {
		createCommentaryElement(input: $input) {
			id
			elementId
			userId
			content
			updatedAt
		}
	}
`;
