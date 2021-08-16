import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import WorkersLog from '../../../../types';
import { ModalType } from '../../../../../../components/Modal/type';
import { Epic } from 'redux-observable';
import { RootState } from '../../../../../../store';
import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import { concat, EMPTY, from, of } from 'rxjs';
import LabourInputTimeEvidenceActions from '../../time_evidence/actions';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import ModalActions from '../../../../../../components/Modal/redux/actions';
import { RootActions } from '../../../../../../reducers/type';

dayjs.extend(isBetween);

export const OnChangeDateWorkerTypeOrCrewEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(
				data,
			): data is ReturnType<
				| WorkersLog.LabourInput.Redux.General.IActions['SetDate']
				| WorkersLog.LabourInput.Redux.General.IActions['SelectWorkerType']
				| WorkersLog.LabourInput.Redux.General.IActions['SelectCrew']
			> =>
				WorkersLog.LabourInput.Redux.General.Types.SET_DATE === data.type ||
				WorkersLog.LabourInput.Redux.General.Types.SELECT_WORKER_TYPE === data.type ||
				WorkersLog.LabourInput.Redux.General.Types.SELECT_CREW == data.type,
		),
		withLatestFrom(state$),
		mergeMap(([_, state]) => {
			const ActualCrew = state.WorkersLog.LabourInput.General.ActualCrew;
			const ActualDate = state.WorkersLog.LabourInput.General.ActualDate;
			const ActiveWorkType = state.WorkersLog.LabourInput.General.ActiveWorkType;
			const access_token = state.CMSLogin.credentials?.access_token;
			if (ActualDate && ActiveWorkType && ActualCrew && access_token) {
				const all_crews = state.WorkersLog.General.all_crews;
				const crewSummary =
					all_crews && ActualCrew
						? all_crews[ActualCrew].crew_summaries.filter((crewSumm) =>
								dayjs(ActualDate).isBetween(dayjs(crewSumm.startDate), dayjs(crewSumm.endDate)),
						  )
						: null;
				if (crewSummary && Array.isArray(crewSummary) && crewSummary.length > 0) {
					return concat(
						of(LabourInputTimeEvidenceActions.SetSummaryWorkTimeStart()),
						from(
							new GraphQLAPIService(access_token).WorkersLog.WorkTimeEvidence.GetSummaryWorkedTime({
								crew_summary_id: crewSummary[0].id,
								selected_date: ActualDate,
							}),
						).pipe(
							mergeMap((response) => {
								if (response)
									return of(
										LabourInputTimeEvidenceActions.SetSummaryWorkTimeEnd(
											response?.workersLogWorkTimeEvidencesConnection.aggregate.sum.worked_time ||
												0,
										),
									);
								else
									return of(
										ModalActions.InitializeModal({
											title: 'Uwaga!',
											modalType: ModalType.Payload.EModalType.Error,
											body: 'Pobieranie czasu pracy brygady nie powiodło się',
										}),
										LabourInputTimeEvidenceActions.SetSummaryWorkTimeEnd(0),
									);
							}),
						),
					);
				}
			}
			return EMPTY; // możliwa zmiana na setter czasu pracy na 0
		}),
	);
