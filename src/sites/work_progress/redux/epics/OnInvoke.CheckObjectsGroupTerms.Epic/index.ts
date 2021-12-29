import WorkProgress from '../../../types';
import { Epic } from 'redux-observable';

import { filter, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, from, of } from 'rxjs';
import { ExtractGroupFromObjects } from './Utils.ExtractGroupFromObjects';
import { Constants } from '../../constants';
import TermsActions from '../../monolithic/terms/actions';
import { GetTermByPassedGroup } from './Utils.GetTermByPassedGroup';
import { GetObjectsIncludedInPassedGroup } from './Utils.GetObjectsIncludedInPassedGroup';
import { isUpgradingNeeded } from './Utils.IsUpgradingNeeded';
import { GetDatesToUpdate } from './Utils.GetDatesToUpdate';
import { RootActions, RootState } from '../../../../../state';

/*
 * 		Epic is invoked after user successfully set objects status.
 *		Method check if is necessary to change Terms Date - REAL_START or REAL_FINISH
 *
 * */
export const OnInvokeCheckObjectsGroupTermsEpic: Epic<RootActions, RootActions, RootState> = (
	action$,
	state$,
) =>
	action$.pipe(
		filter(
			(
				data,
			): data is ReturnType<
				WorkProgress.Monolithic.Upgrading.Redux.IActions['CheckObjectsGroupTerms']
			> =>
				data.type ===
				WorkProgress.Monolithic.Upgrading.Redux.Types.CHECK_OBJECT_GROUP_TERMS,
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
						if (Objects) {
							const dates = GetDatesToUpdate(Term, Objects);
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
