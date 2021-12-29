import { Epic } from 'redux-observable';
import { RootActions } from '../../../_types/RootActions';
import { RootState } from '../../../_types/RootState';
import { RootDependencies } from '../../../_types/RootDependencies';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { combineLatest, concat, EMPTY, of } from 'rxjs';
import { CMSLoginSelectors } from '../../../CMSLogin/selectors';

import { SetCurrentProjectIdEpic } from '../../../CMSLogin/ActionEpics';
import { ComponentStart$ } from '../../General/actionEpics';
import { WorkProgress } from '../../index';

export const OnComponentStartEpic: Epic<RootActions, RootActions, RootState, RootDependencies> = (
	action$,
	state$,
	dependencies,
) =>
	combineLatest([action$.pipe(ComponentStart$), action$.pipe(SetCurrentProjectIdEpic)]).pipe(
		withLatestFrom(state$),
		switchMap((value) => {
			const [[componentStartAction, _], state] = value;
			return CMSLoginSelectors.CurrentProjectAppsPermissions(
				state,
				componentStartAction.payload.app,
			)
				? of(value)
				: EMPTY;
		}),
		switchMap(([[componentStartAction, _], state]) =>
			concat(
				of(WorkProgress.Actions.Elements.FetchElementsStart(componentStartAction.payload)),
			),
		),
	);
