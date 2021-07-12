import WorkProgress from '../../../types';
import { ModalType } from '../../../../../components/Modal/type';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../store';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { EMPTY, from, of } from 'rxjs';
import { UpdateTermType } from '../../../../../services/graphql.api.service/CONSTANTS/Mutations/UpdateTerm';
import { Constants } from '../../constants';
import TermsActions from '../../monolithic/terms/actions';
import ModalActions from '../../../../../components/Modal/redux/actions';
import { RootActions } from '../../../../../reducers/type';

/*
 * 		Epic is invoked while user try change term date
 *
 *
 *
 * */
export const OnStartUpdateTermEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkProgress.Monolithic.Terms.Redux.IActions['UpdateTermsByGroupInit']> =>
				data.type === WorkProgress.Monolithic.Terms.Redux.Types.UPDATE_BY_GROUP_INIT,
		),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			const TermAPI = new GraphQLAPIService(state.CMSLogin.credentials?.access_token).MONOLITHIC.Term;
			const responseData = ExtractDataToUpdate(state, action);
			if (responseData) {
				return from(TermAPI.Update(responseData)).pipe(
					map((response) => TermsActions.UpdateTermsByGroup(response.updateAcceptanceTerm.acceptanceTerm)),
					catchError((error) =>
						of(
							ModalActions.InitializeModal({
								title: 'Uwaga!',
								body: error?.message || 'Nie udało się zmienić daty',
								modalType: ModalType.Payload.EModalType.Error,
							}),
						),
					),
				);
			}
			return EMPTY;
		}),
	);

const termTypeMap: {
	[key in Constants.TermTypes]: keyof Required<Omit<UpdateTermType.Request, 'term_id' | 'object_ids'>> | null;
} = {
	[Constants.TermTypes.PLANNED_START]: 'PLANNED_START_Date',
	[Constants.TermTypes.PLANNED_FINISH]: 'PLANNED_FINISH_Date',
	[Constants.TermTypes.PLANNED_START_BP]: null,
	[Constants.TermTypes.PLANNED_FINISH_BP]: null,
	[Constants.TermTypes.REAL_START]: 'REAL_START_Date',
	[Constants.TermTypes.REAL_FINISH]: 'REAL_FINISH_Date',
};

function ExtractDataToUpdate(
	state: RootState,
	action: ReturnType<WorkProgress.Monolithic.Terms.Redux.IActions['UpdateTermsByGroupInit']>,
): UpdateTermType.Request | undefined {
	const allTerms = state.WorkProgress.Monolithic.Terms.termsAll;
	const level = action.payload.level;
	const vertical = action.payload.vertical;
	const crane = action.payload.crane;
	const toUpdate = action.payload.toUpdate;

	const termID =
		state.WorkProgress.Monolithic.Terms.termsNorm?.byLevel?.[level]?.byVertical?.[vertical]?.byCrane?.[crane];
	if (termID && allTerms) {
		const { id } = allTerms[termID];
		let Output: UpdateTermType.Request = {
			term_id: id,
		};
		const keys = Object.keys(toUpdate) as Constants.TermTypes[];

		keys.forEach((key) => {
			const dateToUpdate = termTypeMap[key];
			if (dateToUpdate) {
				Output[dateToUpdate] = toUpdate[key];
			}
		});

		return Output;
	}
}
