import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { WorkProgress } from '../../../state/WorkProgress';
import { AppEnum } from '../../../generated/graphql';
import PageIndex from './Pages/Page.Index';

export default function GeneralComponent() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(WorkProgress.Actions.General.ComponentStart({ app: AppEnum.WorkProgressGeneral }));
		return () => {
			dispatch(
				WorkProgress.Actions.General.ComponentEnd({ app: AppEnum.WorkProgressGeneral }),
			);
		};
	}, []);
	return <PageIndex />;
}

/*
* 	todo statusy
*   todo sortowanie
*   todo filtrowanie
*   todo grupowanie
* */
