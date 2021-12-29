import WorkersLog from '../../../../types';
import { ModalType } from '../../../../../../state/Modal/type';
import { Epic } from 'redux-observable';

import { catchError, filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, from, merge, of } from 'rxjs';
import LabourInputObjectsActions from '../../objects/actions';
import normalize from '../../../../../../utils/Normalize';
import ModalActions from '../../../../../../state/Modal/actions';
import RestAPIService from '../../../../../../services/rest.api.service';
import { RootActions, RootState } from '../../../../../../state';


export const OnChangeLevelOrDateEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(
				data,
			): data is ReturnType<
				| WorkersLog.LabourInput.Redux.General.IActions['SetDate']
				| WorkersLog.LabourInput.Redux.General.IActions['ChooseLevel']
			> =>
				data.type === WorkersLog.LabourInput.Redux.General.Types.SET_DATE ||
				data.type === WorkersLog.LabourInput.Redux.General.Types.CHOOSE_LEVEL,
		),
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
			const date = state.WorkersLog.LabourInput.General.ActualDate;
			const project = state.CMSLogin.actual_project?.id;
			if (!date || !project) return EMPTY;
			return merge(
				of(LabourInputObjectsActions.FetchObjectsStart()),
				from(
					new RestAPIService(
						state.CMSLogin.credentials?.token,
					).WORKERS_LOG.LABOUR_INPUT.GetObjectsFilteredByStatuses({ date, project }) as Promise<
						WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus[]
					>,
				).pipe(
					withLatestFrom(state$),
					mergeMap(([data, state]) => {
						const level = state.WorkersLog.LabourInput.General.ActiveLevel;
						const objects = normalize(data, 'id') as {
							[key: string]: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus;
						};
						return merge(
							of(LabourInputObjectsActions.FetchObjectsEnd(objects)),
							of(
								LabourInputObjectsActions.SetFilteredObjects(
									level
										? Object.values(objects)
												.filter((object) => object.level.toString() === level.id)
												.map((e) => e.id)
										: [],
								),
							),
						);
					}),
					catchError(() =>
						of(
							ModalActions.InitializeModal({
								title: 'Błąd!',
								modalType: ModalType.Payload.EModalType.Error,
								body: 'Pobieranie aktualnych statusów nie powiodło się!',
							}),
						),
					),
				),
			);
		}),
	);
