import { ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { setResultsByJobId } from './actions/results_actions';
import { RESULTS_FETCH_END, RESULTS_FETCH_START } from './types';
import { fetchSummaryData, prepareResultsByJob } from './utils/results_utils';

export const fetchResultsForLevel = (action$, state$) =>
	action$.pipe(
		ofType(RESULTS_FETCH_START),
		mergeMap(({ current_level }) =>
			concat(
				from(Object.keys(state$.value.Odbiory.Jobs.jobs)).pipe(
					mergeMap((job_id) => {
						return from(fetchSummaryData(job_id, current_level)).pipe(
							map((value) => setResultsByJobId(job_id, prepareResultsByJob(value))),
							catchError((error) => {
								console.log(error);
								return of('error');
							}),
						);
					}),
				),
				of({ type: RESULTS_FETCH_END }),
			),
		),
	);
