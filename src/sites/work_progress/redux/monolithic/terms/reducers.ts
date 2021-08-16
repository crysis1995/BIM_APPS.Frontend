import WorkProgress from '../../../types';
import normalize from '../../../../../utils/Normalize';
import { ParseTermsToMonolithic } from '../../utils/ParseTermsToMonolithic';
import { UpdateTermType } from '../../../../../services/graphql.api.service/CONSTANTS/Mutations/UpdateTerm';

const INITIAL_STATE: WorkProgress.Monolithic.Terms.Redux.IStore = {
	loading: false,
	termsAll: null,
	termsNorm: null,
};

function TermsReducer(state = INITIAL_STATE, action: WorkProgress.Monolithic.Terms.Redux.Actions) {
	switch (action.type) {
		case WorkProgress.Monolithic.Terms.Redux.Types.SET_INITIAL:
			return INITIAL_STATE;
		case WorkProgress.Monolithic.Terms.Redux.Types.TERMS_FETCH_START:
			return ReducerActions.loading.Set(state, action, true);
		case WorkProgress.Monolithic.Terms.Redux.Types.TERMS_FETCH_END:
			state = ReducerActions.termsAll.Set(state, action);
			state = ReducerActions.termsNorm.Set(state, action);
			return ReducerActions.loading.Set(state, action, false);
		case WorkProgress.Monolithic.Terms.Redux.Types.UPDATE_BY_GROUP:
			return ReducerActions.termsAll.Update(state, action);
		default:
			return state;
	}
}

export default TermsReducer;

class ReducerActions {
	static loading = {
		Set: (
			state: WorkProgress.Monolithic.Terms.Redux.IStore,
			action: WorkProgress.Monolithic.Terms.Redux.Actions,
			value: WorkProgress.Monolithic.Terms.Redux.IStore['loading'],
		): WorkProgress.Monolithic.Terms.Redux.IStore => {
			return {
				...state,
				loading: value,
			};
		},
	};

	static termsAll = {
		Set: (
			state: WorkProgress.Monolithic.Terms.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.Terms.Redux.IActions['FetchEnd']>,
		): WorkProgress.Monolithic.Terms.Redux.IStore => {
			return {
				...state,
				termsAll: normalize(action.payload, 'id'),
			};
		},
		Update(
			state: WorkProgress.Monolithic.Terms.Redux.IStore,
			action: ReturnType<
				(
					data: WorkProgress.Monolithic.Terms.Payload.UpdateTermsByGroup,
				) => {
					type: WorkProgress.Monolithic.Terms.Redux.Types.UPDATE_BY_GROUP;
					payload: UpdateTermType.AcceptanceTerm;
				}
			>,
		): typeof state {
			let termsToUpdate = state.termsAll;
			if (termsToUpdate) {
				termsToUpdate[action.payload.id] = action.payload;
				return {
					...state,
					termsAll: termsToUpdate,
				};
			} else {
				return state;
			}
		},
	};
	static termsNorm = {
		Set: (
			state: WorkProgress.Monolithic.Terms.Redux.IStore,
			action: ReturnType<WorkProgress.Monolithic.Terms.Redux.IActions['FetchEnd']>,
		): WorkProgress.Monolithic.Terms.Redux.IStore => {
			return {
				...state,
				termsNorm: ParseTermsToMonolithic(action.payload),
			};
		},
	};
}
