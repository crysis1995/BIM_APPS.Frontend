import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state';
import { CMSLoginSelectors } from '../state/CMSLogin/selectors';
import { UserPayload } from '../generated/graphql';
import { useEffect } from 'react';
import CMSLoginActions from '../state/CMSLogin/actions';

export function useGetUser(userId: string) {
	const dispatch = useDispatch();
	let isLoadingRedux: boolean = useSelector((state: RootState) =>
		CMSLoginSelectors.IsUserLoading(state, userId),
	);
	let user: UserPayload = useSelector((state: RootState) =>
		CMSLoginSelectors.GetUser(state, userId),
	);

	useEffect(() => {
		if (!user) {
			dispatch(CMSLoginActions.FetchUserStart({ userId }));
		}
	}, [user]);

	return { user, isLoading: isLoadingRedux };
}