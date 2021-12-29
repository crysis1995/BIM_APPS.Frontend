import { filter } from 'rxjs/operators';
import { RootActions } from '../../_types/RootActions';
import { ElementsActions, Types } from './actions';

type IActions = ElementsActions.IActions;
const FetchElementsStartEpic = filter<RootActions, ReturnType<IActions['FetchElementsStart']>>(
	(value): value is ReturnType<IActions['FetchElementsStart']> =>
		value.type === Types.FETCH_ELEMENTS_START,
);
const FetchElementsEndEpic = filter<RootActions, ReturnType<IActions['FetchElementsEnd']>>(
	(value): value is ReturnType<IActions['FetchElementsEnd']> =>
		value.type === Types.FETCH_ELEMENTS_END,
);

const SelectElementsEpic = filter<RootActions, ReturnType<IActions['SelectElements']>>(
	(value): value is ReturnType<IActions['SelectElements']> =>
		value.type === Types.SELECT_ELEMENTS,
);

const HandleSelectElementsEpic = filter<RootActions, ReturnType<IActions['HandleSelectElements']>>(
	(value): value is ReturnType<IActions['HandleSelectElements']> =>
		value.type === Types.HANDLE_SELECT_ELEMENTS,
);

export {
	FetchElementsStartEpic,
	FetchElementsEndEpic,
	SelectElementsEpic,
	HandleSelectElementsEpic,
};
