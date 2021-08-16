import React, { useEffect } from 'react';
import Viewer from '../../components/ForgeViewer/components';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import ModelViewerGeneralActions from './redux/actions';
import { EApplications } from '../types';

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {
	Cancel: ModelViewerGeneralActions.Cancel,
	Initialize: ModelViewerGeneralActions.Initialize,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function ModelViewer(props: Props) {
	useEffect(() => {
		props.Initialize();
		return () => {
			props.Cancel();
		};
	}, []);
	return (
		<>
			<Col xs={12}>
				<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
					<Viewer runBy={EApplications.MODEL_VIEWER}/>
				</div>
			</Col>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelViewer);
