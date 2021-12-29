import React, { useEffect } from 'react';
import Viewer from '../../components/ForgeViewer/components';
import { Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ModelViewerGeneralActions from '../../state/ModelViewer/actions';
import { EApplications } from '../../sites/types';

function ModelViewerComponent() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(ModelViewerGeneralActions.Initialize());
		return () => {
			dispatch(ModelViewerGeneralActions.Cancel());
		};
	}, []);
	return (
		<Col xs={12}>
			<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
				<Viewer runBy={EApplications.MODEL_VIEWER} />
			</div>
		</Col>
	);
}

export default ModelViewerComponent;
