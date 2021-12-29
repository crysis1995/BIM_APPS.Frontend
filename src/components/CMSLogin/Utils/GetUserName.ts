import { CMSLoginSelectors } from '../../../state/CMSLogin/selectors';

export function GetUserName(user: ReturnType<typeof CMSLoginSelectors.GetMe>) {
	return `Witaj, ${user?.firstName || ''} ${user?.lastName || ''}`;
}
