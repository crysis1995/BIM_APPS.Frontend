import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GeneralConstructionGeneralActions from '../../redux/general_construction/general/actions';
import PageIndex from './Pages/Page.Index';

function GeneralConstructionLayout() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(GeneralConstructionGeneralActions.ComponentStart());
		return () => {
			dispatch(GeneralConstructionGeneralActions.ComponentEnd());
		};
	}, []);
	return <PageIndex />;
}

export default GeneralConstructionLayout;
