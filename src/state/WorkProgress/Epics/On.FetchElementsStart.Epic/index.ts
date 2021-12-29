import { Epic } from 'redux-observable';
import { RootActions } from '../../../_types/RootActions';
import { RootState } from '../../../_types/RootState';
import { RootDependencies } from '../../../_types/RootDependencies';
import { filter, map, mergeMap, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { CMSLoginSelectors } from '../../../CMSLogin/selectors';
import { EMPTY, from, of } from 'rxjs';
import ParseDateAsLocalIso from '../../../../utils/ParseDateAsLocalIso';
import { WorkProgress } from '../../index';
import ModalActions from '../../../Modal/actions';
import { ModalType } from '../../../Modal/type';
import _ from 'lodash';
import { ComponentEnd$ } from '../../General/actionEpics';
import { FetchElementsStartEpic } from '../../Elements/actionEpics';

export const OnFetchElementsStartEpic: Epic<
	RootActions,
	RootActions,
	RootState,
	RootDependencies
> = (action$, state$, dependencies) =>
	action$.pipe(
		FetchElementsStartEpic,
		withLatestFrom(state$),
		map(
			([action, state]) =>
				[action, state, CMSLoginSelectors.GetCurrentProjectId(state)] as const,
		),
		filter(([action, state, projectId]) => projectId != null),
		switchMap(([action, state, projectId]) =>
			from(dependencies.cache.elements.where({ projectId }).toArray()).pipe(
				map((data) => ({
					data,
					lastDate: new Date(_.maxBy(data, (e) => e.updatedAt)?.updatedAt ?? null),
					controller: new AbortController(),
				})),
				switchMap((data) =>
					from(
						dependencies.api.GraphQL.Operations.QueryElements(
							{
								projectId: projectId!,
								updatedAt: ParseDateAsLocalIso(data.lastDate),
							},
							data.controller.signal,
						),
					).pipe(
						takeUntil(
							action$.pipe(
								ComponentEnd$,
								tap(() => data.controller.abort()),
							),
						),
						mergeMap((response) => {
							if (response.data) {
								const elements = [...data.data, ...response.data.elements];
								dependencies.cache.elements.bulkPut(response.data.elements);
								return of(
									WorkProgress.Actions.Elements.FetchElementsEnd({ elements }),
								);
							}
							if (response.errors) {
								dependencies.logger.error(response.errors);
								return of(
									ModalActions.SetModalData({
										title: 'Error',
										body: response.errors
											.map((error) => error.message)
											.join('\n'),
										modalType: ModalType.Payload.EModalType.Error,
									}),
								);
							}

							return EMPTY;
						}),
					),
				),
			),
		),
	);
