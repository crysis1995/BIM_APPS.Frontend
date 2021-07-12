import { Epic } from 'redux-observable';
import { RootActions } from '../../../../../../reducers/type';
import { RootState } from '../../../../../../store';
import { filter, map } from 'rxjs/operators';
import WorkersLog from '../../../../types';
import LabourInputGeneralActions from '../../general/actions';

export const OnCloseComponentEpic: Epic<RootActions, RootActions, RootState> = (action$, state$) =>
	action$.pipe(
		filter(
			(data): data is ReturnType<WorkersLog.LabourInput.Redux.General.IActions['InitializeComponent']> =>
				data.type === WorkersLog.LabourInput.Redux.General.Types.INITIALIZE && !data.payload,
		),
		map(() => LabourInputGeneralActions.SetInitial()),
	);
