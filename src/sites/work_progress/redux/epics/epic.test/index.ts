import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { CMSLoginType } from '../../../../../components/CMSLogin/type';
import WorkProgress from '../../../types';
import { ModalType } from '../../../../../components/Modal/type';
import { RootState } from '../../../../../store';
import { EMPTY } from 'rxjs';

type ActionTypes =
	| WorkProgress.Monolithic.General.Redux.Actions
	| WorkProgress.Monolithic.Delays.Redux.Actions
	| ModalType.Redux.Actions
	| CMSLoginType.Redux.Actions
	| WorkProgress.Monolithic.Terms.Redux.Actions;
export const epic_test: Epic<ActionTypes, ActionTypes, RootState> = (action$, state$) =>
	// action$.pipe(
	// 	filter((action) => action.type === WorkProgress.Monolithic.General.Redux.Types.COMPONENT_STARTED),
	// 	withLatestFrom(state$),
	// 	switchMap(([action, state]) => {
	// 		console.log(state.CMSLogin.actual_project?.name);
	// 		return EMPTY;
	// 	}),
	// );

	action$.pipe(
		filter(
			(data): data is ReturnType<WorkProgress.Monolithic.General.Redux.IActions['ComponentStart']> =>
				data.type === WorkProgress.Monolithic.General.Redux.Types.COMPONENT_STARTED,
		),
		// ofType(WorkProgress.Monolithic.General.Redux.Types.COMPONENT_STARTED),
		// repeatWhen((asd) => asd.pipe(ofType(CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECT))),
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
			console.count(state.CMSLogin.actual_project?.name);
			return EMPTY;
		}),
	);
// combineLatest([action$.ofType(WorkProgress.Monolithic.General.Redux.Types.COMPONENT_STARTED)])
// 	.pipe(repeatWhen(() => action$.ofType(CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECT)))
// 	.pipe(
// 		repeatWhen(() => action$.ofType(CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECT)),
// 		withLatestFrom(state$),
// 		mergeMap(([_, state]) => {
// 			console.count(state.CMSLogin.actual_project?.name);
// 			return EMPTY;
// 		}),
// 	);

// .pipe();
