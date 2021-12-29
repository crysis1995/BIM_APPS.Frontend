import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Col } from 'react-bootstrap';
import { WorkProgress } from '../../../state/WorkProgress';
import { AppEnum } from '../../../generated/graphql';

export default function Monolithic() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			WorkProgress.Actions.General.ComponentStart({ app: AppEnum.WorkProgressMonolithic }),
		);
		return () => {
			dispatch(
				WorkProgress.Actions.General.ComponentEnd({ app: AppEnum.WorkProgressMonolithic }),
			);
		};
	}, []);
	return <Col>Monolithic</Col>;
}
