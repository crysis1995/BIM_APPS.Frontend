import { ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { jobsLoadingEnd, jobsLoadingStart } from './actions/jobs_actions';
import { fetchObjectsEnd, fetchObjectsSetData } from './actions/objects_actions';
import { setUpgradingData } from './actions/upgrading_actions';
import { ADD_ROOM_TO_SELECTION } from './types';
import { fetchObjectsByRoom } from './utils/objects_utils';
import { prepUpgradingDataToSet } from './utils/upgrading_utils';

export const getRoomData = (action$, state$) =>
	action$.pipe(
		ofType(ADD_ROOM_TO_SELECTION),
		mergeMap(({ selectedRoom }) => {
			if (state$.value.Odbiory.Objects.objects.hasOwnProperty(selectedRoom)) {
				return concat(
					of(jobsLoadingStart()),
					of(fetchObjectsEnd()),
					from(Object.keys(state$.value.Odbiory.Jobs.jobs)).pipe(
						map((job_id) =>
							setUpgradingData(
								job_id,
								selectedRoom,
								prepUpgradingDataToSet(job_id, state$.value.Odbiory.Objects.objects[selectedRoom]),
							),
						),
					),
					of(jobsLoadingEnd()),
				);
			} else {
				return from(fetchObjectsByRoom(state$.value.Odbiory.Rooms.rooms[selectedRoom].id)).pipe(
					mergeMap((data) =>
						concat(
							of(fetchObjectsSetData(selectedRoom, data)),
							of(jobsLoadingStart()),
							of(fetchObjectsEnd()),
							from(Object.keys(state$.value.Odbiory.Jobs.jobs)).pipe(
								map((job_id) =>
									setUpgradingData(job_id, selectedRoom, prepUpgradingDataToSet(job_id, data)),
								),
							),
							of(jobsLoadingEnd()),
						),
					),
					catchError((error) => {
						console.log(error);
						return of('error2');
					}),
				);
			}
		}),
	);
