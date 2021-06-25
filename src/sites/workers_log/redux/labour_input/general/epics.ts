import { combineEpics, Epic, ofType } from 'redux-observable';
import { filter, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import ForgeViewerActions from '../../../../../components/ForgeViewer/redux/actions';
import { concat, EMPTY, from, of } from 'rxjs';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { ModalType } from '../../../../../components/Modal/type';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import LabourInputGeneralActions from './actions';
import ModalActions from '../../../../../components/Modal/redux/actions';
import LabourInputTimeEvidenceActions from '../time_evidence/actions';
import normalize from '../../../../../utils/Normalize';
import ForgeViewer from '../../../../../components/ForgeViewer/types';
import { RootState } from '../../../../../store';
import WorkersLog from '../../../types';

dayjs.extend(isBetween);

type ActionType =
	| WorkersLog.LabourInput.Redux.General.Actions
	| WorkersLog.LabourInput.Redux.Objects.Actions
	| WorkersLog.LabourInput.Redux.TimeEvidence.Actions
	| ForgeViewer.Redux.Actions
	| ModalType.Redux.Actions;

// start wszelkich niezbędnych metod przy starcie komponentu
const OnInitializeComponent: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.LabourInput.Redux.General.IActions['InitializeComponent']> =>
				data.type === WorkersLog.LabourInput.Redux.General.Types.INITIALIZE,
		),
		withLatestFrom(state$),
		mergeMap(([_, state]) =>
			concat(
				of(LabourInputGeneralActions.SetDate(dayjs())),
				of(LabourInputGeneralActions.FetchOtherWorksStart()),
			),
		),
	);

const FetchOtherWorks: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		ofType(WorkersLog.LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_START),
		withLatestFrom(state$),
		switchMap(([_, state]) =>
			from(
				new GraphQLAPIService(
					state.CMSLogin.credentials?.access_token,
				).WorkersLog.LabourInput.OtherWorkOptions.GetAll(),
			).pipe(
				mergeMap((response) => {
					try {
						const data = normalize(response.workersLogOtherWorksOptions, 'id');
						return of(LabourInputGeneralActions.FetchOtherWorksEnd(data));
					} catch (e) {
						console.log(e);
						return of(
							ModalActions.InitializeModal({
								title: 'Uwaga!',
								modalType: ModalType.Payload.EModalType.Error,
								body: 'Nie udało się załadować opcji pozostałych prac budowlanych',
							}),
						);
					}
				}),
			),
		),
	);

const onChooseLevel: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.LabourInput.Redux.General.IActions['ChooseLevel']> =>
				data.type === WorkersLog.LabourInput.Redux.General.Types.CHOOSE_LEVEL,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			if (state.ForgeViewer.sheets) {
				const sheet = Object.values(state.ForgeViewer.sheets).filter(
					(x) =>
						action.payload &&
						x.name.toLowerCase().includes(action.payload.name.toLowerCase()) &&
						x.name.toLowerCase().includes('WSPro'.toLowerCase()),
				);
				if (sheet.length > 0) return of(ForgeViewerActions.SetCurrentSheet(sheet[0]));
			}
			return EMPTY;
		}),
	);

const OnChangeDateWorkerTypeOrCrew: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
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

export default combineEpics(OnInitializeComponent, onChooseLevel, OnChangeDateWorkerTypeOrCrew, FetchOtherWorks);
