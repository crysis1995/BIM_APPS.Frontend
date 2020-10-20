import { ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, filter } from 'rxjs/operators';
import { fetchResultError, setResultsByJobId, updateResultsByJobId } from '../actions/results_actions';
import { RESULTS_FETCH_END, RESULTS_FETCH_START, UPGRADING_UPDATE_JOB } from '../types';
import { fetchSummaryData, prepareResultsByJob } from '../utils/results_utils';

export const fetchResultsForLevel = (action$, state$) =>
	action$.pipe(
		ofType(RESULTS_FETCH_START),
		filter(() => state$.value.Odbiory.Jobs.jobs_fetched),
		switchMap(() => {
			const current_level = state$.value.Odbiory.Levels.current_level;
			return concat(
				from(Object.keys(state$.value.Odbiory.Jobs.jobs)).pipe(
					mergeMap((job_id) =>
						from(fetchSummaryData(job_id, current_level)).pipe(
							map((value) => setResultsByJobId(job_id, prepareResultsByJob(value))),
							catchError((error) => {
								console.error(error);
								return of(fetchResultError(error.message));
							}),
						),
					),
				),
				of({ type: RESULTS_FETCH_END }),
			);
		}),
	);

export const updateResultByUpgrading = (action$, state$) =>
	action$.pipe(
		ofType(UPGRADING_UPDATE_JOB),
		switchMap(({ job_id, revit_id, percentage_value }) => {
			const {
				summary_value: { [revit_id]: value },
			} = state$.value.Odbiory.Upgrading.byJobId[job_id];
			return of(updateResultsByJobId(job_id, value, revit_id, percentage_value));
		}),
	);
