import { ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, filter, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { endFetchCranes, errorFetchCranes, startFetchCranes } from '../actions/odbiory_actions';
import { ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE } from '../types';
import { ACCEPTANCE_TYPE } from '../types/constans';

export const setCranes = (action$, state$) =>
	action$.pipe(
		ofType(ODBIORY_COMPONENT_SET_ACCEPTANCE_TYPE),
		filter(({ acceptance_type }) => acceptance_type === ACCEPTANCE_TYPE.MONOLITHIC),
		switchMap(() =>
			concat(
				of(startFetchCranes()),
				from(fetchCranesFromApi(state$.value)).pipe(
					map((value) => endFetchCranes(value)),
					catchError((err) => of(errorFetchCranes(err.message))),
				),
			),
		),
	);

const fetchCranesFromApi = async (project_id) => {
	return new Promise((resolve, reject) => {
		setTimeout(
			() =>
				resolve({
					'1': {
						id: '1',
						name: 'Z01',
						levels: {
							'1': { name: 'L01', id: '1' },
							'2': { name: 'L02', id: '2' },
							'3': { name: 'L03', id: '3' },
						},
					},
					'2': {
						id: '2',
						name: 'Z02',
						levels: {
							'2': { name: 'L02', id: '2' },
							'3': { name: 'L03', id: '3' },
						},
					},
					'3': {
						id: '3',
						name: 'Z03',
						levels: {
							'1': { name: 'L01', id: '1' },
							'2': { name: 'L02', id: '2' },
						},
					},
				}),
			1000,
		);
	});
};
