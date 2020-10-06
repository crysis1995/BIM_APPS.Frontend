import { gql } from 'apollo-boost';
import { graphQLClient } from '../../../../services';
import { PERMISSION, TERM_TYPE } from '../types/constans';

const GET_DEPARTMENTS_WITH_TERMS_QUERY = gql`
	query getDepartmentsWithTerms($l: String, $p: ID) {
		acceptanceDepartments(where: { level: $l }) {
			id
			name
			jobs {
				id
			}
			terms(where: { project: $p }) {
				id
				REAL_START
				PLANNED_FINISH
				REAL_FINISH
				job {
					id
				}
			}
		}
	}
`;

export const fetchDepartmentsWithTerms = (level, project_id) => {
	return graphQLClient().query({
		query: GET_DEPARTMENTS_WITH_TERMS_QUERY,
		variables: { l: level, p: project_id },
		fetchPolicy: 'no-cache',
	});
};

/**
 * Set user role if any exist to specyfic project
 *
 * @param user {{}}
 * @param project_id {string}
 * @param user_role {string}
 */
function setUserRole(user, project_id, user_role) {
	const project_role_component = user.project_roles.filter((item) => item.project.id === project_id)[0];
	if (project_role_component.hasOwnProperty('project_role')) {
		user_role = project_role_component.project_role.name;
	}
}

export const normalizeTermsData = (data, user, project) => {
	const user_id = user.id;
	const project_id = project.id;
	let user_role;
	setUserRole(user, project_id, user_role);

	if (!Array.isArray(data)) {
		throw new Error('Data nie jest typu Array');
	}
	let termObject = {};

	for (let department of data) {
		// jeśli departamenty są puste to pomiń roboty
		// UWAGA! POMIJAMY W TEN SPOSÓB ROBOTY NIEPRZYPISANE DO ŻADNEGO DEPARTAMENTU - CZYLI ROBOTY JEDNOSTKOWE
		if (department.jobs.length === 0) continue;

		const dep_id = department.id;

		termObject[dep_id] = {
			name: department.name,
			byJobId: {},
		};

		for (let job of department.jobs) {
			const job_id = job.id;

			if (!termObject[dep_id].byJobId.hasOwnProperty(job_id)) {
				termObject[dep_id].byJobId[job_id] = {};
			}

			Object.keys(TERM_TYPE).forEach((key) => {
				if (!termObject[dep_id].byJobId[job_id].hasOwnProperty(key)) {
					termObject[dep_id].byJobId[job_id][key] = {};
				}

				termObject[dep_id].byJobId[job_id][key] = {
					value: null,
					permissions: setPermission(),
				};
			});
		}
	}
	return termObject;
};

export const setPermission = () => {
	return [PERMISSION.VIEW];
};
