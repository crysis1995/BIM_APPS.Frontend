import { CMSLoginType } from './type';
import { filter } from 'rxjs/operators';
import { RootActions } from '../_types/RootActions';

const SetCurrentProjectIdEpic = filter<
	RootActions,
	ReturnType<CMSLoginType.Redux.IActions['SetCurrentProjectId']>
>(
	(value): value is ReturnType<CMSLoginType.Redux.IActions['SetCurrentProjectId']> =>
		value.type === CMSLoginType.Redux.Types.USER_SET_CURRENT_PROJECTID,
);
const FetchUserStartEpic = filter<
	RootActions,
	ReturnType<CMSLoginType.Redux.IActions['FetchUserStart']>
>(
	(value): value is ReturnType<CMSLoginType.Redux.IActions['FetchUserStart']> =>
		value.type === CMSLoginType.Redux.Types.FETCH_USER_START,
);

export { SetCurrentProjectIdEpic, FetchUserStartEpic };
