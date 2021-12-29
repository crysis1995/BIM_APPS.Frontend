import WorkProgress from '../../../types';
import { ModalType } from '../../../../../state/Modal/type';

type ActionTypes = WorkProgress.Monolithic.Delays.Redux.Actions | ModalType.Redux.Actions;

// export const OnCreateDelayEpic: Epic<ActionTypes, ActionTypes, RootState> = (action$, state$) =>
// 	action$.pipe(
// 		filter(
// 			(data): data is ReturnType<WorkProgress.Monolithic.Delays.Redux.IActions['InitCreateNew']> =>
// 				data.type === WorkProgress.Monolithic.Delays.Redux.Types.DELAYS_CREATE_NEW_INIT,
// 		),
// 		withLatestFrom(state$),
// 		switchMap(([action, state]) => {
// 			const data = ExtractData(state, action);
// 			if (data) {
// 				return from(
// 					new GraphQLAPIService(state.CMSLogin.credentials?.access_token).MONOLITHIC.createDelay(data),
// 				).pipe(
// 					map(() => WorkProgressMonolithicDelaysActions.CreateNew()),
// 					catchError((error) =>
// 						of(
// 							NotificationActions.showNotification({
// 								title: 'Błąd!',
// 								message: error,
// 							}),
// 						),
// 					),
// 				);
// 			}
// 			return EMPTY;
// 		}),
// 	);
//
//
// function ExtractData(
// 	state: RootState,
// 	action: ReturnType<WorkProgress.Monolithic.Delays.Redux.IActions['InitCreateNew']>,
// ): CreateDelayType.Request | null {
// 	const user_id = state.CMSLogin.user?.id;
// 	const { active_level: level_id, date } = state.WorkProgress.Monolithic.General;
// 	const { id, crane_id, causes, comment } = action.payload;
// 	if (user_id && id && level_id) {
// 		return {
// 			user_id,
// 			date: dayjs(date).format('YYYY-MM-DD'),
// 			level_id,
// 			crane_id,
// 			causes,
// 			comment,
// 		};
// 	}
// 	return null;
// }
