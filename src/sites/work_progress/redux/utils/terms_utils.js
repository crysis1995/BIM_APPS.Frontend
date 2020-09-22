import { gql } from 'apollo-boost';
import { graphQLClient } from '../../../../services';
import { TERM_TYPE } from '../types/constans';
import dotProp from 'dot-prop';
import _ from 'lodash';

const GET_DEPARTMENTS_WITH_TERMS_QUERY = gql`
	query getDepartmentsWithTerms($l: String, $p: ID) {
		acceptanceJobs {
			id
			departments(where: { level: $l }) {
				id
				name
				terms(where: { project: $p }) {
					id
					REAL_START
					PLANNED_FINISH
					REAL_FINISH
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

	for (let job of data) {
		// jeśli departamenty są puste to pomiń roboty
		// UWAGA! POMIJAMY W TEN SPOSÓB ROBOTY NIEPRZYPISANE DO ŻADNEGO DEPARTAMENTU - CZYLI ROBOTY JEDNOSTKOWE
		if (job.departments.length === 0) continue;

		const job_id = job.id;
		termObject[job_id] = {
			byDepartment: {},
			[TERM_TYPE.PLANNED_FINISH]: null,
			[TERM_TYPE.REAL_FINISH]: null,
			[TERM_TYPE.REAL_START]: null,
		};

		for (let dep of job.departments) {
			const dep_id = dep.id;
			termObject[job_id].byDepartment[dep_id] = {
				name: dep.name,
				[TERM_TYPE.PLANNED_FINISH]: null,
				[TERM_TYPE.REAL_FINISH]: null,
				[TERM_TYPE.REAL_START]: null,
			};
		}
	}
	return termObject;
};
