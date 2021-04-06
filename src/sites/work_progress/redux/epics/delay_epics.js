import { combineEpics, ofType } from 'redux-observable';
import { concat, EMPTY, from, of } from 'rxjs';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import GraphQLAPIService from '../../../../services/graphql.api.service';
import RestAPIService from '../../../../services/rest.api.service';
import { createNewDelay, delaysFetchEnd, delaysFetchStart } from '../actions/delays_actions';
import { ACCEPTANCE_MONOLITHIC_INIT, DELAYS_CREATE_NEW_INIT } from '../types';

export const initHandler = (action$) =>
	action$.pipe(
		ofType(ACCEPTANCE_MONOLITHIC_INIT),
		mergeMap(() => {
			const REST = new RestAPIService();
			return concat(
				of(delaysFetchStart()),
				from(REST.MONOLITHIC.getDelayCauses()).pipe(map((data) => delaysFetchEnd(data))),
			);
		}),
	);

export const handleSendDelays = (action$, state$) =>
	action$.pipe(
		ofType(DELAYS_CREATE_NEW_INIT),
		withLatestFrom(state$),
		switchMap(([{ crane_id, level_id, selected_cases, commentary, date }, state]) => {
			const user_id = state.CMSLogin.user.id
				? state.CMSLogin.user.id.hasOwnProperty('id')
					? state.CMSLogin.user.id.id
					: state.CMSLogin.user.id
				: null;
			const crane_name = crane_id && state.Odbiory.OdbioryComponent.MONOLITHIC.cranes[crane_id].name;
			const level_name = level_id && state.Odbiory.OdbioryComponent.MONOLITHIC.levels[level_id].name;
			// const rotation_day_id = state.Odbiory.OdbioryComponent.MONOLITHIC.calendar[rotation_day].id;
			const GRAPHQL = new GraphQLAPIService();
			if (crane_id && level_id && date) {
				return from(
					GRAPHQL.MONOLITHIC.createDelay(user_id, commentary, date, selected_cases, level_id, crane_id),
				).pipe(map(() => createNewDelay(crane_name, level_name, date, selected_cases, commentary)));
			} else {
				return EMPTY;
			}
		}),
	);

export default combineEpics(initHandler, handleSendDelays);
