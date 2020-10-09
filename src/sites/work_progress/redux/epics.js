import { ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { jobsLoadingEnd, jobsLoadingStart } from './actions/jobs_actions';
import { fetchObjectsByRoom, fetchObjectsEnd, fetchObjectsSetData, fetchObjectsStart } from './actions/objects_actions';
import { setResultsByJobId } from './actions/results_actions';
import { dispatchActionDependOfParams } from './actions/rooms_actions';
import { setUpgradingData } from './actions/upgrading_actions';
import { ADD_ROOM_TO_SELECTION, RESULTS_FETCH_END, RESULTS_FETCH_START, SELECT_ROOM } from './types';
import { fetchSummaryData, prepareResultsByJob } from './utils/results_utils';
import { prepUpgradingDataToSet } from './utils/upgrading_utils';

export const fetchResultsForLevel = (action$, state$) =>
	action$.pipe(
		ofType(RESULTS_FETCH_START),
		switchMap(({ current_level }) =>
			concat(
				from(Object.keys(state$.value.Odbiory.Jobs.jobs)).pipe(
					mergeMap((job_id) => {
						return from(fetchSummaryData(job_id, current_level)).pipe(
							map((value) => setResultsByJobId(job_id, prepareResultsByJob(value))),
							catchError((error) => {
								return of('error');
							}),
						);
					}),
				),
				of({ type: RESULTS_FETCH_END }),
			),
		),
	);

export const selectRoom = (action$, state$) =>
	action$.pipe(
		ofType(SELECT_ROOM),
		filter(() => !state$.value.Odbiory.Jobs.jobs_loading || !state$.value.ForgeViewer.model_rooms_loading),
		mergeMap(({ room, status, from_selector }) => {
			return concat(
				!state$.value.Odbiory.Objects.objects_loading ? of(fetchObjectsStart()) : of(),
				of(dispatchActionDependOfParams(room, status, from_selector)),
			);
		}),
	);

export const getRoomData = (action$, state$) =>
	action$.pipe(
		ofType(ADD_ROOM_TO_SELECTION),
		mergeMap(({ selectedRoom }) => {
			if (state$.value.Odbiory.Objects.objects.hasOwnProperty(selectedRoom)) {
				console.log(state$.value.Odbiory.Objects.objects);
				return from(Object.keys(state$.value.Odbiory.Jobs.jobs)).pipe(
					mergeMap((job_id) =>
						concat(
							of(jobsLoadingStart()),
							of(fetchObjectsEnd()),
							of(
								setUpgradingData(
									job_id,
									selectedRoom,
									prepUpgradingDataToSet(job_id, state$.value.Odbiory.Objects.objects[selectedRoom]),
								),
							),
							of(jobsLoadingEnd()),
						),
					),
				);
			} else {
				return from(fetchObjectsByRoom(state$.value.Odbiory.Rooms.rooms[selectedRoom].id)).pipe(
					mergeMap((data) => {
						return concat(
							of(fetchObjectsSetData(selectedRoom, data)),
							of(jobsLoadingStart()),
							of(fetchObjectsEnd()),
							from(Object.keys(state$.value.Odbiory.Jobs.jobs)).pipe(
								map((job_id) =>
									setUpgradingData(job_id, selectedRoom, prepUpgradingDataToSet(job_id, data)),
								),
							),
							of(jobsLoadingEnd()),
						);
					}),
					catchError((error) => {
						console.log(error);
						return of('error2');
					}),
				);
			}
		}),
	);
