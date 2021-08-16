import dotProp from 'dot-prop';
import { combineEpics, ofType } from 'redux-observable';
import { EMPTY, from, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, mergeMap } from 'rxjs/operators';
import GraphQLAPIService from '../../../../services/graphql.api.service';
import { setTermByGroup, termsDataFetchEnd, termsDataFetchError, updateTermsByGroup } from '../actions/terms_actions';
import {
	TERMS_DATA_FETCH_START,
	TERMS_MONOLITHIC_SET_BY_GROUP_INIT,
	TERMS_MONOLITHIC_UPDATE_BY_GROUP_INIT,
} from '../types';
import { fetchDepartmentsWithTerms, normalizeTermsData } from '../utils/terms_utils';

// const getDepartmentsWithTerms = (action$, state$) =>
// 	action$.pipe(
// 		ofType(TERMS_DATA_FETCH_START),
// 		switchMap(() => {
// 			const {
// 				CMSLogin: { user, project },
// 				Odbiory: {
// 					Levels: { current_level },
// 				},
// 			} = state$.value;
// 			return from(fetchDepartmentsWithTerms(current_level, project.id)).pipe(
// 				map((data) => termsDataFetchEnd(normalizeTermsData(data.acceptanceDepartments, user, project))),
// 				catchError((error) => of(termsDataFetchError(error.message))),
// 			);
// 		}),
// 	);

const handleSetTerms = (action$, state$) =>
	action$.pipe(
		ofType(TERMS_MONOLITHIC_SET_BY_GROUP_INIT),
		withLatestFrom(state$),
		switchMap(([{ crane_id, level_id, group_id, term_type, term }, state]) => {
			const term_id = dotProp.get(
				state,
				`Odbiory.Terms.MONOLITHIC.terms.byCrane.${crane_id}.byLevel.${level_id}.byGroup.${group_id}.id`,
			);
			const GRAPHQL = new GraphQLAPIService();
			const TERM = {
				REAL_START: 'REAL_START_Date',
				PLANNED_FINISH: 'PLANNED_FINISH_Date',
				REAL_FINISH: 'REAL_FINISH_Date',
				PLANNED_START: 'PLANNED_START_Date',
			};
			return from(GRAPHQL.MONOLITHIC.updateTerm({ term_id, [TERM[term_type]]: term })).pipe(
				map(() => setTermByGroup(crane_id, level_id, group_id, term_type, term)),
			);
		}),
	);

const handleUpdateTermObject = (action$) =>
	action$.pipe(
		ofType(TERMS_MONOLITHIC_UPDATE_BY_GROUP_INIT),
		mergeMap(({ payload: { term } }) => {
			const GRAPHQL = new GraphQLAPIService();
			return from(
				GRAPHQL.MONOLITHIC.updateTerm({
					term_id: term.id,
					PLANNED_START_Date: term.PLANNED_START,
					PLANNED_FINISH_Date: term.PLANNED_FINISH,
					REAL_FINISH_Date: term.REAL_FINISH,
					REAL_START_Date: term.REAL_START,
				}),
			).pipe(map((response) => updateTermsByGroup(term, response.data.updateAcceptanceTerm)));
		}),
	);

// const handleObjectFinishListener = (action$, state$) =>
// 	action$.pipe(
// 		ofType(),
// 		withLatestFrom(state$),
// 		mergeMap(([_, state]) => {
// 			const { active_crane, active_level } = state.Odbiory.OdbioryComponent.MONOLITHIC;
// 			const groupObjects = state.Odbiory.Upgrading.MONOLITHIC?.byCrane?.[active_crane]?.byLevel?.[active_level];
// 			return EMPTY;
// 		}),
// 	);

export default combineEpics(
	getDepartmentsWithTerms,
	handleSetTerms,
	handleUpdateTermObject,
	// handleObjectFinishListener
);
