import { gql } from '@apollo/client';

const Me = gql`
	query {
		me {
			email
			id
			firstName
			lastName
		}
	}
`;

export default Me;