import { CommentaryElementActions, Types } from './actions';
import { filter } from 'rxjs/operators';
import { RootActions } from '../../_types/RootActions';

type IActions = CommentaryElementActions.IActions;
const FetchCommentsStartEpic = filter<RootActions, ReturnType<IActions['FetchCommentsStart']>>(
	(value): value is ReturnType<IActions['FetchCommentsStart']> =>
		value.type === Types.FETCH_COMMENTARY_START,
);
const FetchCommentsFinishEpic = filter<RootActions, ReturnType<IActions['FetchCommentsFinish']>>(
	(value): value is ReturnType<IActions['FetchCommentsFinish']> =>
		value.type === Types.FETCH_COMMENTARY_FINISH,
);
const FetchAllCommentsStartEpic = filter<
	RootActions,
	ReturnType<IActions['FetchAllCommentsStart']>
>(
	(value): value is ReturnType<IActions['FetchAllCommentsStart']> =>
		value.type === Types.FETCH_ALL_COMMENTARY_START,
);
const FetchAllCommentsFinishEpic = filter<
	RootActions,
	ReturnType<IActions['FetchAllCommentsFinish']>
>(
	(value): value is ReturnType<IActions['FetchAllCommentsFinish']> =>
		value.type === Types.FETCH_ALL_COMMENTARY_FINISH,
);
export {
	FetchCommentsStartEpic,
	FetchCommentsFinishEpic,
	FetchAllCommentsStartEpic,
	FetchAllCommentsFinishEpic,
};
