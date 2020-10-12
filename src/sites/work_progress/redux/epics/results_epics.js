import { ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { fetchResultError, setResultsByJobId } from '../actions/results_actions';
import { RESULTS_FETCH_END, RESULTS_FETCH_START } from '../types';
import { fetchSummaryData, prepareResultsByJob } from '../utils/results_utils';

export const fetchResultsForLevel = (action$, state$) =>
	action$.pipe(
		ofType(RESULTS_FETCH_START),
		switchMap(() => {
			const current_level = state$.value.Odbiory.Levels.current_level;
			return concat(
				from(Object.keys(state$.value.Odbiory.Jobs.jobs)).pipe(
					mergeMap((job_id) =>
						from(fetchSummaryData(job_id, current_level)).pipe(
							map((value) => setResultsByJobId(job_id, prepareResultsByJob(value))),
							catchError((error) => of(fetchResultError(error.message))),
						),
					),
				),
				of({ type: RESULTS_FETCH_END }),
			);
		}),
	);
