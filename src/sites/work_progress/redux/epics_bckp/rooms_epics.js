import { ofType } from 'redux-observable';
import { concat, EMPTY, from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { fetchObjectsStart } from '../actions/objects_actions';
import { dispatchActionDependOfParams, fetchRoomsEnd, fetchRoomsError } from '../actions/rooms_actions';
import { ROOMS_LOADING_START, SELECT_ROOM } from '../types';
import { fetchAllRooms } from '../utils/rooms_utils';

// export const fetchRoomsData = (action$, state$) =>
// 	action$.pipe(
// 		ofType(ROOMS_LOADING_START),
// 		switchMap(() => {
// 			const current_level = state$.value.Odbiory.Levels.current_level;
// 			if (current_level) {
// 				return from(fetchAllRooms(current_level)).pipe(
// 					map(({ byId, byDepartmentId }) => fetchRoomsEnd(byId, byDepartmentId)),
// 					catchError((error) => of(fetchRoomsError(error.message))),
// 				);
// 			} else {
// 				return EMPTY;
// 			}
// 		}),
// 	);

// export const selectRoom = (action$, state$) =>
// 	action$.pipe(
// 		ofType(SELECT_ROOM),
// 		filter(() => !state$.value.Odbiory.Jobs.jobs_loading || !state$.value.ForgeViewer.model_rooms_loading),
// 		switchMap(({ room, status, from_selector }) =>
// 			concat(
// 				!state$.value.Odbiory.Objects.objects_loading ? of(fetchObjectsStart()) : of(),
// 				of(dispatchActionDependOfParams(room, status, from_selector)),
// 			),
// 		),
// 	);
