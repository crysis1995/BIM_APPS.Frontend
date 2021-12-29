import WorkersLog from '../../../../types';
import { Epic } from 'redux-observable';

import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import LabourInputGeneralActions from '../../general/actions';
import dayjs from 'dayjs';
import { FetchOtherWorkOptions } from './FetchOtherWorkOptions';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import { RootActions } from '../../../../../../state/types/RootActions';
import { RootState } from '../../../../../../state';

/*
 * 	start wszelkich niezbędnych metod przy starcie komponentu
 * */
export const OnInitializeComponent: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(
				data,
			): data is ReturnType<
				WorkersLog.LabourInput.Redux.General.IActions['InitializeComponent']
			> =>
				data.type === WorkersLog.LabourInput.Redux.General.Types.INITIALIZE && data.payload,
		),
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
			const GRAPHQL = new GraphQLAPIService(state.CMSLogin.credentials?.token);
			return merge(
				of(LabourInputGeneralActions.SetDate(dayjs())),
				FetchOtherWorkOptions(state, GRAPHQL),
			);
		}),
	);
