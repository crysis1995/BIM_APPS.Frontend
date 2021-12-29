import { Epic } from 'redux-observable';

import { filter, mergeMap, withLatestFrom } from 'rxjs/operators';
import WorkersLog from '../../../../types';
import { EMPTY, from, of } from 'rxjs';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import LabourInputTimeEvidenceActions from '../../time_evidence/actions';
import ModalActions from '../../../../../../state/Modal/actions';
import { ModalType } from '../../../../../../state/Modal/type';
import { CreateOtherWorkTimeEvidenceType } from '../../../../../../services/graphql.api.service/CONSTANTS/Mutations/CreateOtherWorkTimeEvidence';
import { RootActions, RootState } from '../../../../../../state';



export const OnStartCreateOtherWorkEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.LabourInput.Redux.TimeEvidence.IActions['CreateOtherWorkStart']> =>
				data.type === WorkersLog.LabourInput.Redux.TimeEvidence.Types.CREATE_OTHER_WORK_START,
		),
		withLatestFrom(state$),
		mergeMap(([action, state]) => {
			const data = GetRequestDataFrom(state, action);
			if (data) {
				return from(
					new GraphQLAPIService(
						state.CMSLogin.credentials?.token,
					).WorkersLog.LabourInput.OtherWorkTimeEvidence.Create(data),
				).pipe(
					mergeMap((responseData) => {
						if (responseData) {
							return of(
								LabourInputTimeEvidenceActions.CreateOtherWorkEnd(
									responseData.createWorkersLogOtherWorksTimeEvidence
										.workersLogOtherWorksTimeEvidence,
								),
							);
						} else {
							return of(
								ModalActions.InitializeModal({
									title: 'Uwaga!',
									modalType: ModalType.Payload.EModalType.Error,
									body: 'Nie udało się dodać wybranej pozycji pracy do zestawienia!',
								}),
							);
						}
					}),
				);
			}

			return EMPTY;
		}),
	);

function GetRequestDataFrom(
	state: RootState,
	action: ReturnType<WorkersLog.LabourInput.Redux.TimeEvidence.IActions['CreateOtherWorkStart']>,
): CreateOtherWorkTimeEvidenceType.Request | null {
	if (
		!state.WorkersLog.LabourInput.General.ActiveWorkType ||
		!state.WorkersLog.LabourInput.TimeEvidence.GroupedOtherWorkTimeEvidenceId
	)
		return null;
	return {
		grouped_other_works_id: state.WorkersLog.LabourInput.TimeEvidence.GroupedOtherWorkTimeEvidenceId,
		work_type: action.payload.work_type,
		crew_type: state.WorkersLog.LabourInput.General.ActiveWorkType,
		worked_time: 0,
		work_option_id: action.payload.id,
		description: action.payload.commentary,
	};
}
