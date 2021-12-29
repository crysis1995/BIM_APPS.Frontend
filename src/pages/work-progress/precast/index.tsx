import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { WorkProgress } from '../../../state/WorkProgress';
import { AppEnum } from '../../../generated/graphql';

export default function Precast() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(WorkProgress.Actions.General.ComponentStart({ app: AppEnum.WorkProgressPrecast }));
		return () => {
			dispatch(
				WorkProgress.Actions.General.ComponentEnd({ app: AppEnum.WorkProgressPrecast }),
			);
		};
	}, []);
	return <>Precast</>;
}
