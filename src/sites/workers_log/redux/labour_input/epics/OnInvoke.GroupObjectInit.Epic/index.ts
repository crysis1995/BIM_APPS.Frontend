import { Epic, ofType } from 'redux-observable';
import { RootState } from '../../../../../../store';
import WorkersLog from '../../../../types';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { v4 } from 'uuid';
import ModalActions from '../../../../../../components/Modal/redux/actions';
import { ModalType } from '../../../../../../components/Modal/type';
import LabourInputObjectsActions from '../../objects/actions';

type ActionTypes = WorkersLog.LabourInput.Redux.Objects.Actions | ModalType.Redux.Actions;

export const OnInvokeGroupObjectInitEpic: Epic<ActionTypes, ActionTypes, RootState> = (action$, state$) =>
	action$.pipe(
		ofType(WorkersLog.LabourInput.Redux.Objects.Types.GROUP_OBJECTS_INIT),
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			const selectedToGrouped = state.WorkersLog.LabourInput.Objects.Selection;

			const name = v4();
			const condition = true;
			if (condition) {
				return of(LabourInputObjectsActions.GroupObjects({ name, id: name, objects: selectedToGrouped }));
			}
			return of(
				ModalActions.InitializeModal({
					body: 'Nie udało sie utworzyć grupy',
					modalType: ModalType.Payload.EModalType.Default,
					title: 'Uwaga!',
				}),
			);
		}),
	);
