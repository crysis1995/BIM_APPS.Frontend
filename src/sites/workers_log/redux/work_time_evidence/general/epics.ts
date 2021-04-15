import { GeneralActionTypes, IGeneralAction } from './types/actions';
import { Notification } from '../../../../../components/Notification/types';
import { GeneralState } from './types/state';
import { combineEpics, Epic } from 'redux-observable';
import WorkersLogActions from '../../types';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { concat, from, of } from 'rxjs';
import { ERaportType } from './types/payload';
import RestAPIService from '../../../../../services/rest.api.service';
import NotificationActions from '../../../../../components/Notification/redux/actions';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';
import { jsPDF } from 'jspdf';
import './utils/Lato-Regular-normal';
import html2canvas from 'html2canvas';
import CrewActions from '../crew/actions';
import { CrewActionsTypes } from '../crew/types/actions';
import { ReturnTypeFromInterface } from '../../../../../types/ReturnTypeFromInterface';

type ActionType = GeneralActionTypes | ReturnTypeFromInterface<Notification.Redux.IActions> | CrewActionsTypes;
export type RootState = {
	CMSLogin: {
		user: { id: string };
		project: { id: string };
		credentials: {
			access_token: string;
		};
	};
	WorkersLog: { WorkTimeEvidence: { General: GeneralState } };
};

function TakeDataFromStore(state: RootState) {
	return {
		project_id: state.CMSLogin.project.id,
		user_id: state.CMSLogin.user.id,
		start_date: state.WorkersLog.WorkTimeEvidence.General.calendar.view_range.start,
		end_date: state.WorkersLog.WorkTimeEvidence.General.calendar.view_range.end,
	};
}

const OnFetchCrewStart: Epic<ActionType, ActionType, RootState> = ($action, $state) =>
	$action.pipe(
		filter(
			(data): data is ReturnType<IGeneralAction['generateRaportStart']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.General.GENERATE_RAPORT_START,
		),
		withLatestFrom($state),
		switchMap(([action, state]) => {
			if (action.payload.type === ERaportType.Financial) {
				return from(
					new RestAPIService(
						state.CMSLogin.credentials.access_token,
					).WORKERS_LOG.WORK_TIME_EVIDENCE.GenerateFinancialRaport(TakeDataFromStore(state)),
				).pipe(
					mergeMap((response) =>
						concat(
							from(response.blob()).pipe(
								mergeMap((data) => {
									saveAs(
										new Blob([data], {
											type: response.headers.get('content-type') || 'application/octet-stream',
										}),
										`${dayjs().format('YYYY-MM-DD')} - raport finansowy`,
									);
									return of(
										NotificationActions.showNotification({
											title: 'Raport',
											message: 'Pomyślnie wygenerowano raport',
											triggered_time: new Date(),
										}),
									);
								}),
							),
						),
					),
				);
			} else {
				const htmlElement = document.getElementById('printable-report-area');
				if (htmlElement) {
					const y = htmlElement.offsetHeight;
					const x = htmlElement.offsetWidth;
					let orientation: 'p' | 'l';
					let format: number[];
					if (y / x >= 1) {
						orientation = 'p';
						format = [y, x];
					} else {
						orientation = 'l';
						format = [x, y];
					}
					let doc = new jsPDF(orientation, 'px', format);
					return from(html2canvas(htmlElement, { scale: 2 })).pipe(
						mergeMap((pdf) => {
							const image = pdf.toDataURL('image/png');
							format = [0, 0, ...format];
							doc.addImage(image, 'JPEG', format[0], format[1], format[2], format[3]);
							doc.save('Raport.pdf');
							return of(
								NotificationActions.showNotification({
									title: 'Raport',
									message: 'Pomyślnie wygenerowano raport',
									triggered_time: new Date(),
								}),
							);
						}),
					);
				} else
					return of(
						NotificationActions.showNotification({
							title: 'Raport',
							message: 'Niestety, nie można było wygenerować raportu.',
							triggered_time: new Date(),
						}),
					);
			}
		}),
	);

const OnSelectWorkerType: Epic<ActionType, ActionType, RootState> = ($action) =>
	$action.pipe(
		filter(
			(data): data is ReturnType<IGeneralAction['selectWorkerType']> =>
				data.type === WorkersLogActions.WorkTimeEvidence.General.SELECT_WORKER_TYPE,
		),
		map(() => CrewActions.cleanSummary()),
	);
//
// const OnSetCalendar: Epic<ActionType, ActionType, RootState> = ($action) =>
// 	$action.pipe(
// 		filter(
// 			(data): data is ReturnType<IGeneralAction['setCalendar']> =>
// 				data.type === WorkersLogActions.WorkTimeEvidence.General.SET_CALENDAR,
// 		),
// 		map(() => CrewActions.cleanSummary()),
// 	);

export default combineEpics(OnFetchCrewStart, OnSelectWorkerType);
