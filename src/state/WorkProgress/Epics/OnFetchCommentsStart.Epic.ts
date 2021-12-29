import { Epic } from 'redux-observable';
import { RootActions } from '../../_types/RootActions';
import { RootState } from '../../_types/RootState';
import { RootDependencies } from '../../_types/RootDependencies';
import { FetchCommentsStartEpic } from '../CommentaryElement/actionEpics';
import { map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { EMPTY, from, of } from 'rxjs';
import _ from 'lodash';
import { ComponentEnd$ } from '../General/actionEpics';
import ParseDateAsLocalIso from '../../../utils/ParseDateAsLocalIso';
import { WorkProgress } from '../index';
import ModalActions from '../../Modal/actions';
import { ModalType } from '../../Modal/type';

const EModalType = ModalType.Payload.EModalType;

export const OnFetchCommentsStartEpic: Epic<
	RootActions,
	RootActions,
	RootState,
	RootDependencies
> = (action$, state$, dependencies) =>
	action$.pipe(
		FetchCommentsStartEpic,
		mergeMap((value) =>
			from(
				dependencies.cache.commentaryElements
					.where({ elementId: value.payload.elementId })
					.toArray(),
			).pipe(
				map((cachedData) => ({
					cachedData,
					lastDate: new Date(_.maxBy(cachedData, (e) => e.updatedAt)?.updatedAt ?? null),
					controller: new AbortController(),
				})),
				mergeMap((data) =>
					from(
						dependencies.api.GraphQL.Operations.QueryAllCommentaryElements(
							{
								elementIds: [value.payload.elementId],
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
								dependencies.cache.commentaryElements.bulkPut(
									response.data.commentaryElements,
								);
								const commentaryElements = [
									...data.cachedData,
									...response.data.commentaryElements,
								];
								return of(
									WorkProgress.Actions.CommentaryElement.FetchCommentsFinish({
										elementId: value.payload.elementId,
										commentaryElements,
									}),
								);
							}
							if (response.errors) {
								dependencies.logger.error(response.errors);
								return of(
									ModalActions.InitializeModal({
										title: 'Błąd!',
										body:
											'Nie udało się pobrać komentarzy dla elementu. Błąd : \n' +
											response.errors.map((e) => e.message).join('\n'),
										modalType: EModalType.Error,
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
