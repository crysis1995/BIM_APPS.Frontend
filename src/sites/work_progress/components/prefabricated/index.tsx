import React, { useEffect } from 'react';
import Viewer from '../../../../components/ForgeViewer/components';
import { Col } from 'react-bootstrap';
import { EApplicationsWithModules } from '../../../types';
import { useDispatch } from 'react-redux';
import PrefabricatedGeneralActions from '../../redux/prefabricated/general/actions';
import ActionButtons from './Prefabricated.ActionButtons';
import ObjectsTable from './Prefabricated.ObjectsTable';

function PrefabricatedLayoutComponent() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(PrefabricatedGeneralActions.ComponentStart());
		return () => {
			dispatch(PrefabricatedGeneralActions.ComponentEnd());
		};
	}, []);
	console.count('PrefabricatedLayoutComponent');

	return (
		<>
			<Col xs={6}>
				<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
					<Viewer runBy={EApplicationsWithModules.WORK_PROGRESS_PREFABRICATED} />
				</div>
			</Col>
			<Col xs={6}>
				<div className="d-flex align-items-stretch p-3" style={{ height: '100%' }}>
					<Col className="p-3">
						<ActionButtons />
						<ObjectsTable />
					</Col>
				</div>
			</Col>
		</>
	);
}

export default PrefabricatedLayoutComponent;
