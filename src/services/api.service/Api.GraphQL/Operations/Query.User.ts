import { gql } from '@apollo/client';

export const QueryUser = gql`
	query QueryUser($input: UserInput!) {
		user(input: $input) {
			email
			id
			firstName
			lastName
		}
	}
`;
