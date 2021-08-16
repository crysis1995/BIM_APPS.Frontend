import React, { useEffect } from 'react';
import Viewer from '../../../../components/ForgeViewer/components';
import { Col } from 'react-bootstrap';
import { EApplicationsWithModules } from '../../../types';
import { connect } from 'react-redux';
import PrefabricatedGeneralActions from '../../redux/prefabricated/general/actions';
import ActionButtons from "./Prefabricated.ActionButtons"
import ObjectsTable from "./Prefabricated.ObjectsTable"
const mapStateToProps = () => ({});
const mapDispatchToProps = {
	ComponentStart: PrefabricatedGeneralActions.ComponentStart,
	ComponentEnd: PrefabricatedGeneralActions.ComponentEnd,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function PrefabricatedLayoutComponent(props: Props) {
	useEffect(() => {
		props.ComponentStart();
		return () => {
			props.ComponentEnd();
		};
	}, []);

	return (
		<>
			<Col xs={6}>
				<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
					<Viewer runBy={EApplicationsWithModules.WORK_PROGRESS_PREFABRICATED} />
				</div>
			</Col>
			<Col xs={6}>
				<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
					<Col className="p-3">
						<ActionButtons/>
						<ObjectsTable/>
					</Col>
				</div>
			</Col>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrefabricatedLayoutComponent);
