import { ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { colorElements } from '../../../../components/ForgeViewer/redux/actions';
import { config } from '../../../../config';
import { hexToRgb } from '../../../../utils/hexToRgb';
import { fetchResultError, setResultsByJobId, updateResultsByJobId } from '../actions/results_actions';
import { COLOR_RESULTS, RESULTS_FETCH_END, RESULTS_FETCH_START, UPGRADING_UPDATE_JOB } from '../types';
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

export const colorizeRooms = (action$, state$) =>
	action$.pipe(
		ofType(COLOR_RESULTS),
		map(({ active_job_id }) =>
			colorElements(
				Object.entries(state$.value.ForgeViewer.model_rooms).map(([revit_id, { dbID }]) => {
					if (state$.value.Odbiory.Results.byJobId[active_job_id].elements.hasOwnProperty(revit_id)) {
						return {
							id: dbID,
							color: getColor(state$.value.Odbiory.Results.byJobId[active_job_id].elements[revit_id]),
						};
					} else {
						return {
							id: dbID,
							color: getColor(),
						};
					}
				}),
			),
		),
	);

function getColor(percentage_value) {
	const setting_color_map = config.units['area'].color_map;
	let colorIndex = 1;
	if (percentage_value) {
		colorIndex = Object.keys(setting_color_map).filter((id) =>
			setting_color_map[id].condition(percentage_value),
		)[0];
	}
	return hexToRgb(setting_color_map[colorIndex].color, true);
}
