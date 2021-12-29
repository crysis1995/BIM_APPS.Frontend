import { filter } from 'rxjs/operators';
import { RootActions } from '../../_types/RootActions';
import { GeneralActions, Types } from './actions';

type IActions = GeneralActions.IActions;

const ComponentEnd$ = filter<RootActions, ReturnType<IActions['ComponentEnd']>>(
	(value): value is ReturnType<IActions['ComponentEnd']> => value.type === Types.COMPONENT_ENDED,
);
const ComponentStart$ = filter<RootActions, ReturnType<IActions['ComponentStart']>>(
	(value): value is ReturnType<IActions['ComponentStart']> =>
		value.type === Types.COMPONENT_STARTED,
);
export { ComponentEnd$, ComponentStart$ };
