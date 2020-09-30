import { gql } from 'apollo-boost';
import { graphQLClient } from '../../../../services';
import { TERM_TYPE } from '../types/constans';

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

export const normalizeTermsData = (data) => {
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
			termObject[dep_id].byJobId[job_id] = {
				[TERM_TYPE.PLANNED_FINISH]: null,
				[TERM_TYPE.REAL_FINISH]: null,
				[TERM_TYPE.REAL_START]: null,
			};
		}
	}
	return termObject;
};
