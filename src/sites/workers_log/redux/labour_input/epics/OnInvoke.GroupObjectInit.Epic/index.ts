import { Epic } from 'redux-observable';
import { RootState } from '../../../../../../store';
import WorkersLog from '../../../../types';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { from, merge, of } from 'rxjs';
import ModalActions from '../../../../../../components/Modal/redux/actions';
import { ModalType } from '../../../../../../components/Modal/type';
import dayjs from 'dayjs';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import { CreateObjectTimeEvidenceType } from '../../../../../../services/graphql.api.service/CONSTANTS/Mutations/CreateObjectTimeEvidence';
import LabourInputTimeEvidenceActions from '../../time_evidence/actions';
import LabourInputObjectsActions from '../../objects/actions';
import { Constants } from '../../../../../work_progress/redux/constants';
import { RootActions } from '../../../../../../reducers/type';

function ExtractRequestData(
	action: ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['GroupObjectsInit']>,
	state: RootState,
): CreateObjectTimeEvidenceType.Request | undefined {
	const date = dayjs(state.WorkersLog.LabourInput.General.ActualDate).format('YYYY-MM-DD'),
		project_id = state.CMSLogin.actual_project?.id,
		user_id = state.CMSLogin.user?.id,
		crew_id = state.WorkersLog.LabourInput.General.ActualCrew,
		objects = action.payload.objectIds,
		worked_time = action.payload.workedTime;

	if (crew_id && user_id && project_id)
		return {
			date,
			objects,
			crew_id,
			project_id,
			user_id,
			worked_time,
		};
}
function CanCreateGroup(
	action: ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['GroupObjectsInit']>,
	state: RootState,
) {
	const { AllObjects } = state.WorkersLog.LabourInput.Objects;
	if (AllObjects && action.payload.objectIds.length > 0) {
		const existedSelected = action.payload.objectIds.filter((x) => x in AllObjects).map((x) => AllObjects[x]);
		const tempValue = existedSelected[0].VCF_Realisation;
		if (tempValue) {
			const groupParamValue = tempValue as Constants.ClassificationDefinitions;
			return existedSelected.every((x) => x.VCF_Realisation === groupParamValue);
		}
	}
	return false;
}

export const OnInvokeGroupObjectInitEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['GroupObjectsInit']> =>
				data.type === WorkersLog.LabourInput.Redux.Objects.Types.GROUP_OBJECTS_INIT,
		),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			const requestData = ExtractRequestData(action, state);
			if (!requestData) {
				return of(
					ModalActions.InitializeModal({
						body: 'Nie udało sie utworzyć grupy. Brakuje wymaganych danych',
						modalType: ModalType.Payload.EModalType.Error,
						title: 'Uwaga!',
					}),
				);
			}
			const isCreateGroupAllowed = CanCreateGroup(action, state);
			if (!isCreateGroupAllowed)
				return of(
					ModalActions.InitializeModal({
						body: 'Nie można utworzyć grupy. Obiekty nie są podobne',
						modalType: ModalType.Payload.EModalType.Error,
						title: 'Uwaga!',
					}),
				);
			const api = new GraphQLAPIService(state.CMSLogin.credentials?.access_token);
			return merge(
				of(LabourInputObjectsActions.GroupObjects(requestData.objects)),
				from(api.WorkersLog.LabourInput.ObjectTimeEvidences.Create(requestData)).pipe(
					map(({ createWorkersLogObjectTimeEvidence: { workersLogObjectTimeEvidence } }) =>
						LabourInputTimeEvidenceActions.CreateObjectTimeEvidenceEnd(workersLogObjectTimeEvidence),
					),
				),
			);
		}),
	);
