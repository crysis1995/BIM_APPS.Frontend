import { Epic } from 'redux-observable';
import { filter, map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { timer } from '../utils';
import AutodeskLoginActions from '../actions';
import { RootActions } from '../../_types/RootActions';
import { RootState } from '../../_types/RootState';
import { AutodeskLogin } from '../type';

export const HandleTimerEpic: Epic<RootActions, RootActions, RootState> = (action$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<AutodeskLogin.Redux.IActions['Login3Legged']> =>
				data.type === AutodeskLogin.Redux.Types.LOGIN_3_LEGGED,
		),
		mergeMap((data) =>
			// MNOZE PRZEZ 1000 ZEBY DOSTAC MILISEKUNDY
			from(timer(data.payload.expires_in * 1000)).pipe(
				map(() => AutodeskLoginActions.HandleFetchAccessToken()),
			),
		),
	);
