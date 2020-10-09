import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { concat, from, of } from 'rxjs';
import { normalize } from '../../../../utils/normalize';
import { fetchRoomsEnd, fetchRoomsError } from '../actions/rooms_actions';
import { ROOMS_LOADING_START } from '../types';
import { fetchAllRooms } from '../utils/rooms_utils';

export const fetchRoomsData = (action$, state$) =>
	action$.pipe(
		ofType(ROOMS_LOADING_START),
		switchMap(() => {
			const current_level = state$.value.Odbiory.Levels.current_level;
			if (current_level) {
				return from(fetchAllRooms(current_level)).pipe(
					map((rooms) => fetchRoomsEnd(normalize(rooms, 'revit_id'))),
					catchError((error) => of(fetchRoomsError(error.message))),
				);
			}
		}),
	);
