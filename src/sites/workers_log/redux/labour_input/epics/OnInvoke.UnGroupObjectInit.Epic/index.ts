import WorkersLog from '../../../../types';
import { ModalType } from '../../../../../../components/Modal/type';
import { RootState } from '../../../../../../store';
import { Epic } from 'redux-observable';
import { from, merge, of } from 'rxjs';
import ModalActions from '../../../../../../components/Modal/redux/actions';
import LabourInputObjectsActions from '../../objects/actions';
import GraphQLAPIService from '../../../../../../services/graphql.api.service';
import LabourInputTimeEvidenceActions from '../../time_evidence/actions';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { RootActions } from '../../../../../../reducers/type';

export const OnInvokeUngroupObjectInitEpic: Epic<RootActions, RootActions, RootState, any> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['UngroupObjectsInit']> =>
				data.type === WorkersLog.LabourInput.Redux.Objects.Types.UNGROUP_OBJECTS_INIT,
		),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			// return EMPTY;
			if (isAllowedToDeleteGroupObject(action, state)) return CanDelete(action, state);
			else return CanNOTDelete();
		}),
	);

function isAllowedToDeleteGroupObject(
	action: ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['UngroupObjectsInit']>,
	state: RootState,
): boolean {
	let condition = false;
	const { groupID } = action.payload;
	const { ObjectsTimeEvidences } = state.WorkersLog.LabourInput.TimeEvidence;
	if (ObjectsTimeEvidences && ObjectsTimeEvidences[groupID]) {
		condition =
			ObjectsTimeEvidences[groupID]?.worked_time === 0 || ObjectsTimeEvidences[groupID]?.worked_time === null;
	}
	return condition;
}

function CanDelete(
	action: ReturnType<WorkersLog.LabourInput.Redux.Objects.IActions['UngroupObjectsInit']>,
	state: RootState,
) {
	const ObjectTimeEvidencesAPI = new GraphQLAPIService(state.CMSLogin.credentials?.access_token).WorkersLog
		.LabourInput.ObjectTimeEvidences;
	return merge(
		of(LabourInputTimeEvidenceActions.DeleteObjectTimeEvidenceStart(action.payload.groupID)),
		from(
			ObjectTimeEvidencesAPI.Delete({
				id: action.payload.groupID,
			}),
		).pipe(map((data) => LabourInputTimeEvidenceActions.DeleteObjectTimeEvidenceEnd(action.payload.groupID))),
		of(LabourInputObjectsActions.UngroupObjects(action.payload.data)),
	);
}

function CanNOTDelete() {
	return of(
		ModalActions.InitializeModal({
			body: 'Nie można usunąć wybranej grupy! Czas pracy jest większy niż 0!',
			title: 'Uwaga!',
			modalType: ModalType.Payload.EModalType.Error,
		}),
	);
}
