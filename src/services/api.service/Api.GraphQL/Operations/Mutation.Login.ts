import { gql } from '@apollo/client';

const Login = gql`
	mutation login($email: String!, $password: String!) {
		login(input: { email: $email, password: $password }) {
			token
		}
	}
`;

export default Login;