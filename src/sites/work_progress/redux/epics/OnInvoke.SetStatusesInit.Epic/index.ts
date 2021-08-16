import WorkProgress from '../../../types';
import { ModalType } from '../../../../../components/Modal/type';
import { CMSLoginType } from '../../../../../components/CMSLogin/type';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../store';
import { filter, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { concat, EMPTY, from, of } from 'rxjs';
import WorkProgressMonolithicUpgradingActions from '../../monolithic/upgrading/actions';
import { RootActions } from '../../../../../reducers/type';

export const OnInvokeSetStatusesInitEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['SetStatusesInit']> =>
				data.type === WorkProgress.Monolithic.Upgrading.Redux.Types.SET_STATUSES_INITIALIZER,
		),
		withLatestFrom(state$),
		switchMap(
			([
				{
					payload: { date, selectedElements, status },
				},
				state,
			]) => {
				const API = new GraphQLAPIService(state.CMSLogin.credentials?.access_token);
				const user_id = state.CMSLogin.user?.id;
				const byRevitID = state.WorkProgress.Monolithic.Upgrading.byRevitId;
				if (byRevitID && user_id) {
					return concat(
						of(WorkProgressMonolithicUpgradingActions.SetStatusesStart()),
						from(selectedElements).pipe(
							mergeMap((revitID) =>
								from(
									API.MONOLITHIC.Status.Create({
										date,
										user_id,
										status,
										object_id: byRevitID[revitID].id,
									}),
								).pipe(
									mergeMap((responseStatus) => {
										if (responseStatus) {
											return of(
												WorkProgressMonolithicUpgradingActions.SetStatus(
													responseStatus,
													revitID,
												),
											);
										} else {
											return EMPTY;
										}
									}),
								),
							),
						),
						of(WorkProgressMonolithicUpgradingActions.SetStatusesEnd()),
						of(WorkProgressMonolithicUpgradingActions.CheckObjectsGroupTerms(selectedElements)),
						of(WorkProgressMonolithicUpgradingActions.HandleSetCurrentElement())
					);
				}
				return EMPTY;
			},
		),
	);
