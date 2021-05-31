import { combineEpics, Epic, ofType } from 'redux-observable';
import { LabourInput } from '../types';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { setCurrentSheet } from '../../../../../components/ForgeViewer/redux/actions';
import { concat, EMPTY, from, of } from 'rxjs';
import { CMSLoginType } from '../../../../../components/CMSLogin/type';
import { CrewState } from '../../work_time_evidence/crew/types/state';
import { WorkersState } from '../../work_time_evidence/worker/types/state';
import { GeneralState } from '../../work_time_evidence/general/types/state';
import { TimeEvidenceState } from '../../work_time_evidence/time_evidence/types/state';
import { WorkersLogGeneral } from '../../general/types';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { ModalType } from '../../../../../components/Modal/type';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import LabourInputGeneralActions from './actions';
import ModalActions from '../../../../../components/Modal/redux/actions';
import { normalize } from '../../../../../utils/normalize';
import LabourInputTimeEvidenceActions from '../time_evidence/actions';

dayjs.extend(isBetween);

type ActionType =
	| LabourInput.Redux.General.Actions
	| LabourInput.Redux.Objects.Actions
	| LabourInput.Redux.TimeEvidence.Actions
	| ReturnType<typeof setCurrentSheet>
	| ModalType.Redux.Actions;
type RootState = {
	ForgeViewer: {
		sheets: { index: string; name: string }[];
	};
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: {
		General: WorkersLogGeneral.Redux.Store;
		LabourInput: { General: LabourInput.Redux.General.Store; Objects: LabourInput.Redux.Objects.Store };
		WorkTimeEvidence: {
			Crews: CrewState;
			Workers: WorkersState;
			General: GeneralState;
			TimeEvidence: TimeEvidenceState;
		};
	};
};
// start wszelkich niezbędnych metod przy starcie komponentu
const OnInitializeComponent: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<LabourInput.Redux.General.IActions['InitializeComponent']> =>
				data.type === LabourInput.Redux.General.Types.INITIALIZE,
		),
		withLatestFrom(state$),
		mergeMap(([_, state]) =>
			concat(
				of(LabourInputGeneralActions.SetDate(dayjs())),
				of(LabourInputGeneralActions.FetchStatusesStart()),
				of(LabourInputGeneralActions.FetchOtherWorksStart()),
			),
		),
	);

const FetchStatuses: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<LabourInput.Redux.General.IActions['FetchStatusesStart']> =>
				data.type === LabourInput.Redux.General.Types.FETCH_STATUSES_START,
		),
		withLatestFrom(state$),
		switchMap(([_, state]) =>
			from(new GraphQLAPIService(state.CMSLogin.credentials?.access_token).MONOLITHIC.getStatuses()).pipe(
				map((data) => LabourInputGeneralActions.FetchStatusesEnd(normalize(data))),
			),
		),
	);

const FetchOtherWorks: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		ofType(LabourInput.Redux.General.Types.FETCH_OTHER_WORKS_START),
		withLatestFrom(state$),
		switchMap(([_, state]) =>
			from(
				new GraphQLAPIService(
					state.CMSLogin.credentials?.access_token,
				).WorkersLog.LabourInput.OtherWorkOptions.GetAll(),
			).pipe(
				mergeMap((response) => {
					try {
						const data = normalize(response.data.workersLogOtherWorksOptions);
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
			(data): data is ReturnType<LabourInput.Redux.General.IActions['ChooseLevel']> =>
				data.type === LabourInput.Redux.General.Types.CHOOSE_LEVEL,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const sheet = state.ForgeViewer.sheets.filter(
				(x) =>
					action.payload &&
					x.name.toLowerCase().includes(action.payload.name.toLowerCase()) &&
					x.name.toLowerCase().includes('WSPro'.toLowerCase()),
			);
			if (sheet.length > 0) return of(setCurrentSheet(sheet[0].index));
			return EMPTY;
		}),
	);

const OnChangeDateWorkerTypeOrCrew: Epic<ActionType, ActionType, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(
				data,
			): data is ReturnType<
				| LabourInput.Redux.General.IActions['SetDate']
				| LabourInput.Redux.General.IActions['SelectWorkerType']
				| LabourInput.Redux.General.IActions['SelectCrew']
			> =>
				LabourInput.Redux.General.Types.SET_DATE === data.type ||
				LabourInput.Redux.General.Types.SELECT_WORKER_TYPE === data.type ||
				LabourInput.Redux.General.Types.SELECT_CREW == data.type,
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
							mergeMap(({ data }) => {
								if (data)
									return of(
										LabourInputTimeEvidenceActions.SetSummaryWorkTimeEnd(
											data?.workersLogWorkTimeEvidencesConnection.aggregate.sum.worked_time || 0,
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

export default combineEpics(
	OnInitializeComponent,
	FetchStatuses,
	onChooseLevel,
	OnChangeDateWorkerTypeOrCrew,
	FetchOtherWorks,
);
