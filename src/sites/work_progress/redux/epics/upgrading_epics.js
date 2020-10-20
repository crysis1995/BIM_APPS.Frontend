import { ofType } from 'redux-observable';
import { concat, EMPTY, from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { objectJobFetchCompleted, objectJobFetchStart } from '../actions/jobs_actions';
import { updateJobInStore } from '../actions/upgrading_actions';
import { UPGRADE_BY_JOB } from '../types';

export const upgradeJobEpic = (action$, state$) =>
	action$.pipe(
		ofType(UPGRADE_BY_JOB),
		filter(() => state$.value.Odbiory.Rooms.selected_rooms.length > 0),
		switchMap(({ job_id, value }) => {
			const { selected_rooms } = state$.value.Odbiory.Rooms;
			return concat(
				of(objectJobFetchStart()),
				from(selected_rooms).pipe(map((revit_id) => updateJobInStore(job_id, revit_id, value, null))),
				of(objectJobFetchCompleted()),
			);
		}),
	);
