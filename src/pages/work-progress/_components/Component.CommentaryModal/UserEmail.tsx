import { useGetUser } from '../../../../hooks/useGetUser';
import { Spinner } from 'react-bootstrap';
import React from 'react';

export function UserEmail(props: { userId: string }) {
	const { user, isLoading } = useGetUser(props.userId);
	if (isLoading)
		return (
			<span>
				<Spinner size={'sm'} className={'mr-2 small'} animation={'border'} />Ładuję...
			</span>
		);
	if (user) return <span>{user.email}</span>;
	return <>Nie znaleziono</>;
}