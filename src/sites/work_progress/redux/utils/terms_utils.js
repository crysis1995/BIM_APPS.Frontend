import { gql } from 'apollo-boost';
import dotProp from 'dot-prop';
import { graphQLClient } from '../../../../services';
import { MONOLITHIC, PERMISSION, TERM_TYPE } from '../types/constans';

const GET_DEPARTMENTS_WITH_TERMS_QUERY = gql`
	query getDepartmentsWithTerms($l: String, $p: ID) {
		acceptanceDepartments(where: { level: $l }) {
			id
			name
			jobs {
				id
			}
			editors {
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
				user {
					id
				}
			}
		}
	}
`;

/**
 *
 * @param level {string}
 * @param project_id {string}
 * @returns {Promise<ApolloQueryResult<any>>}
 */
export const fetchDepartmentsWithTerms = (level, project_id) => {
	return graphQLClient()
		.query({
			query: GET_DEPARTMENTS_WITH_TERMS_QUERY,
			variables: { l: level, p: project_id },
			fetchPolicy: 'no-cache',
		})
		.then((e) => e.data);
};

/**
 *
 * @param data {Array}
 * @param user {Object}
 * @param project {Object}
 * @returns {{}}
 */
export const normalizeTermsData = (data, user, project) => {
	function isAdmin(user_role) {
		if (user_role) {
			return /admin/i.test(user_role);
		}
		return false;
	}
	function isTermOwner(term, user_id, job_id) {
		if (user_id && job_id) {
			if (term && term.job && term.job.id) {
				if (term.job.id === job_id) {
					if (term.user && term.user.id) {
						return term.user.id === user_id;
					}
				}
			}
		}
		return false;
	}
	function isDepartamentEditor(editors, user_id) {
		if (editors && editors.length > 0) {
			let editors_ids = [];
			editors_ids = editors.map((e) => e.id);
			return editors_ids.includes(user_id);
		}
		return false;
	}

	if (!Array.isArray(data)) {
		throw new Error('Data nie jest typu Array');
	}
	let user_id,
		project_id,
		user_role,
		termObject = {};
	if (user && project) {
		user_id = user.id;
		project_id = project.id;
		user_role = getUserRole(user, project_id);
	}

	for (let department of data) {
		// jeśli departamenty są puste to pomiń roboty
		// UWAGA! POMIJAMY W TEN SPOSÓB ROBOTY NIEPRZYPISANE DO ŻADNEGO DEPARTAMENTU - CZYLI ROBOTY JEDNOSTKOWE
		if (department.jobs.length === 0) continue;

		const dep_id = department.id;
		const terms_array = department.terms;

		termObject[dep_id] = {
			name: department.name,
			byJobId: {},
		};

		for (let job of department.jobs) {
			const job_id = job.id;
			const term = terms_array.filter((term) => term.job.id === job_id)[0];

			if (!termObject[dep_id].byJobId.hasOwnProperty(job_id)) {
				termObject[dep_id].byJobId[job_id] = {};
			}

			Object.keys(TERM_TYPE).forEach((key) => {
				if (!termObject[dep_id].byJobId[job_id].hasOwnProperty(key)) {
					termObject[dep_id].byJobId[job_id][key] = {};
				}

				termObject[dep_id].byJobId[job_id][key] = {
					value: term && term[key] ? term[key] : null,
					permissions: setPermission({
						can_view: !!user_id,
						can_create:
							!!user_id && (isDepartamentEditor(department.editors, user_id) || isAdmin(user_role)),
						can_update: !!user_id && (isTermOwner(term, user_id, job_id) || isAdmin(user_role)),
					}),
				};
			});
		}
	}
	return termObject;
};

/**
 *
 * @param can_view {boolean}
 * @param can_update {boolean}
 * @param can_create {boolean}
 * @returns {[string]}
 */
const setPermission = ({ can_view = false, can_update = false, can_create = false }) => {
	let permission_array = [];
	if (can_view) {
		permission_array.push(PERMISSION.VIEW);
		if (can_create) {
			permission_array.push(PERMISSION.CREATE);
			if (can_update) {
				permission_array.push(PERMISSION.UPDATE);
			}
		}
	}
	return permission_array;
};

/**
 * Set user role if any exist to specyfic project
 *
 * @param user {object}
 * @param project_id {string}
 * @param user_role {string}
 */
function getUserRole(user, project_id) {
	// const project_role_component = user.project_roles.filter((item) => item.project.id === project_id)[0];
	const project_role_component = user.project_roles[project_id];
	if (project_role_component.hasOwnProperty('project_role')) {
		return project_role_component.project_role.name;
	}
}
/*
 *           TYMCZASOWA FUNKCJA!!!
 *
 * */
export function parseTermsToMonolithic(array) {
	if (!Array.isArray(array)) array = JSON.parse(array);
	let state = {};
	array.forEach((item) => {
		Object.keys(MONOLITHIC.TERM_TYPE).forEach((term_key) => {
			dotProp.set(
				state,
				`byCrane.${item['655059']}.byLevel.${item['655056']}.byGroup.${item['655057']}.${term_key}`,
				[MONOLITHIC.TERM_TYPE.PLANNED_FINISH_BP.id, MONOLITHIC.TERM_TYPE.PLANNED_START_BP.id].includes(term_key)
					? item[MONOLITHIC.TERM_TYPE[term_key].dbKey]
					: '',
			);
		});
	});
	return state;
}

export const asd = (items,crane_id, level_id) => {
	items.filter(e => e.Crane === crane_id && e.Level === level_id)

	return Boolean
}