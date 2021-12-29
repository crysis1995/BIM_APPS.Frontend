import { combineEpics, Epic } from 'redux-observable';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { concat, from, of } from 'rxjs';
import RestAPIService from '../../../../../services/rest.api.service';
import NotificationActions from '../../../../../state/Notifications/actions';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';
import { jsPDF } from 'jspdf';
import './utils/Lato-Regular-normal';
import html2canvas from 'html2canvas';
import CrewActions from '../crew/actions';

import WorkersLog from '../../../types';
import { RootActions, RootState } from '../../../../../state';


function TakeDataFromStore(state: RootState) {
	return {
		project_id: state.CMSLogin.actual_project?.id,
		user_id: state.CMSLogin.user?.id,
		start_date: state.WorkersLog.WorkTimeEvidence.General.calendar.view_range?.start,
		end_date: state.WorkersLog.WorkTimeEvidence.General.calendar.view_range?.end,
	};
}

const OnFetchCrewStart: Epic<RootActions, RootActions, RootState> = ($action, $state) =>
	$action.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.WorkTimeEvidence.General.Redux.IActions['generateRaportStart']> =>
				data.type === WorkersLog.WorkTimeEvidence.General.Redux.Types.GENERATE_RAPORT_START,
		),
		withLatestFrom($state),
		switchMap(([action, state]) => {
			if (action.payload.type === WorkersLog.WorkTimeEvidence.General.Payload.ERaportType.Financial) {
				return from(
					new RestAPIService(
						state.CMSLogin.credentials?.token,
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

const OnSelectWorkerType: Epic<RootActions, RootActions, RootState> = ($action) =>
	$action.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.WorkTimeEvidence.General.Redux.IActions['selectWorkerType']> =>
				data.type === WorkersLog.WorkTimeEvidence.General.Redux.Types.SELECT_WORKER_TYPE,
		),
		map(() => CrewActions.cleanSummary()),
	);

export default combineEpics(OnFetchCrewStart, OnSelectWorkerType);
