import { gql } from '@apollo/client';

export const MyProjects = gql`
	query {
		myProjects {
			id
			createdAt
			updatedAt
			name
			webconCode
			metodologyCode
			supportedStatuses
			supportedApps
			supportedAppModules
			models {
				id
				name
				modelUrn
			}
			customParams {
				key
				type
				canBeNull
				description
				isCustom
			}
		}
	}
`;
