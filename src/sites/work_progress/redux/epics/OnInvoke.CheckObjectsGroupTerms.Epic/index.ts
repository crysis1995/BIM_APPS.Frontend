import WorkProgress from '../../../types';
import { ModalType } from '../../../../../components/Modal/type';
import ForgeViewer from '../../../../../components/ForgeViewer/types';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../store';
import { filter, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, from, of } from 'rxjs';
import { ExtractGroupFromObjects } from './Utils.ExtractGroupFromObjects';
import { Constants } from '../../constants';
import TermsActions from '../../monolithic/terms/actions';
import { GetTermByPassedGroup } from './Utils.GetTermByPassedGroup';
import { GetObjectsIncludedInPassedGroup } from './Utils.GetObjectsIncludedInPassedGroup';
import { ExtractFinishedStatusID } from './Utils.ExtractFinishedStatusID';
import { isUpgradingNeeded } from './Utils.IsUpgradingNeeded';
import { GetDatesToUpdate } from './Utils.GetDatesToUpdate';

type ActionTypes =
	| WorkProgress.Monolithic.General.Redux.Actions
	| WorkProgress.Monolithic.Upgrading.Redux.Actions
	| ModalType.Redux.Actions
	| WorkProgress.Monolithic.Terms.Redux.Actions
	| ForgeViewer.Redux.Actions;

/*
 * 		Epic is invoked after user successfully set objects status.
 *		Method check if is necessary to change Terms Date - REAL_START or REAL_FINISH
 *
 * */
export const OnInvokeCheckObjectsGroupTermsEpic: Epic<ActionTypes, ActionTypes, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkProgress.Monolithic.Upgrading.Redux.IActions['CheckObjectsGroupTerms']> =>
				data.type === WorkProgress.Monolithic.Upgrading.Redux.Types.CHECK_OBJECT_GROUP_TERMS,
		),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			const groups = ExtractGroupFromObjects(action, state);
			// console.log(groups);
			if (!groups) return EMPTY;
			return from(groups).pipe(
				mergeMap((group) => {
					const Term = GetTermByPassedGroup(state, group);
					// console.log(Term);
					if (Term && isUpgradingNeeded(Term)) {
						const Objects = GetObjectsIncludedInPassedGroup(state, group);
						const finishedID = ExtractFinishedStatusID(state);
						// console.log(Objects);
						// console.log(finishedID);
						if (Objects && finishedID) {
							const dates = GetDatesToUpdate(Term, Objects, finishedID);
							// console.log(dates);
							if (Term.level && Term.crane && Object.keys(dates).length > 0) {
								return of(
									TermsActions.UpdateTermsByGroupInit({
										toUpdate: dates,
										vertical: Term.vertical,
										level: Term.level.id,
										crane: Term.crane.id,
									}),
								);
							}
						}
					}
					return EMPTY;
				}),
			);
		}),
	);

export type DatesToUpdate = {
	[Constants.TermTypes.REAL_START]?: string;
	[Constants.TermTypes.REAL_FINISH]?: string;
};
