import React, { PropsWithChildren } from 'react';
import { ComponentProps } from '../Types/ComponentProps';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from '../../../store';

// const showSelector = createSelector((state:RootState) => state.CMSLogin.user,(_:RootState,props:ComponentProps) => props.when,(user,showWhen) => {
// 	if (!user) return false;
// 	user.
// })


function Show(props: PropsWithChildren<ComponentProps>) {
	// const show = useSelector()
	if (props.when) return <>{props.children}</>;
	return null;
}

export default Show;
