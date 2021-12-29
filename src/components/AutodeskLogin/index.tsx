import classnames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutodeskLoginActions from '../../state/Autodesk/actions';
import { AutodeskIsLoginSelector } from '../../state/Autodesk/selectors';

function AutodeskLoginComponent() {
	const dispatch = useDispatch();
	const isLogin = useSelector(AutodeskIsLoginSelector);
	useEffect(() => {
		dispatch(AutodeskLoginActions.HandleFetchAccessToken());
	}, []);

	const BANDAGE = isLogin ? 'badge-success' : 'badge-danger';
	const STATUS = isLogin ? 'ONLINE' : 'OFFLINE';
	return (
		<div className="mr-4 my-auto">
			<span className="align-middle mr-2 font-weight-bold">BIM360: </span>
			<span className={classnames('align-middle badge ', BANDAGE)}>{STATUS}</span>
		</div>
	);
}
export default AutodeskLoginComponent;
