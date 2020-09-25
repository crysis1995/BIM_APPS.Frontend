import { ofType } from 'redux-observable';
import { mergeMap, map, mapTo } from 'rxjs/operators';
import { normalize } from '../../../utils/normalize';
import { jobsFetchEnd } from './actions/jobs_actions';
import { TEST, TEST2, TEST3, TEST_START } from './types';
import { addParameterWithValue, fetchAllJobsFromAPI } from './utils/jobs_utils';

export const test = (action$) =>
	action$.pipe(
		ofType(TEST_START),
		mergeMap(() => console.log('asdasd')),
		mapTo({ type: TEST }),

		// 	mergeMap((action) => fetchAllJobsFromAPI()),
		// 	.pipe(
		// 	map(
		// 		({ data }) => console.log(data),
		// 		// addParameterWithValue(normalize(data.acceptanceJobs), 'hidden', (val) => val.unit === 'piece'),
		// 	),
		// 	map((e) => console.log('jtesem tutaj')),
		// 	// map(jobsFetchEnd),
		// ),
	);
