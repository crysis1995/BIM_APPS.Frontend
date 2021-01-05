import { combineEpics, ofType } from 'redux-observable';
import { concat, EMPTY, from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import RestAPIService from '../../../services/rest.api.service';
import AutodeskLoginActions from './actions';
import types from './types';
import { timer } from './utils';


const epicHandleFetchAccessToken = (action$) =>
	action$.pipe(
		ofType(types.HANDLE_FETCH_ACCESS_TOKEN),
		mergeMap(() =>
			concat(
				from(new RestAPIService().GENERAL.getAccessToken()).pipe(
					map((e) => {
						return AutodeskLoginActions.LOGIN_3_LEGGED(e);
					}),
					catchError((err) => {
						console.error(err);
						return EMPTY;
					}),
				),
			),
		),
	);

const handleTimer = (action$) =>
	action$.pipe(
		ofType(types.LOGIN_3_LEGGED),
		mergeMap((data) =>
			// MNOZE PRZEZ 1000 ZEBY DOSTAC MILISEKUNDY
			from(timer(data.expires_in * 1000)).pipe(map(() => AutodeskLoginActions.handleFetchAccessToken())),
		),
	);

export default combineEpics(epicHandleFetchAccessToken, handleTimer);
