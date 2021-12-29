import { gql } from '@apollo/client';

const MutationPasswordReset = gql`
	mutation resetPassword(
		$id: String!
		$oldPassword: String!
		$newPassword: String!
		$confirmPassword: String!
	) {
		passwordReset(
			input: {
				id: $id
				oldPassword: $oldPassword
				newPassword: $newPassword
				confirmPassword: $confirmPassword
			}
		)
	}
`;

export default MutationPasswordReset;
