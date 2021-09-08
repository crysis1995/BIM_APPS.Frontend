import React from 'react';
import { Col } from 'react-bootstrap';
import Viewer from '../../../../../components/ForgeViewer/components';
import { EApplicationsWithModules } from '../../../../types';
import ButtonGroupWithActions from '../Organisms/ButtonGroupWithActions';
import ElementContainer from '../Organisms/ElementContainer';

function PageIndex() {
	return (
		<>
			<Col xs={6}>
				<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
					<Viewer runBy={EApplicationsWithModules.WORK_PROGRESS_GENERAL_CONSTRUCTION} />
				</div>
			</Col>
			<Col xs={6}>
				<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
					<div className={'d-flex flex-column w-100 p-3'}>
						<div className={'d-flex flex-row pb-3'}>
							<Col className={'p-0'}>
								<ButtonGroupWithActions />
							</Col>
						</div>
						<div className={'d-flex flex-row align-items-stretch'} style={{ height: '100%' }}>
							<div className={'d-flex flex-column'}>
								<ElementContainer />
							</div>
						</div>
					</div>
				</div>
			</Col>
		</>
	);
}

export default PageIndex;
