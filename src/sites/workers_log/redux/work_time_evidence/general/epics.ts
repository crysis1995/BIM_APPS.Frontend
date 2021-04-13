import { GeneralActionTypes, IGeneralAction } from './types/actions';
import { ReturnTypeFromInterface } from '../worker/types/actions';
import { Notification } from '../../../../../components/Notification/redux/types';
import { GeneralState } from './types/state';
import { combineEpics, Epic } from 'redux-observable';
import WorkersLogActions from '../../types';
import { filter, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { concat, from, of } from 'rxjs';
import { ERaportType } from './types/payload';
import RestAPIService from '../../../../../services/rest.api.service';
import NotificationActions from '../../../../../components/Notification/redux/actions';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';
import { jsPDF } from 'jspdf';

type ActionType = GeneralActionTypes | ReturnTypeFromInterface<Notification.IActions>;
export type RootState = {
	CMSLogin: {
		user: { id: { id: string } };
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
		user_id: state.CMSLogin.user.id.id,
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
						format = [y + 100, x + 100];
					} else {
						orientation = 'l';
						format = [x + 100, y + 100];
					}
					//
					// (function (jsPDFAPI) {
					// 	var callAddFont = () => {
					// 		// @ts-ignore
					// 		this.addFileToVFS('Roboto-regular.tff', font);
					// 		// @ts-ignore
					// 		this.addFont('Roboto-regular.tff', 'Roboto-Regular', 'normal');
					// 	};
					// 	jsPDFAPI.events.push(['addFonts', callAddFont])
					// })(jsPDF.API);

					let doc = new jsPDF(orientation, 'px', format);

					return from(
						doc.html(htmlElement, {
							x: 50,
							y: 50,
						}),
					).pipe(
						mergeMap((pdf) => {
							doc.addFont('OpenSans-Regular.ttf', 'OpenSans-Regular', 'normal');
							doc.setFont('OpenSans-Regular');
							doc.save('test.pdf');
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
							message: 'Pomyślnie wygenerowano raport',
							triggered_time: new Date(),
						}),
					);
			}
		}),
	);

export default combineEpics(OnFetchCrewStart);
