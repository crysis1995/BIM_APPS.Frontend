import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { termsDataFetchEnd, termsDataFetchError } from '../actions/terms_actions';
import { TERMS_DATA_FETCH_START } from '../types';
import { fetchDepartmentsWithTerms, normalizeTermsData } from '../utils/terms_utils';

export const getDepartmentsWithTerms = (action$, state$) =>
	action$.pipe(
		ofType(TERMS_DATA_FETCH_START),
		switchMap(() => {
			const {
				CMSLogin: { user, project },
				Odbiory: {
					Levels: { current_level },
				},
			} = state$.value;
			return from(fetchDepartmentsWithTerms(current_level, project.id)).pipe(
				map((data) => termsDataFetchEnd(normalizeTermsData(data.acceptanceDepartments, user, project))),
				catchError((error) => of(termsDataFetchError(error.message))),
			);
		}),
	);
