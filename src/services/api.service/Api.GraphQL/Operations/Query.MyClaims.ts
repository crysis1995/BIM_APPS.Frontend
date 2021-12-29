import { gql } from '@apollo/client';

const MyClaims = gql`
	query {
		myClaims {
			app {
				id
				appName
				moduleName
			}
			project {
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
	}
`;
export default MyClaims;
