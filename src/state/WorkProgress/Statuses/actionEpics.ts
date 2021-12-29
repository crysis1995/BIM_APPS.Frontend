import { filter } from 'rxjs/operators';
import { RootActions } from '../../_types/RootActions';
import { ActionInterfaces, Types } from './actions';

type IActions = ActionInterfaces.IActions;
const HandleSetStatusesEpic = filter<RootActions, ReturnType<IActions['HandleSetStatuses']>>(
	(value): value is ReturnType<IActions['HandleSetStatuses']> =>
		value.type === Types.HANDLE_SET_STATUSES,
);

export { HandleSetStatusesEpic };
