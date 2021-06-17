import WorkProgress from '../../../types';
import { ModalType } from '../../../../../components/Modal/type';
import ForgeViewer from '../../../../../components/ForgeViewer/types';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../store';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, from, merge, of } from 'rxjs';
import WorkProgressMonolithicUpgradingActions from '../../monolithic/upgrading/actions';
import { GetObjectsByLevelType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import ModalActions from '../../../../../components/Modal/redux/actions';
import GraphQLAPIService from '../../../../../services/graphql.api.service';

type ActionTypes =
	| WorkProgress.Monolithic.General.Redux.Actions
	| WorkProgress.Monolithic.Upgrading.Redux.Actions
	| ModalType.Redux.Actions
	| WorkProgress.Monolithic.Terms.Redux.Actions
	| ForgeViewer.Redux.Actions;

export const OnChangeLevelEpic: Epic<ActionTypes, ActionTypes, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkProgress.Monolithic.General.Redux.IActions['ChangeLevel']> =>
				data.type === WorkProgress.Monolithic.General.Redux.Types.SET_LEVEL,
		),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			const token = state.CMSLogin.credentials?.access_token;
			const GRAPHQL = new GraphQLAPIService(token);
			const project = state.CMSLogin.actual_project?.id;
			const level = action.payload;
			if (!project || !level) return EMPTY;
			return merge(
				of(WorkProgressMonolithicUpgradingActions.FetchStart()),
				from(GRAPHQL.MONOLITHIC.Objects.Count({ project_id: project, level_id: level })).pipe(
					switchMap((data) => {
						const N = 100;
						const numObjects = data.acceptanceObjectsConnection.aggregate.count;
						let arrayOfPRomises: Promise<GetObjectsByLevelType.Response>[] = [];
						for (let index = 0; index < Math.ceil(numObjects / N); index++) {
							arrayOfPRomises.push(
								GRAPHQL.MONOLITHIC.Objects.GetAll({
									level_id: level,
									project_id: project,
									start: index * N,
									limit: N,
								}),
							);
						}
						return from(Promise.all(arrayOfPRomises)).pipe(
							map((data) => data.flatMap((x) => x.acceptanceObjects)),
							map((response) => WorkProgressMonolithicUpgradingActions.FetchEnd(response, level)),
							catchError((err: Error) => {
								console.error(err.message);
								return of(
									ModalActions.InitializeModal({
										title: 'Błąd!',
										body: err.message,
										modalType: ModalType.Payload.EModalType.Error,
									}),
								);
							}),
						);
					}),
					catchError((err: Error) => {
						console.error(err.message);
						return of(
							ModalActions.InitializeModal({
								title: 'Błąd!',
								body: err.message,
								modalType: ModalType.Payload.EModalType.Error,
							}),
						);
					}),
				),
			);
		}),
	);
